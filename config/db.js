const mongoose = require('mongoose');

const connectDB = async (mongoURI, dbName) => {
  try {
   
    const conn = mongoose.createConnection(mongoURI);

    conn.on('error', (err) => {
      console.error(`${dbName} MongoDB connection error: ${err}`);
    });

    conn.on('connected', () => {
      console.log(`${dbName} MongoDB connected @ ${conn.host}`);
    });

    conn.on('disconnected', () => {
      console.log(`${dbName} MongoDB disconnected`);
    });

    process.on('SIGINT', () => {
      conn.close(() => {
        console.log(`${dbName} MongoDB connection closed due to application termination`);
        process.exit(0);
      });
    });

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
