const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db");

// Importing routes
const recipeRoutes = require("./routesNew/recipeRoutes");

const app = express();
const PORT = 5005;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/recipes", recipeRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
