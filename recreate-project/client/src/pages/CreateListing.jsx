import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { FaWindowClose } from "react-icons/fa";

import { app } from "../firebase";
import { toast } from "react-toastify";

const CreateListing = () => {
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: [],
    });
    const [imageUploadError, setImageUploadError] = useState(false);

    console.log(formData);
    console.log(files);

    let numOfFiles = formData.imageUrls.length;

    const handleImageSubmit = (e) => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            const promises = [];

            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises)
                .then((urls) => {
                    setFormData({
                        ...formData,
                        imageUrls: formData.imageUrls.concat(urls),
                    });
                    setImageUploadError(false);
                })
                .catch((err) => {
                    setImageUploadError(
                        "Image upload failed (2mb max per image)"
                    );
                    toast.error("Image upload failed (2mb max per image)");
                    console.log(err);
                    setFiles([]);
                });
        } else {
            setImageUploadError(
                "The number of upload images allowed is 1 to 6"
            );
            toast.error("The number of upload images allowed is 1 to 6");
            setFiles([]);
        }
    };

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL) => {
                            resolve(downloadURL);
                        }
                    );
                }
            );
        });
    };

    return (
        <main className="p-3 max-w-4xl mx-auto">
            <h1 className="text-3xl text-end font-semibold text-primary-500 mt-7 mb-4">
                Create Listing
            </h1>
            <form className="flex flex-col">
                <div className="flex flex-col gap-4">
                    {/* Fields */}
                    <input
                        className="border p-3 rounded-lg focus:outline-none"
                        id="name"
                        type="text"
                        placeholder="name"
                        maxLength="60"
                        minLength="2"
                        required
                        // onChange={handleChange}
                    />
                    <textarea
                        className="border p-3 rounded-lg focus:outline-none"
                        id="description"
                        type="text"
                        placeholder="description"
                        required
                        // onChange={handleChange}
                    />
                    <input
                        className="border p-3 rounded-lg focus:outline-none"
                        id="address"
                        type="text"
                        placeholder="address"
                        required
                        // onChange={handleChange}
                    />

                    {/* Checkboxes */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-2">
                        <div className="flex gap-2">
                            <input className="w-5" type="checkbox" id="sale" />
                            <span className="text-primary-500 font-semibold">
                                Sell
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <input className="w-5" type="checkbox" id="rent" />
                            <span className="text-primary-500 font-semibold">
                                Rent
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                className="w-5"
                                type="checkbox"
                                id="parking"
                            />
                            <span className="text-primary-500 font-semibold">
                                Parking
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                className="w-5"
                                type="checkbox"
                                id="furnished"
                            />
                            <span className="text-primary-500 font-semibold">
                                Furnished
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <input className="w-5" type="checkbox" id="offer" />
                            <span className="text-primary-500 font-semibold">
                                Offer
                            </span>
                        </div>
                    </div>

                    {/* Bed / Bath / Prices */}
                    <div className="grid grid-cols-1 gap-6">
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="flex items-center gap-2">
                                <input
                                    className="border rounded-lg p-3"
                                    type="number"
                                    id="bedrooms"
                                    min="1"
                                    max="10"
                                    required
                                />
                                <p className="text-primary-500 font-semibold">
                                    Bedrooms
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    className="border rounded-lg p-3"
                                    type="number"
                                    id="bathrooms"
                                    min="1"
                                    max="10"
                                    required
                                />
                                <p className="text-primary-500 font-semibold">
                                    Bathrooms
                                </p>
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-2 gap-6">
                            <div className="flex items-center gap-2">
                                <input
                                    className="border rounded-lg p-3"
                                    type="number"
                                    id="regularPrice"
                                    min="2000"
                                    required
                                />
                                <p className="text-primary-500 font-semibold">
                                    Regular Price&nbsp;
                                    <span className="font-light text-secondary-400 text-sm">
                                        ($ / month)
                                    </span>
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    className="border rounded-lg p-3"
                                    type="number"
                                    id="discountPrice"
                                    min="1500"
                                    required
                                />
                                <p className="text-primary-500 font-semibold">
                                    Discount Price&nbsp;
                                    <span className="font-light text-secondary-400 text-sm">
                                        ($ / month)
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Image file uploader */}
                    <div className="flex flex-col gap-1">
                        <p className="font-semibold text-primary-500">
                            Images :&nbsp;
                            <span className="font-light text-secondary-400 text-sm">
                                Maximum 6 images (The first image will be the
                                cover)
                            </span>
                        </p>
                        <div className="flex gap-4">
                            <label
                                className="flex-1 text-center font-semibold border border-secondary-400 hover:border-effect-300 hover:text-primary-300 rounded-lg uppercase cursor-pointer p-3 text-primary-500 duration-200"
                                htmlFor="images"
                            >
                                Select Image(s){" "}
                                {numOfFiles > 0 ? (
                                    <span className="font-light text-secondary-400 text-sm">
                                        : {numOfFiles} image(s) has been
                                        selected
                                    </span>
                                ) : null}
                            </label>
                            <input
                                type="file"
                                id="images"
                                accept="image/*"
                                onChange={(e) => setFiles(e.target.files)}
                                multiple
                                hidden
                            />
                            <button
                                className="font-semibold border border-optional-400 hover:border-effect-300 hover:text-primary-300 rounded-lg uppercase cursor-pointer p-3 text-primary-500 duration-200"
                                type="button"
                                onClick={handleImageSubmit}
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                </div>

                {/* PREVIEW IMAGES */}
                {formData.imageUrls.length > 0 &&
                    formData.imageUrls.length < 7 && (
                        <div className="grid sm:grid-cols-2 gap-6 mt-4">
                            {formData.imageUrls.map((url) => (
                                <div className="flex items-end gap-4 p-4 border rounded-lg justify-between">
                                    <img
                                        key={url}
                                        className="w-80 h-40 object-cover rounded-lg "
                                        src={url}
                                        alt="Listing Img"
                                    />
                                    <button className="text-optional-500 hover:text-error duration-200">
                                        <FaWindowClose />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                <button className="bg-primary-500 text-effect-300 p-3 rounded-lg uppercase hover:bg-effect-300 hover:text-primary-500 duration-200 mt-4">
                    Submit listing
                </button>
            </form>
        </main>
    );
};
export default CreateListing;
