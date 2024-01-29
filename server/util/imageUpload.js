import { v2 as cloudinary } from 'cloudinary';

export const imageUpload = async (file) => {

    return new Promise((resolve) => {
        cloudinary.uploader.upload_stream({ folder: 'dropshipping-scraper' }, (error, uploadResult) => {
            return resolve(uploadResult)
        }).end(file.buffer);

    });
};