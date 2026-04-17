const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log('MongoDB Connection Failed:', error.message);
    console.log('Starting in-memory MongoDB server as fallback...');
    try {
      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      const conn = await mongoose.connect(uri);
      console.log(`In-Memory MongoDB Connected: ${conn.connection.host}`);
      console.log('⚠️  Data will be lost when the server stops (in-memory only).');
    } catch (memError) {
      console.log('In-Memory MongoDB also failed:', memError.message);
      console.log('Server is running without database. API requests will fail gracefully.');
    }
  }
};

module.exports = connectDB;
