import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";

import { app } from "../firebase.js";
import {
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    updateUserFailure,
    updateUserStart,
    updateUserSuccess,
} from "../redux/user/userSlice.js";

const Profile = () => {
    const { currentUser, loading, error } = useSelector((state) => state.user);

    const [file, setFile] = useState(undefined);
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});
    const [showSuccessfulMsg, setShowSuccessfulMsg] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const dispatch = useDispatch();

    console.log(formData);

    const fileRef = useRef(null);

    const handleFileUpload = (file) => {
        const storage = getStorage(app); // 'app' comes from 'firebase.js'
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const upLoadTask = uploadBytesResumable(storageRef, file);

        upLoadTask.on(
            "state_changed",
            (snapshot) => {
                setFileUploadError(false);
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadPercentage(Math.round(progress));
            },
            (error) => {
                setFileUploadError(true);
            },
            () => {
                getDownloadURL(upLoadTask.snapshot.ref).then((downloadURL) => {
                    setFormData({ ...formData, avatar: downloadURL });
                });
            }
        );
    };

    useEffect(() => {
        if (file) {
            handleFileUpload(file);
        }
    }, [file]);

    useEffect(() => {
        if (uploadPercentage === 100) {
            setShowSuccessfulMsg(true);

            const timeout = setTimeout(() => {
                setShowSuccessfulMsg(false);
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [uploadPercentage]);

    useEffect(() => {
        if (updateSuccess) {
            const timeout = setTimeout(() => {
                setUpdateSuccess(false);
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [updateSuccess]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(updateUserStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (data.success === false) {
                dispatch(updateUserFailure(data.message));
                return;
            }
            dispatch(updateUserSuccess(data));
            setUpdateSuccess(true);
        } catch (error) {
            dispatch(updateUserFailure(error.message));
        }
    };

    const handleDeleteUser = async () => {
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: "DELETE",
            });

            const data = await res.json();
            if (data.success === false) {
                dispatch(deleteUserFailure(data.message));
                return;
            }
            dispatch(deleteUserSuccess(data));
        } catch (error) {
            dispatch(deleteUserFailure(error.message));
        }
    };

    return (
        <div className="p-3 max-w-lg mx-auto">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex justify-between mt-7 mb-4 items-center">
                    <div className="flex gap-3 items-center">
                        {/* Hidden input that will take effect when image is clicked  */}
                        <input
                            onChange={(e) => setFile(e.target.files[0])}
                            // [0] to allow only one (first) file
                            type="file"
                            ref={fileRef}
                            hidden
                            accept="image/*"
                        />
                        <img
                            className="rounded-full h-24 w-24 object-cover cursor-pointer"
                            src={formData.avatar || currentUser.avatar}
                            alt="profile img"
                            onClick={() => fileRef.current.click()}
                        />
                        <p>
                            {fileUploadError ? (
                                <>
                                    <p className="text-error text-sm font-semibold">
                                        Image uploading error.
                                    </p>
                                    <p className="text-error text-sm font-semibold">
                                        Please try another file.
                                    </p>
                                </>
                            ) : uploadPercentage > 0 &&
                              uploadPercentage < 100 ? (
                                <span className="text-effect-500 text-sm font-semibold">
                                    {uploadPercentage} % upload
                                </span>
                            ) : (
                                showSuccessfulMsg && (
                                    <span className="text-effect-500 text-sm font-semibold">
                                        File successfully uploaded
                                    </span>
                                )
                            )}
                        </p>
                    </div>
                    <h1 className="text-3xl text-end font-semibold text-primary-500">
                        {currentUser.username}
                    </h1>
                </div>
                <input
                    className="border p-3 rounded-lg focus:outline-none"
                    id="username"
                    type="text"
                    placeholder="username"
                    defaultValue={currentUser.username}
                    onChange={handleChange}
                />
                <input
                    className="border p-3 rounded-lg focus:outline-none"
                    id="email"
                    type="text"
                    placeholder="email"
                    defaultValue={currentUser.email}
                    onChange={handleChange}
                />
                <input
                    className="border p-3 rounded-lg focus:outline-none"
                    id="password"
                    type="password"
                    placeholder="password"
                    onChange={handleChange}
                />

                {loading ? (
                    <button
                        className="bg-primary-500 text-effect-300 p-3 rounded-lg uppercase"
                        disabled
                    >
                        Loading...
                    </button>
                ) : updateSuccess ? (
                    <button
                        className="bg-primary-500 text-effect-300 p-3 rounded-lg uppercase"
                        disabled
                    >
                        details Updated
                    </button>
                ) : (
                    <button className="bg-primary-500 text-effect-300 p-3 rounded-lg uppercase hover:bg-effect-300 hover:text-primary-500 duration-200">
                        Update
                    </button>
                )}
            </form>

            {/* ERROR MESSAGE */}
            {error ? (
                <div className="mt-2 text-end">
                    <p className="text-error text-sm font-semibold">{error}</p>
                </div>
            ) : null}

            <div className="flex justify-between mt-5">
                <span
                    className="text-primary-500 hover:text-error duration-200 cursor-pointer"
                    onClick={handleDeleteUser}
                >
                    Delete Account
                </span>
                <span className="text-primary-500 hover:text-warning duration-200 cursor-pointer">
                    Sign out
                </span>
            </div>
        </div>
    );
};
export default Profile;

/* firebase storage rules */
// allow read;
// allow write: if
// request.resource.size < 2 * 1024 * 1024 &&
// request.resource.contentType.matches('image/.*')
