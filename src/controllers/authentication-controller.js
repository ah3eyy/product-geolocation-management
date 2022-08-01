import ErrorHandler from "../helpers/error-handler";
import SuccessHelper from "../helpers/success-helper";
import userModel from "../models/schemas/user";
import GeneralHelper from "../helpers/general-helper";
import GeoHelper from "../helpers/geo-helper";
import Jwt from "jsonwebtoken";
import config from "../config/index";

const {successWithMessage, successWithData, successWithMessageAndData} = SuccessHelper;
const {serverResponse, validationError} = ErrorHandler;

const authenticationController = {
    registerUser: async (req, res) => {
        try {

            let data = req.body;

            // check exiting email
            let checkEmail = await userModel.findOne({email: data.email});

            if (checkEmail)
                return serverResponse(res, "Email already in use", 400);

            data['password'] = await GeneralHelper.encryptValue(data.password);

            if (data.location.length === 0) {
                // check for user current longitude and latitude
                data['location'] = await GeoHelper.fetchLocationLatLng(data.address);
            }

            let user = await userModel(data).save();

            let token = Jwt.sign(
                {
                    user: user.id
                },
                config.jwt_token,
                {
                    expiresIn: '2d'
                }
            );

            let userData = {
                token,
                user: await userModel.findOne({_id: user.id})
            };

            return successWithMessageAndData(res, 200, 'Account registered successfully.', userData);

        } catch (e) {

            return serverResponse(
                res,
                e.message || "An error occurred creating user account.",
                400
            );
        }
    },

    loginUser: async (req, res) => {
        try {

            let email = req.body.email;
            let password = req.body.password;

            //    check user exit
            let user = await userModel.findOne({email: email}).select('password');
            if (!user)
                return serverResponse(res, "Invalid user credentials provide", 400);

            let checkPassword = await GeneralHelper.decryptValue(password, user.password);

            if (!checkPassword)
                return serverResponse(res, "Invalid user credentials provide", 400);

            let token = Jwt.sign(
                {
                    user: user.id
                },
                config.jwt_token,
                {
                    expiresIn: '2d'
                }
            );

            let data = {
                token,
                user: await userModel.findOne({email: email})
            };

            return successWithMessageAndData(res, 200, 'Access Granted', data);
        } catch (e) {
            return serverResponse(
                res,
                e.message || "An error occurred granting access to current credential.",
                400
            );
        }
    },

    profile: async (req, res) => {
        let user = req.user;

        return successWithMessageAndData(
            res,
            200,
            'Profile',
            user
        )
    }
}

export default authenticationController;
