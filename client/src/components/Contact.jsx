import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Contact({ listing }) {
    const [landlord, setLandlord] = useState(null);
    const [message, setMessage] = useState("");

    const onChange = (e) => {
        setMessage(e.target.value);
    };

    useEffect(() => {
        const fetchLandlord = async () => {
            try {
                const res = await fetch(`/api/user/${listing.userRef}`);
                const data = await res.json();
                setLandlord(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchLandlord();
    }, [listing.userRef]);
    return (
        <>
            {landlord && (
                <div className="flex flex-col gap-2">
                    <p>
                        Contact{" "}
                        <span className="font-semibold">
                            {landlord.username}
                        </span>{" "}
                        for{" "}
                        <span className="font-semibold">
                            {listing.name.toLowerCase()}
                        </span>
                    </p>
                    <textarea
                        className="w-full border p-3 rounded-lg bg-slate-100"
                        name="message"
                        id="message"
                        rows="2"
                        value={message}
                        onChange={onChange}
                        placeholder="Enter your message here...."
                    />

                    <Link
                        className="bg-slate-700 text-[#fdfdfd] text-center uppercase p-3 rounded-lg hover:opacity-80 duration-1000"
                        // To send email
                        to={`mailto:${landlord.emal}?subject=Regarding ${listing.name}&body=${message}`}
                    >
                        Send message
                    </Link>
                </div>
            )}
        </>
    );
}
