import cloudinary from 'cloudinary';
import config from "../config/index";

cloudinary.config({
    cloud_name: config.cloudinary.name,
    api_key: config.cloudinary.api_token,
    api_secret: config.cloudinary.secret,
});

const uploads = {
    picture: file => new Promise((resolve) => {
        cloudinary.uploader.upload(
            file,
            (result) => {
                resolve({url: result.url, id: result.public_id});
            }, {resource_type: 'auto'},
        );
    }),

    destroyPicture: (id) => {
        return cloudinary.uploader.destroy(id)
    }
};

export default uploads;
