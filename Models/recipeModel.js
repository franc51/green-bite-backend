const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    picture: { type: String }, // URL to image
    rating: { type: Number, default: 0 },
    title: { type: String, required: true },
    cooktime: { type: String }, // e.g., "30 mins"
    servings: { type: Number },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },
    ingredients: { type: [String], required: true },
    instructions: { type: [String], required: true },
    vegan: { type: Boolean, default: false },
    keto: { type: Boolean, default: false },
    author: { type: String, default: "Anonymous" }
    favorites: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("recipeModel", recipeSchema);
