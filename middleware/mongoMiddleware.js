
import connectToMongoDB from '../database/db.js';

async function mongoMiddleware(req, res, next) {
  try {
    const db = await connectToMongoDB();
    req.db = db; // Attach the MongoDB database instance to req.db
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default mongoMiddleware;
