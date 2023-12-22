
import { MongoClient } from "mongodb";
import dotenv from "dotenv"
dotenv.config();


    const MONGODB_URI =process.env.MONGO_URL; // Replace with your MongoDB URI
    
let db; // Declare a variable to hold the database instance

async function connectToMongoDB() {
  if (!db) {
    const client = new MongoClient(MONGODB_URI);

    try {
      await client.connect();
      console.log('Connected to MongoDB');
      db = client.db("mobileApplication"); // Set the database instance
      return db;
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  } else {
    return db; // Return the existing database instance
  }
}


export default connectToMongoDB;




