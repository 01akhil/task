const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./src/config/db");
const taskRoutes = require("./src/routes/tasks");
const corsOptions = require("./src/config/cors");

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/api/tasks", taskRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
