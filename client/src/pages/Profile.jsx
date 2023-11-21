import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";

import {
    getStorage,
    getDownloadURL,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
    updateUserFailure,
    updateUserStart,
    updateUserSuccess,
} from "../redux/user/userSlice";

export default function Profile() {
    const { currentUser } = useSelector((state) => state.user);
    const fileRef = useRef(null);
    const [file, setFile] = useState(undefined);
    const [filePercentage, setFilePercentage] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        if (file) {
            handleFileUpload(file);
        }
    }, [file]);

    const handleFileUpload = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log("Upload is " + progress + "% complete");
                setFilePercentage(Math.round(progress));
            },
            (error) => {
                setFileUploadError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFormData({ ...FormData, avatar: downloadURL });
                });
            }
        );
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.id]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(currentUser);
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

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7 text-slate-500">
                Profile
            </h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    ref={fileRef}
                    hidden
                    accept="image/*"
                />
                <img
                    className="rounded-full h-24 w-24 object-cover cursor-pointer self-center my-4"
                    onClick={() => fileRef.current.click()}
                    src={formData.avatar || currentUser.avatar}
                    alt="avatar"
                />
                <p className="self-center">
                    {fileUploadError ? (
                        <span className="text-red-600 mt-2">
                            File Upload Error. Image can't be larger than 2mb
                        </span>
                    ) : filePercentage > 0 && filePercentage < 100 ? (
                        <span className="text-slate-600 mt-2">{`Uploading...${filePercentage}%`}</span>
                    ) : filePercentage === 100 ? (
                        <span className="text-green-600 mt-2">
                            Successfully Loaded
                        </span>
                    ) : (
                        ""
                    )}
                </p>
                <input
                    className="border p-3 rounded-lg"
                    type="text"
                    id="username"
                    placeholder="username"
                    defaultValue={currentUser.username}
                    onChange={handleChange}
                />
                <input
                    className="border p-3 rounded-lg"
                    type="email"
                    id="email"
                    placeholder="email"
                    defaultValue={currentUser.email}
                    onChange={handleChange}
                />
                <input
                    className="border p-3 rounded-lg"
                    type="password"
                    id="password"
                    placeholder="password"
                    onChange={handleChange}
                />
                <button className="bg-slate-600 text-[#fdfdfd] p-3 rounded-lg uppercase hover:opacity-80 disabled:opacity-80 duration-1000">
                    Update
                </button>
            </form>
            <div className="flex justify-between mt-4">
                <span className="text-red-600 cursor-pointer">
                    Delete Account
                </span>
                <span className="text-slate-600 cursor-pointer">Sign Out</span>
            </div>
        </div>
    );
}

/* firebase storage roles */
// service firebase.storage {
//     match /b/{bucket}/o {
//       match /{allPaths=**} {
//         allow read;
//         allow write: if request.resource.size < 2 * 1024 * 1024 && request.resource.contentType.matches('image/.*');
//       }
//     }
// }
