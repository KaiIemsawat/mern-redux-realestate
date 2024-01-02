import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";

import { app } from "../firebase.js";

const Profile = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [file, setFile] = useState(undefined);
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});
    const [showSuccessfulMsg, setShowSuccessfulMsg] = useState(false);

    const fileRef = useRef(null);

    const handleFileUpload = (file) => {
        const storage = getStorage(app); // 'app' comes from 'firebase.js'
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const upLoadTask = uploadBytesResumable(storageRef, file);

        upLoadTask.on(
            "state_changed",
            (snapshot) => {
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
            }, 5000);
            return () => clearTimeout(timeout);
        }
    }, [uploadPercentage]);

    return (
        <div className="p-3 max-w-lg mx-auto">
            <form className="flex flex-col gap-4">
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
                            src={currentUser.avatar}
                            alt="profile img"
                            onClick={() => fileRef.current.click()}
                        />
                        <p>
                            {fileUploadError ? (
                                <>
                                    <p className="text-error">
                                        Image uploading error.
                                    </p>
                                    <p className="text-error">
                                        Please try another file.
                                    </p>
                                </>
                            ) : uploadPercentage > 0 &&
                              uploadPercentage < 100 ? (
                                <span className="text-effect-500">
                                    {uploadPercentage} % upload
                                </span>
                            ) : (
                                showSuccessfulMsg && (
                                    <span className="text-effect-500">
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
                />
                <input
                    className="border p-3 rounded-lg focus:outline-none"
                    id="email"
                    type="text"
                    placeholder="email"
                />
                <input
                    className="border p-3 rounded-lg focus:outline-none"
                    id="password"
                    type="text"
                    placeholder="password"
                />
                <button className="bg-primary-500 text-effect-300 p-3 rounded-lg uppercase hover:bg-effect-300 hover:text-primary-500 duration-200">
                    update
                </button>
            </form>
            <div className="flex justify-between mt-5">
                <span className="text-primary-500 hover:text-error duration-200 cursor-pointer">
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
