import { errorHandle } from "../middleware/errorHandle.js";
import Listing from "../models/listing.model.js";

export const createListing = async (req, res, next) => {
    const { name } = req.body;
    // console.log("INPUT NAME ---- ", name);

    const isNameUsed = await Listing.findOne({ name });
    if (isNameUsed) {
        return next(errorHandle(400, "Listing name has been used"));
    }
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
};

export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return next(errorHandle(404, "Listing not found"));
    }

    if (req.user.userId !== listing.userRef) {
        return next(errorHandle(401, "You may only delete your own listings"));
    }

    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json("Listing has been deleted!");
    } catch (error) {
        next(error);
    }
};
