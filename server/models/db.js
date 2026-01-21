
const { Pool } = require("pg");

require('dotenv').config();
const  {MongoClient} = require('mongodb');


// const pool = new Pool({
//   user: "neondb_owner",
//   host: "ep-floral-recipe-adwtj77g-pooler.c-2.us-east-1.aws.neon.tech",
//   database: "Student_LifeCycle",
//   password: "npg_riZ7A8BKwXuY",
//   port: 5432,
//   ssl: { require: true, rejectUnauthorized: false }
// });

const pool = new Pool({
    user: "postgres",          // default user
    host: "172.25.4.79",         // local db
    database: "Student_LifeCycle",  // database you created
    password: "postgres", // the password you set
    port: 5432
});

let client;
let isConnected = false;
const uri = process.env.MONGO_URI;
const dbName = process.env.WAYPOINT;

client = new MongoClient(uri); // Create mongoclient

async function connectToMongo() {
    try {
        if(!isConnected) {
            await client.connect();
            isConnected = true;
            console.log('Connected to MongoDB');
        } else {
            console.log('Connection is already active');
        }
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        isConnected = false;
        throw error; // Throw error to indicate failure to connect
    }
}

const getDB = () => {
    if(!client){
        throw new Error('MongoDB client is not connected');
    }
    else{
        return client.db(dbName);
    }
};
function getStipendCollection() {
    const db = getDB();
    return db.collection('Stipends'); // Make sure this matches your actual collection name
  }
  
  // Optional: Helper for other collections
  function getCollection(collectionName) {
    const db = getDB();
    return db.collection(collectionName);
  }

module.exports = { 
    connectToMongo, 
    getDB,
    getStipendCollection,  
    getCollection,
  pool
};


