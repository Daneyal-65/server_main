import cron from "node-cron";
import { Admin } from "../private/Admin.mjs";
import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

// Schedule messaging task to run every minute
cron.schedule("*/1 * * * *", async () => {
  try {
    const usersCollection = db.collection("userdata");
    const users = await usersCollection.find().toArray();

    // Debugging: log users to see if they're fetched correctly
    console.log("Users:", users);

    // Compute time difference and send message
    for (const user of users) {
      const { messagingTime, firebaseToken } = user;
      const currentTime = new Date();
      const timeDiff = messagingTime.getTime() - currentTime.getTime();
      if (timeDiff >= 0 && timeDiff <= 60000) {
        // Send message if within 1 minute of messaging time
        const message = {
          notification: {
            title: "Your Daily Message",
            body: "Your message content goes here",
          },
          token: firebaseToken,
        };
        await Admin.messaging().send(message);

        // Debugging: log message sent to each user
        console.log("Message sent to user:", user._id);
      }
    }
  } catch (error) {
    console.error("Error scheduling messaging task:", error);
  }
});
