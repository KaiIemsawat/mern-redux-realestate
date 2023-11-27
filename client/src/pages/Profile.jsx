import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
    getStorage,
    getDownloadURL,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    signOutUserFailure,
    signOutUserStart,
    signOutUserSuccess,
    updateUserFailure,
    updateUserStart,
    updateUserSuccess,
} from "../redux/user/userSlice";

export default function Profile() {
    const { currentUser, loading, error } = useSelector((state) => state.user);
    const fileRef = useRef(null);
    const [file, setFile] = useState(undefined);
    const [filePercentage, setFilePercentage] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [showListingsError, setShowListingsError] = useState(false);
    const [userListings, setUserListings] = useState([]);

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

    const handleDeleteUser = async () => {
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`api/user/delete/${currentUser._id}`, {
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

    const handleSignOut = async () => {
        try {
            dispatch(signOutUserStart());
            const res = await fetch("/api/auth/signout");
            const data = await res.json();
            if (data.success === false) {
                dispatch(signOutUserFailure(data.message));
                return;
            }
            dispatch(signOutUserSuccess(data));
        } catch (error) {
            dispatch(signOutUserFailure(data.message));
        }
    };

    const handleShowListings = async () => {
        try {
            setShowListingsError(false);
            const res = await fetch(`/api/user/listings/${currentUser._id}`);
            const data = await res.json();
            if (data.success === false) {
                setShowListingsError(true);
                return;
            }

            setUserListings(data);
        } catch (error) {
            setShowListingsError(true);
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
                        <span></span>
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
                <button
                    className="bg-slate-600 text-[#fdfdfd] p-3 rounded-lg uppercase hover:opacity-80 disabled:opacity-80 duration-1000"
                    disabled={loading}
                >
                    {loading ? "LOADING..." : "Update"}
                </button>
                <Link
                    className="bg-green-600 text-[#fdfdfd] p-3 rounded-lg uppercase text-center hover:opacity-80 duration-1000"
                    to={"/create-listing"}
                >
                    Create Listing
                </Link>
            </form>

            {/* Delete / Signout */}
            <div className="flex justify-between mt-4">
                <span
                    className="text-red-600 cursor-pointer"
                    onClick={handleDeleteUser}
                >
                    Delete Account
                </span>
                <span
                    className="text-slate-600 cursor-pointer"
                    onClick={handleSignOut}
                >
                    Sign Out
                </span>
            </div>
            <div className="flex justify-center">
                <p className="text-red-600 mt-4">{error ? error : ""}</p>
                <p className="text-green-500 mt-4">
                    {updateSuccess ? "UPDATED" : ""}
                </p>
            </div>

            {/* Show Listings */}
            <button
                className="border border-sky-700 rounded-lg p-3 uppercase text-sky-700 w-full hover:text-sky-400 hover:border-sky-400 duration-1000"
                onClick={handleShowListings}
            >
                Show Listing
            </button>
            {showListingsError && (
                <p className="text-xs text-red-600">
                    "Error occur on showing listings"
                </p>
            )}

            {userListings && userListings.length > 0 && (
                <div>
                    <h2 className="text-center mt-7 font-semibold text-xl text-slate-600">
                        Your Listing
                    </h2>
                    {userListings.map((listing) => (
                        <div
                            key={listing._id}
                            className=" p-3 border rounded-lg mt-4 flex justify-between"
                        >
                            <div className="flex justify-start gap-4  items-center">
                                <Link to={`/listing/${listing._id}`}>
                                    <img
                                        className="w-25 h-20 object-contain rounded-lg"
                                        src={listing.imageUrls[0]}
                                        alt="Listing cover"
                                    />
                                </Link>
                                <Link to={`/listing/${listing._id}`}>
                                    <p className="text-slate-600 font-semibold hover:underline truncate">
                                        {listing.name}
                                    </p>
                                </Link>
                            </div>

                            <div className="flex flex-col justify-between items-center p-2">
                                <button className="uppercase text-green-600">
                                    edit
                                </button>
                                <button className="uppercase text-red-600">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
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
