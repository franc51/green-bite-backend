const recipeModel = require("../modelsNew/recipeModel");

// Get all recipes
exports.getRecipes = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 12; // recipes per page
    const page = parseInt(req.query.page) || 1; // current page
    const skip = (page - 1) * limit;

    const recipes = await recipeModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await recipeModel.countDocuments();

    res.json({
      recipes,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error", error: err.message });
  }
};

// Get a single recipe by ID
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await recipeModel.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error", error: err.message });
  }
};

// Create a new recipe
exports.createRecipe = async (req, res) => {
  try {
    // Arrays
    const ingredients = req.body.ingredients || [];
    const instructions = req.body.instructions || [];

    const recipeData = {
      title: req.body.title,
      category: req.body.category,
      cooktime: req.body.cooktime?.toString() || "30",
      servings: req.body.servings || 1,
      difficulty: req.body.difficulty || "easy",
      ingredients,
      instructions,
      vegan: !!req.body.vegan,
      keto: !!req.body.keto,
      author: req.body.author || "Anonymous",
      picture: req.body.picture || null, // now a URL string
    };

    const recipe = new recipeModel(recipeData);
    await recipe.save();

    res.status(201).json(recipe);
  } catch (err) {
    console.error("Create recipe error:", err);
    res.status(500).json({ message: "Database error", error: err.message });
  }
};

// Update a recipe by ID
exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await recipeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error", error: err.message });
  }
};

// Delete a recipe by ID
exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await recipeModel.findByIdAndDelete(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json({ message: "Recipe deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error", error: err.message });
  }
};
