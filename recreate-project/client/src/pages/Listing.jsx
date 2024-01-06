import { list } from "firebase/storage";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

const Listing = () => {
    SwiperCore.use([Navigation]);
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const params = useParams();

    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/listing/get/${params.listingId}`);
                const data = await res.json();
                if (data.success === false) {
                    toast.error(data.message);
                    setError(true);
                    setLoading(false);
                    return;
                }
                setListing(data);
                setLoading(false);
                setError(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchListing();
    }, [params.listingId]);

    console.log(listing);
    return (
        <main>
            {loading && <p className="text-center my-7 text-2xl">LOADING...</p>}
            {error && (
                <p className="text-center my-7 text-2xl">
                    "Something went wrong..."
                </p>
            )}
            {listing && !loading && !error && (
                <>
                    <Swiper navigation loop={true}>
                        {listing.imageUrls.map((url) => (
                            <SwiperSlide>
                                <div className="h-[480px] w-full bg-slate-100">
                                    <img
                                        src={url}
                                        alt="images"
                                        className="object-cover w-full h-[480px]"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </>
            )}
        </main>
    );
};
export default Listing;
