import { v2 as cloudinary } from 'cloudinary';

export const imageDelete = async (imageId) => {
	const deletedPostImageState = await new Promise((resolve) => {
		cloudinary.uploader.destroy(imageId).then((result) => resolve(result));  //{ result: 'ok' }
	});

	// if (deletedPostImageState.result == 'ok') {
	// Here we can do logic after we have received that image is deleted
	// }

	return deletedPostImageState;
};