import authRoute from './auth-routes';
import productRoute from './product-routes';

export default function apiRoutes(route) {
    route.use('/auth', authRoute(route));
    route.use('/products', productRoute(route));
    return route;
}
