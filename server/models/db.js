
const { Pool } = require("pg");

require('dotenv').config();
const  {MongoClient} = require('mongodb');




// const pool = new Pool({
//     user: "shanmukasagar",
//     host: "ep-red-grass-a1ch12cb-pooler.ap-southeast-1.aws.neon.tech" ,
//     database: "research_forms",
//     password: "NIMSforms@123",
//     port: 5432,
//     ssl: { rejectUnauthorized: false }
// });
const pool = new Pool({
  user: "neondb_owner",
  host: "ep-sparkling-hill-a1u749gy-pooler.ap-southeast-1.aws.neon.tech",
  database: "Student_LifeCycle",
  password: "npg_VNP9fR0LeObo",
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

// const pool = new Pool({
//     user: "postgres",          // default user
//     host: "localhost",         // local db
//     database: "student_lifecycle",  // database you created
//     password: "naveen", // the password you set
//     port: 5432
// });

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


