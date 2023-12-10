import mongoose from "mongoose";// Erase if already required

// Declare the Schema of the Mongo model
var prodcategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
const PCategory = mongoose.model("PCategory", prodcategorySchema);
export default PCategory;
