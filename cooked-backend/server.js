const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    status: 'healthy', 
    message: 'Cooked Backend API is running!', 
    timestamp: new Date().toISOString() 
  });
});

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

  // Ensure we're connecting to the correct database
  if (mongoUri && !mongoUri.includes('/cooked-app')) {
    // If the URI doesn't already specify a database, add /cooked-app
    if (mongoUri.includes('mongodb://') || mongoUri.includes('mongodb+srv://')) {
      // Check if there's already a database specified
      const uriParts = mongoUri.split('?');
      const baseUri = uriParts[0];
      const queryParams = uriParts[1] ? '?' + uriParts[1] : '';
      
      // If no database is specified in the URI, add /cooked-app
      if (!baseUri.includes('.net/') && !baseUri.includes('.com/') && !baseUri.includes('localhost/')) {
        mongoUri = baseUri + '/cooked-app' + queryParams;
      } else if (baseUri.endsWith('.net') || baseUri.endsWith('.com') || baseUri.endsWith('localhost')) {
        mongoUri = baseUri + '/cooked-app' + queryParams;
      }
    }
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      dbName: 'cooked-app' // Explicitly specify the database name
    });
    
    const port = process.env.PORT || 5000;
    app.listen(port, '0.0.0.0', () => {
      console.log(`✅ Server running on port ${port}`);
      if (process.env.NODE_ENV === 'production') {
        console.log(`✅ Server running in production mode`);
      } else {
        console.log(`✅ Server accessible at http://192.168.1.154:${port}`);
      }
      console.log(`✅ MongoDB connected successfully to cooked-app database`);
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