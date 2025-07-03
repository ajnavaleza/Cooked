const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// MongoDB connection with Memory Server support
async function connectDB() {
  let mongoUri = process.env.MONGO_URI;
  
  // Use MongoDB Memory Server for development
  if (mongoUri === 'memory') {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongod = await MongoMemoryServer.create();
    mongoUri = mongod.getUri();
    console.log('🧠 Using MongoDB Memory Server for development');
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`✅ Server running on port ${port}`);
      console.log(`✅ MongoDB connected successfully`);
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