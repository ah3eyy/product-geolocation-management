import AuthHelper from "../../helpers/auth-helper";
import config from "../../config/index";
import {expressjwt} from "express-jwt";

const JwtHandler = () => {

    const token = config.jwt_token;

    return expressjwt({
        secret: token,
        algorithms: ['HS256'],
        isRevoked
    }).unless({
        path: [
            '/api/auth/login',
            '/api/auth/register',
            '/'
        ]
    });

};


const isRevoked = async (req, data) => {
    const user = await AuthHelper.getUserAccount(data.payload.user);

//  revoke user access if account not found
    if (!user)
        new Error('UnauthorizedError');

    req['user'] = user;
};

export default JwtHandler;
