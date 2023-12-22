
import express from 'express'
import mongoose from 'mongoose'
import {ObjectId} from 'mongodb'
// import mongoMiddleware from '../middleware/mongoMiddleware.js';
import mongoMiddleware from '../middleware/mongoMiddleware.js';
 // Assuming data.js is in the same directory
// import mobiles from '../models/data.js';

import { initializeData } from '../models/data.js';

const router = express.Router();

// Endpoint to get all mobiles

// router.get('/mobiles', async (req, res) => {
//   try {
    
//     const { page = 1, limit = 6 } = req.query;
    
//     const skip = (page - 1) * limit;
//       const filteredMobiles = await req.db.collection('mobile')
//       .find()
//       .skip(skip)
//       .limit(parseInt(limit))
//       .toArray();
//       if (filteredMobiles.length === 0) {
//         return res.status(404).json({ error: 'No mobiles found.' });
//       }
  
//       res.json(filteredMobiles);
//   } catch (error) {
//     console.error('Error fetching paginated mobiles:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
  
  
  
//   });

// Endpoint to search for mobiles based on filters
router.get('/mobiles',mongoMiddleware,async (req, res) => {
    try {
      const { price, name, type, processor, memory, os,page=1,limit=2, sortDirection = 'asc' } = req.query;
  
      const query = {};
      if (price && !isNaN(price)) query.price = { $lte: parseInt(price) };
      if (name) query.name = { $regex: new RegExp(name, 'i') };
      if (type) query.type = { $regex: new RegExp(type, 'i') };
      if (processor) query.processor = { $regex: new RegExp(processor, 'i') };
      if (memory) query.memory = { $regex: new RegExp(memory, 'i') };
      if (os) query.os = { $regex: new RegExp(os, 'i') };
  
      const skip = (page - 1) * limit;
      const sortOrder = sortDirection === 'desc' ? -1 : 1
      const filteredMobiles = await req.db.collection('mobile')
      .find(query)
      .skip(skip)
      .sort({ price: sortOrder })
      .limit(parseInt(limit))
      .toArray();
      if (filteredMobiles.length === 0) {
        return res.status(404).json({ error: 'No mobiles found.' });
      }
  
      res.json(filteredMobiles);
    } catch (error) {
      console.error('Error searching for mobiles:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
// Endpoint to get details of a specific mobile
router.get('/mobiles/:id', async (req, res) => {
    const { id:id } = req.params;
    // console.log(id+" mobileid")
    
    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ObjectId' });
      }
  
      // Initialize ObjectId with new keyword
      const mobile = await req.db.collection('mobile').findOne({ _id:new ObjectId(id) });
    if (!mobile) {
      return res.status(404).json({ error: 'Mobile not found' });
    }
    res.json(mobile);
  });
export default router;
