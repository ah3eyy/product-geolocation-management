import mongoose from "mongoose";
import Dinero from 'dinero.js'
import {NGN} from '@dinero.js/currencies';
import User from "./user";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    product_owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            default: null
        },
        coordinates: []
    },
    radius: {
        type: Number,
        default: null
    },
    price: {
        type: Object,
        default: Dinero({amount: 0, currency: NGN})
    },
    images: {
        type: [Object],
        default: null
    }
}, {
    timestamps: true
});

ProductSchema.index({location: "2dsphere"});

ProductSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Product', ProductSchema);

