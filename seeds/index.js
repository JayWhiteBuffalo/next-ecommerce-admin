/* mySeedScript.js */

// require the necessary libraries
const mongodb = require('mongodb');
const mongoose = require('mongoose');
// const MongoClient = require("mongodb").MongoClient;
const categoryData= require("./category-seeds");
const  Category  = require('../models/Category');
const {SessionProvider} = require('next-auth/react')
// import Category from '../models/Category';

const uri = "mongodb://ecommerce:wr6nrz1Ip98MGYpX@ac-dpls1u1-shard-00-00.ugjhqn7.mongodb.net:27017,ac-dpls1u1-shard-00-01.ugjhqn7.mongodb.net:27017,ac-dpls1u1-shard-00-02.ugjhqn7.mongodb.net:27017/?ssl=true&replicaSet=atlas-tutzc6-shard-0&authSource=admin&retryWrites=true&w=majority";
console.log("Check1")
const client = new mongodb.MongoClient(uri,
    {
     useNewUrlParser: true,
    // useUnifiedTopology: true,
});
const runSeeds = async () => {
    await SessionProvider().then(seedDB())
}
const seedDB = async() => {
    console.log(categoryData)
    // Connection URL
    console.log("Check2")
    await client.connect().then( Category.deleteMany({})).then(Category.insertMany(categoryData));
};

    // client.connect((err) => {
    //     if (err){
    //         console.log(err);
    //     } else {
    //     console.log("Connected correctly to server");
    //     const collection = client.db("test").collection("categories");
    //     // The drop() command destroys all data from a collection.
    //     // Make sure you run it against proper database and collection.
    //     collection.drop();
    //     collection.insertMany([seedCategories]);
    //     console.log("Database seeded! :)");
    //     } 
    // })
    //     };

runSeeds().then(() => {
    client.close().then(console.log("Connection Closed"));
});