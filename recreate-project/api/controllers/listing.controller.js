import { errorHandle } from "../middleware/errorHandle.js";
import Listing from "../models/listing.model.js";

export const createListing = async (req, res, next) => {
    const { name } = req.body;
    // console.log("INPUT NAME ---- ", name);

    const isNameUsed = await Listing.findOne({ name });
    if (isNameUsed) {
        next(errorHandle(400), "Listing name has been used");
        return;
    }
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
};
