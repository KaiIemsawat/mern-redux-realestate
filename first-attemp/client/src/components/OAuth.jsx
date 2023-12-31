import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { app } from "../firebase";
import { signInSuccess } from "../redux/user/userSlice";

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);

            const res = await fetch("/api/auth/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoUrl,
                }),
            });
            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate("/");
        } catch (error) {
            console.log("Could not sign in with Google Account", error);
        }
    };

    return (
        <button
            className="bg-slate-600 text-[#fdfdfd] p-3 rounded-lg uppercase hover:opacity-80 disabled:opacity-80 duration-1000 flex justify-center items-center gap-3"
            type="button"
            onClick={handleGoogleClick}
        >
            <FaGoogle />
            Continue with Google
        </button>
    );
}