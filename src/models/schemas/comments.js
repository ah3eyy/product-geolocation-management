import mongoose from "mongoose";
import User from "./user";

const Schema = mongoose.Schema;

const CommentSchema = new Schema({

    comment: {
        type: String,
        default: null
    },

    comment_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },

    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },

    parent_comment: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    }

}, {
    timestamps: true
});

CommentSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Comment', CommentSchema);


