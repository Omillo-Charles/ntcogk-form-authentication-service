import mongoose from 'mongoose';
import config from '../config/env.js';

// MongoDB connection options
const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 30000,
  retryWrites: true,
  w: 'majority',
};

// Connect to MongoDB
export const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    
    if (!config.database.mongoUri) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }
    
    const conn = await mongoose.connect(config.database.mongoUri, options);

    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
    console.log(`✓ Database: ${conn.connection.name}`);
    
    return conn;
  } catch (error) {
    console.error('✗ MongoDB Connection Error:', error.message);
    console.error('Please check:');
    console.error('1. Your internet connection');
    console.error('2. MongoDB Atlas IP whitelist (add 0.0.0.0/0 for Vercel)');
    console.error('3. Database credentials in environment variables');
    console.error('4. MONGO_URI format is correct');
    
    // Don't exit immediately in production, let the error handler deal with it
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    } else {
      throw error; // Re-throw to be caught by error handler
    }
  }
};

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('MongoDB connection established');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  } catch (err) {
    console.error('Error closing MongoDB connection:', err);
    process.exit(1);
  }
});

export default connectDB;
