const express = require("express");
const router = express.Router();

// Get all recipes
router.get("/recipes", (req, res) => {
  res.json([
    {
      id: 1,
      title: "Spaghetti Carbonara",
      ingredients: ["pasta", "egg", "cheese"],
    },
    { id: 2, title: "Avocado Toast", ingredients: ["bread", "avocado"] },
  ]);
});

module.exports = router;
