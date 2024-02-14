import express from "express";
import db ,{close} from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();



// signUP request handle
  router.post("/signup", async (req, res) => {
    try {
      const collection = await db.collection("userdata");
      const registerData = req.body;
      registerData.date = new Date();
      const result = await collection.insertOne(registerData);
      result.redirectUrl='/login'
      res.json(result); // Send back the inserted document
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
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
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
//   

// login request handled

// 
  router.get('/login',async (req,res)=>{
 try{
    const collection = await db.collection("userdata");
    const {userName,password} = req.query;
    const user = await collection.findOne({userName,password});
    if(user){
        res.json({message:"successfull",ok:true,redirectUrl:"/"});
    }
    else{
        console.log("invalid input");
        res.json({message:"username or password incorrect!!!",ok:false});
    }
 }catch (err){
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
 }

  })
close.close()
export default router;
