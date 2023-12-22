import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path';
import mongoose from "mongoose";
import routes from "./routes/routes.js";
import connectToMongoDB from './database/db.js';
import handleErrors from './middleware/errorMiddleware.js';
import {initializeData} from "./models/data.js"
import dotenv from "dotenv"
// import { initializeData } from './models/data.js';

const app = express();
const PORT = process.env.PORT || 3001;
dotenv.config();
initializeData();
mongoose.set("strictQuery", false);

app.use(async (req, res, next) => {
  try {
    const db = await connectToMongoDB();
    req.db = db; // Attach the MongoDB database instance to req.db
    // initializeData();
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.use(cors());
app.use(bodyParser.json());

    app.use('/api', routes);
    app.use(handleErrors);

    // Serve the React app for any other routes
  

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  app.get('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
  });