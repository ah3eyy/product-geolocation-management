import ErrorHandler from "../helpers/error-handler";
import SuccessHelper from "../helpers/success-helper";
import upload from "../services/cloudinary-service";
import GeoHelper from "../helpers/geo-helper";
import config from "../config/index";
import Product from "../models/schemas/products";
import User from "../models/schemas/user";
import Comment from "../models/schemas/comments";
import AuthHelper from "../helpers/auth-helper";

import {Dinero} from 'dinero.js'
import {NGN} from '@dinero.js/currencies';

const {successWithMessage, successWithData, successWithMessageAndData} = SuccessHelper;
const {serverResponse, validationError} = ErrorHandler;

const ProductController = {

    searchProductAddress: async (req, res) => {
        try {

            let address = req.params.address;

            let search = await GeoHelper.searchAddress(address);

            return successWithData(res, 200, search)

        } catch (e) {
            return serverResponse(res, 'An error occurred searching address', 400);
        }
    },

    uploadToCloudinary: async (req, res) => {
        if (!req.files) {
            return serverResponse(res, "Please Upload a file", 400);
        }
        const imagePath = req.files[0].path;
        const {
            url,
            id
        } = await upload.picture(imagePath);
        return successWithData(res, 201, {url, public_id: id});
    },

    destroyPicture: async (req, res) => {
        await upload.picture(req.params.id);
        return successWithMessage(res, 201, "Image deleted successfully");
    },

    createProduct: async (req, res) => {

        try {
            let user = req.user;

            let name = req.body.name;
            let address = req.body.address;
            let geo_location = req.body.location;
            let available_radius = req.body.available_radius || config.default_radius;
            let price = req.body.price;
            let images = req.body.images;

            let location = [];

            //    sort location if not provided
            if (geo_location.length > 0) {
                location = await GeoHelper.fetchLocationLatLng(address)
            } else {
                location = geo_location;
            }

            if (!price)
                price = Dinero({amount: price, currency: NGN});

            let product = new Product();
            product.name = name;
            product.address = address;
            product.radius = available_radius;
            product.price = price;
            product.images = images;
            product.location = {
                type: "Point",
                coordinates: location
            };
            product.product_owner = user.id || user._id;
            await product.save();

            //    call event to sync to firestore
            const event = req.event;

            event.emit(config.event_constants.NEW_PRODUCT, product);

            return successWithMessageAndData(res, 200, "Product created successfully", product);

        } catch (e) {
            return serverResponse(
                res,
                e.message || "An error occurred creating products.",
                400
            );
        }
    },

    editProduct: async (req, res) => {
    },

    products: async (req, res) => {
        try {

            let user = req.user;

            let userAccount = await User.findOne({_id: user.id || user._id});

            let userLocation = user.location;

            let products = await Product.find(
                {
                    location: {
                        $near: {
                            $geometry: {
                                type: "Point",
                                coordinates: userLocation
                            },
                            $maxDistance: 10000
                        }
                    }
                }
            ).populate('product_owner');

            return successWithMessageAndData(res, 200, 'Product list', products);

        } catch (e) {
            return serverResponse(
                res,
                e.message || "An error occurred fetching products.",
                400
            );
        }

    },

    product: async (req, res) => {
        try {

            let product_id = req.params.product_id;

            let product = await Product.findOne({_id: product_id}).populate('product_owner');

            return successWithMessageAndData(res, 200, 'Product Details', product);

        } catch (e) {
            return serverResponse(
                res,
                e.message || "An error occurred fetching products.",
                400
            );
        }
    },

    comments: async (req, res) => {

        try {

            let product_id = await AuthHelper.convertToMongoose(req.params.product_id);
            console.log(product_id);


            let comment = await Comment.aggregate([

                {
                    $match: {
                        product_id: product_id
                    },
                },
                {
                    $lookup: {
                        from: "comments",
                        localField: "_id",
                        foreignField: 'parent_comment',
                        as: "comments"
                    }
                },

                {
                    $lookup: {
                        from: "users",
                        localField: "comment_by",
                        foreignField: "_id",
                        as: "user"
                    }
                },
                {
                    $addFields: {
                        "id": "$_id"
                    }
                },
                {
                    $unwind: "$user"
                },
                {
                    $unset: ["__v", "_id", "user.password", "user.phone_number", "user.email", "user.createdAt", "user.updatedAt", "user._id", "user.location", "user.__v", "user.address"]
                }
            ]);

            return successWithMessageAndData(res, 200, 'Product Comment', comment);

        } catch (e) {
            return serverResponse(
                res,
                e.message || "An error occurred fetching comments.",
                400
            );
        }

    },

    createComment: async (req, res) => {

        try {

            let comment = req.body.comments;
            let product_id = req.body.product_id;

            //    if this comment is a reply
            let parent_comment = req.body.parent_comment;

            console.log(parent_comment);
            let user = req.user;

            let commentData = new Comment();
            commentData.comment = comment;
            if (product_id) commentData.product_id = product_id;
            commentData.comment_by = user._id || user.id;
            if (parent_comment) commentData.parent_comment = parent_comment;
            await commentData.save();

            //    call event to sync to firestore
            const event = req.event;

            let data = [];

            if (product_id) {
                let product = await Product.findOne({_id: product_id});
                let productOwner = await User.findOne({_id: product.product_owner});
                data = [...data, {
                    email: productOwner.email,
                    phone_number: productOwner.phone_number,
                    message: `${user.name} commented on your product ${product.name}`
                }];
            }

            let commentOwner = null;

            if (parent_comment) {
                let parentCommentData = await Comment.findOne({_id: await AuthHelper.convertToMongoose(parent_comment)});
                commentOwner = await User.findOne({_id: parentCommentData.comment_by})
                data = [...data, {
                    email: commentOwner.email,
                    phone_number: commentOwner.phone_number,
                    message: `${user.name} replied your comment on product ${parentCommentData.name}`
                }];

            }

            event.emit(config.event_constants.NEW_NOTIFICATION, data);

            return successWithMessageAndData(
                res,
                200,
                'Comment Created successfully',
                commentData
            );

        } catch (e) {
            return serverResponse(
                res,
                e.message || "An error occurred comments.",
                400
            );
        }

    }

};

export default ProductController;
