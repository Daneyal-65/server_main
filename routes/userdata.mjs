import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import cron from "node-cron";

const router = express.Router();

// signUP request handle
router.post("/signup", async (req, res) => {
  try {
    const collection = await db.collection("userdata");
    const registerData = req.body;
    registerData.date = new Date();
    const result = await collection.insertOne(registerData);
    result.redirectUrl = "/login";
    res.json(result); // Send back the inserted document
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// get all the habits that user registered
router.get("/gethabit", async (req, res) => {
  try {
    // Assuming db is your MongoDB connection
    const collection = await db.collection("userhabits");

    // Destructure userId from query parameters
    const { userId } = req.query;

    // Convert the cursor to an array to get the actual data
    const result = await collection.find({ userId: userId }).toArray();

    // Send the result as JSON response
    res.json(result);
  } catch (err) {
    console.error(err + "" + req.query);
    // Handle errors appropriately, for now, just sending a generic response
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/habit", async (req, res) => {
  try {
    const collection = await db.collection("userhabits");
    const registerData = req.body;
    registerData.date = new Date();
    const result = await collection.insertOne(registerData);
    res.json(result); // Send back the inserted document
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//

// login request handled

//
router.get("/login", async (req, res) => {
  try {
    const collection = await db.collection("userdata");
    const { userName, password } = req.query;
    const user = await collection.findOne({ userName, password });
    if (user) {
      res.json({ userName, userId: user._id, ok: true, redirectUrl: "/home" });
    } else {
      console.log("invalid input");
      res.json({ message: "username or password incorrect!!!", ok: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// for fcm token get request
router.get("/FCM", async (req, res) => {
  try {
    const collection = await db.collection("userdata");
    const { userId } = req.query;
    const id = new ObjectId(userId);
    const data = await collection.findOne({ _id: id });
    console.log(data);
    res.json(data);
  } catch (e) {
    console.log(e);
    res.status(501).json({ msg: "bad request" });
  }
});
// async function get_data(userId) {
//   const collection = db.collection("userdata");
//   const data = await collection.findOne({ _id: userId });
//   console.log(data);
// }
// const userId = new ObjectId("662e7987d23ccc9934e6d61d");
// get_data(userId);
export default router;
