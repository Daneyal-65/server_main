import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import userdata from "./routes/userdata.mjs";
const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
// Load the /posts routes
app.use("/userdata", userdata);
app.use("/userdata", userdata);
// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.");
});

// start the Express server

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
