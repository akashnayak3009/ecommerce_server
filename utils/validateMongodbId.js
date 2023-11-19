import mongoose from "mongoose";

export const validateMongodbId = (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
        return res.status(404).json("This id is not valid or not found")
    }
}