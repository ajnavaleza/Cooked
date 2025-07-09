const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

// MongoDB connection
async function connectDB() {
  let mongoUri = process.env.MONGO_URI;
  
  if (mongoUri === 'memory') {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongod = await MongoMemoryServer.create();
    mongoUri = mongod.getUri();
    console.log('🧠 Using MongoDB Memory Server');
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      dbName: 'cooked-app'
    });
    
    const port = process.env.PORT || 5000;
    app.listen(port, '0.0.0.0', () => {
      console.log(`✅ Server running on port ${port}`);
      console.log(`✅ MongoDB connected to cooked-app database`);
    });
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    console.log('\n💡 Solutions:');
    console.log('1. Install and start MongoDB locally');
    console.log('2. Use MongoDB Atlas (cloud database)');
    console.log('3. Set MONGO_URI=memory in .env for development');
    process.exit(1);
  }
}

connectDB(); 