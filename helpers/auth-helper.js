import UserModel from "../models/schemas/user";
import Mongoose from "mongoose";


const AuthHelper = {

    getUserAccount: async (user_id) => {
        return UserModel.findOne({_id: user_id});
    },

    convertToMongoose: async (value) => {
        return Mongoose.Types.ObjectId(value);
    }

};

export default AuthHelper;
