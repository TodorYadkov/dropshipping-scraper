import { useState } from 'react';

export const ImageInput = ({ type, name, value, onChange, onBlur, error, isEditable = true }) => {
    const [previewImage, setPreviewImage] = useState(null);

    const handleImageChange = (e) => {
        onChange(e);
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setPreviewImage(e.target.result);
            };

            reader.onerror = (e) => {
                console.error('Error reading the file:', e.target.error);

                switch (e.target.error.code) {
                    case e.target.error.NOT_FOUND_ERR:
                        console.error('File not found!');
                        break;
                    case e.target.error.NOT_READABLE_ERR:
                        console.error('File is not readable!');
                        break;
                    case e.target.error.ABORT_ERR:
                        console.error('File reading aborted!');
                        break;
                    default:
                        console.error('An error occurred while reading the file.');
                }
            };

            try {
                reader.readAsDataURL(file);
            } catch (err) {
                console.error('An error occurred during readAsDataURL:', err);
            }
        }
    };

    return (
        <div className="flex-col items-center justify-center">

            <div className="w-36 h-w-36 overflow-hidden rounded-full shadow p-5 mb-2 mx-auto">
                <img src={previewImage ? previewImage : value !== ' ' ? value : "https://res.cloudinary.com/framevibe/image/upload/v1705613842/nl9lfvifhh4kb718wbnf.png"} alt="User Image" />
            </div>

            <label
                htmlFor="upload-image"
                className={`${!isEditable ? 'cursor-not-allowed bg-indigo-200' : 'cursor-pointer bg-indigo-600 hover:bg-indigo-400'} w-full px-4 py-2 my-3 text-sm text-center text-white rounded-md focus:outline-none} block`}>
                Select new Avatar
            </label>

            <input
                type={type}
                name={name}
                onChange={handleImageChange}
                onBlur={onBlur}
                disabled={!isEditable}
                className="hidden indent-2 w-full mt-1 border border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                accept="image/png, image/jpeg"
                id='upload-image'
            />
            {(error.isTouched && !!error.message) && <p className="text-xs -mb-4 text-red-600">{error.message}</p>}
        </div>
    );
};