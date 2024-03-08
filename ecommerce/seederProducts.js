const { ProductModel } = require('./models/models');
const productsData = require('./productsData');
const connectDB = require('./config/db');
const dotenv = require('dotenv')

dotenv.config()

connectDB();

const seedDatabase = async () => {
  try {
    await ProductModel.deleteMany()

    for (const document of productsData) {
      const newDocument = new ProductModel(document)
      await newDocument.save()

      console.log('Product seeded succesfully!')
    }
    process.exit()
  
  } catch (error) {
    console.error(error);
    process.exit(1)
    
  }
}

seedDatabase()

module.exports = seedDatabase;