const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db");

// Importing routes
const recipeRoutes = require("./Routes/recipeRoutes");

const app = express();
const PORT = process.env.PORT;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/recipes", recipesRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
