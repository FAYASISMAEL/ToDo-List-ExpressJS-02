import express from "express";
import path from 'path';
import { dirname,join } from "path";
import url, { fileURLToPath } from "url";
// import mongoose from 'mongoose';
import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient("mongodb://127.0.0.1:27017")
let __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json());

let collection;

async function connectDatabase(){
    try {
        await client.connect();
        console.log("Database connected");
        const db = client.db("tododb");
        collection = db.collection("todo");
        app.listen(6001,() => {
            console.log("the server is running at http://localhost:6001");
        })
    }
    catch (error){
        console.log(error);
    }
}

connectDatabase();

// set 'public' folder as a static folder
app.use(express.static(path.join(__dirname,"public")));

// app.get("/",(req,res) => {
//     res.sendFile(path.join(__dirname,"public","index.html"));

app.use(express.urlencoded())

app.post("/send-data",async(req,res) => {
    console.log(req.body);
    await collection.insertOne(req.body);
    res.status(200).sendFile(join(__dirname,"public","index.html"));
})  

app.get("/getdata",async(req,res) => {
    const todo = await collection.find({}).toArray();
    console.log(todo);
    res.status(200).send(JSON.stringify(todo));
})

app.get("/update",async(req,res) => {
    const todo = await collection.find({}).toArray();
    console.log(todo);
    res.status(200).send(JSON.stringify(todo));
})

// app.get("/getdata",async (req,res)=>{
//     const data = await collection.find({}).toArray()
//     res.send(JSON.stringify(data))
    
// })

// //add data to databse section
// app.post("/add-task", async (req, res) => {
//     try {
//         await collection.insertOne(req.body);
//         res.status(200).send("Data Added Successfully");
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });

app.post("/update/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id);
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: req.body });
    res.status(200).redirect("/")
});

app.get("/delete/:id", async (req, res) => {
    const { id } = req.params
    await collection.deleteOne({ _id: new ObjectId(id) })
    res.status(200).redirect("/")
});