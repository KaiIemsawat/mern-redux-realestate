import React, { useState } from "react";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { app } from "../firebase";

export default function CreateListing() {
    const { currentUser } = useSelector((state) => state.user);
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: "",
        description: "",
        address: "",
        type: "rent",
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 2000,
        discountPrice: 0,
        offer: false,
        parking: false,
        furnished: false,
    });
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    console.log(formData);

    const handleImageSubmit = (e) => {
        // Don't need e.preventDefault();since the button type is set as "button"
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            setUploading(true);
            setImageUploadError(false);
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
                    setUploading(false);
                })
                .catch((error) => {
                    setImageUploadError(
                        "Image upload failed. Please make sure that files are images and under 2mb each"
                    );
                    setUploading(false);
                });
        } else {
            setImageUploadError("Please upload image up to 6 images");
            setUploading(false);
        }
    };

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
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

    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        });
    };

    const handleChange = (e) => {
        // Sell / Rent
        if (e.target.id === "sell" || e.target.id === "rent") {
            setFormData({
                ...formData,
                type: e.target.id,
            });
        }

        // Paring / Furnished / Offer
        if (
            e.target.id === "parking" ||
            e.target.id === "furnished" ||
            e.target.id === "offer"
        ) {
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked,
            });
        }

        if (
            e.target.type === "number" ||
            e.target.type === "text" ||
            e.target.type === "textarea"
        ) {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.imageUrls.length < 1) {
                return setError("You must upload at least an image");
            }
            if (+formData.regularPrice <= +formData.discountPrice) {
                return setError(
                    "Discount price can not be higher or equal to regular price"
                );
            }
            setLoading(true);
            setError(false);
            const res = await fetch("/api/listing/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id,
                }),
            });
            const data = await res.json();
            setLoading(false);

            if (data.success === false) {
                setError(data.message);
            }
            navigate(`/listing/${data._id}`);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <main className="p-3 max-w-4xl mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">
                Creat a Listing
            </h1>
            <form className="flex flex-col  gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col flex-1 gap-4">
                    {/* fields */}
                    <input
                        className="border p-3 rounded-lg  border-slate-300"
                        type="text"
                        id="name"
                        maxLength="64"
                        minLength="3"
                        placeholder="Name"
                        required
                        onChange={handleChange}
                        value={formData.name}
                    />
                    <textarea
                        className="border p-3 rounded-lg  border-slate-300"
                        id="description"
                        placeholder="Description"
                        required
                        onChange={handleChange}
                        value={formData.description}
                    />
                    <input
                        className="border p-3 rounded-lg  border-slate-300"
                        type="text"
                        id="address"
                        placeholder="Address"
                        required
                        onChange={handleChange}
                        value={formData.address}
                    />

                    {/* checkboxes */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        <div className="flex gap-2">
                            <input
                                className="w-5"
                                type="checkbox"
                                id="sell"
                                onChange={handleChange}
                                checked={formData.type === "sell"}
                            />
                            <span>Sell</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                className="w-5"
                                type="checkbox"
                                id="rent"
                                onChange={handleChange}
                                checked={formData.type === "rent"}
                            />
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                className="w-5"
                                type="checkbox"
                                id="parking"
                                onChange={handleChange}
                                checked={formData.parking}
                            />
                            <span>Parking</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                className="w-5"
                                type="checkbox"
                                id="furnished"
                                onChange={handleChange}
                                checked={formData.furnished}
                            />
                            <span>Furnished</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                className="w-5"
                                type="checkbox"
                                id="offer"
                                onChange={handleChange}
                                checked={formData.offer}
                            />
                            <span>Offer</span>
                        </div>
                    </div>

                    {/* numbers */}
                    <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
                        <div className="flex items-center gap-2">
                            <input
                                className="border border-slate-300 rounded-lg p-3"
                                type="number"
                                id="bedrooms"
                                min="1"
                                max="10"
                                required
                                onChange={handleChange}
                                value={formData.bedrooms}
                            />
                            <p>Bedrooms</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                className="border border-slate-300 rounded-lg p-3"
                                type="number"
                                id="bathrooms"
                                min="1"
                                max="10"
                                required
                                onChange={handleChange}
                                value={formData.bathrooms}
                            />
                            <p>Bathrooms</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                className="border border-slate-300 rounded-lg p-3"
                                type="number"
                                id="regularPrice"
                                min="2000"
                                required
                                onChange={handleChange}
                                value={formData.regularPrice}
                            />
                            <div className="flex flex-col items-center">
                                <p>Regular Price</p>
                                <span className="text-xs text-slate-600">
                                    ($ / month)
                                </span>
                            </div>
                        </div>
                        {formData.offer && (
                            <div className="flex items-center gap-2">
                                <input
                                    className="border border-slate-300 rounded-lg p-3"
                                    type="number"
                                    id="discountPrice"
                                    min="0"
                                    placeholder="3000"
                                    required
                                    onChange={handleChange}
                                    value={formData.discountPrice}
                                />
                                <div className="flex flex-col items-center">
                                    <p>Discount Price</p>
                                    <span className="text-xs text-slate-600">
                                        ($ / month)
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* image files upload */}
                    <div className="flex flex-col gap-4">
                        <p className="font-semibold">
                            Images :{" "}
                            <span className="font-light text-slate-600 text-sm ml-2">
                                The first image will be the cover (max 6)
                            </span>
                        </p>
                        <div className="flex gap-4 justify-center">
                            <div className="flex gap-4 w-full">
                                <label
                                    htmlFor="images"
                                    className="border border-sky-700 rounded-lg uppercase w-full cursor-pointer p-3 text-sky-700 hover:opacity-80 duration-1000 disabled:opacity-80 text-center"
                                >
                                    Select Image(s)
                                </label>
                                <input
                                    // className="p-3 border border-slate-300 rounded-lg w-full cursor-pointer"
                                    type="file"
                                    hidden
                                    id="images"
                                    accept="image/*"
                                    onChange={(e) => setFiles(e.target.files)}
                                    // e.target.files NOT e.target.value
                                    multiple
                                />
                            </div>
                            <button
                                className="p-3 text-[#fdfdfd] bg-sky-700 rounded-lg uppercase hover:opacity-80 disabled:opacity-80 duration-1000"
                                type="button"
                                disabled={uploading}
                                onClick={handleImageSubmit}
                            >
                                {uploading ? "Uploading..." : "Upload"}
                            </button>
                        </div>
                    </div>
                </div>
                <p className="text-red-600 text-sm">
                    {imageUploadError && imageUploadError}
                </p>

                {/* preview images */}
                {formData.imageUrls.length > 0 &&
                    formData.imageUrls.map((url, index) => (
                        <div
                            className="flex justify-between p-3 border items-center rounded-lg"
                            key={url}
                        >
                            <img
                                className="w-25 h-20 object-contain rounded-lg"
                                src={url}
                                alt="listing image"
                            />
                            <button
                                className="p-3 text-red-600 rounded-lg uppercase hover:opacity-80 duration-1000"
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}

                <button
                    className="p-3 bg-slate-600 rounded-lg text-[#fdfdfd] uppercase border-slate-300 hover:opacity-80 duration-1000 disabled:opacity-80"
                    disabled={loading || uploading}
                >
                    {loading ? "Creating..." : "Create Listing"}
                </button>
                {error && <p className="text-red-600 text-sm">{error}</p>}
            </form>
        </main>
    );
}
