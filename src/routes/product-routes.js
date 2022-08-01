import productController from "../controllers/product-controller";
import multerService from "../services/multer-service";
import asyncHandler from "./middleware/async-handler";
import joiMiddleware from "./middleware/joi-middleware";
import joiSchema from "../models/joi-schema";

export default function (route) {

    route.get('/search/:address', productController.searchProductAddress);

    route.get('/search', productController.searchProductAddress);

    route.post('/upload-file', multerService.any(), asyncHandler(productController.uploadToCloudinary));

    route.delete('/delete-image/:id', productController.destroyPicture);

    route.get('/', productController.products);

    route.get('/details/:product_id', productController.product);

    route.post('/create', joiMiddleware(joiSchema.createProduct), productController.createProduct);

    route.put('/edit-product', productController.editProduct);

    route.get('/comments/:product_id', productController.comments);

    route.post('/create-comment', productController.createComment);

    return route;
}
