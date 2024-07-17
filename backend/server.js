const express = require("express");
const userRoutes = require("./userRoutes");

const app = express();

const connectDB = require("./db");

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/user", userRoutes);

PORT = 5000;
app.listen(PORT, console.log(`Server is runnning on port ${PORT}`));
