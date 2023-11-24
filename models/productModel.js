import mongoose from "mongoose";

let productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    brand: {
        type: String,
        enum: ["Apple", "Samsung", "Other"]
    },
    quantity: {
        type: Number,
    },
    sold: {
        type: Number,
        default: 0,
        select:false    //hide form user 
    },
    images: {
        type: Array,
    },
    color: {
        type: String,
        enum: ['Black', 'Brown', 'Red']
    },
    ratings: [{
        star: Number,
        postedBy: { type: mongoose.Schema.ObjectId, ref: "User" }
    }]
},
    {
        timestamps: true,
    }
)


const Product = mongoose.model("Product", productSchema);
export default Product