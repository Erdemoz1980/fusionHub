const express = require('express');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const connectDB = require('./config/db');
const { DevJobModel } = require('./devjobs/models/DevJobmodel');
const devjobsSchema = require('./devjobs/schema/devjobsSchema');
const {errorHandler } = require('./ecommerce/middleware/errorMiddleware');

const port = process.env.PORT || 3000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

connectDB(process.env.MONGO_ECOMMERCE, 'devjobsMain');
connectDB(process.env.MONGO_DEVJOBS, 'ecommerceMain');


//Graphql routing
app.use('/devjobs', graphqlHTTP({
  schema:devjobsSchema,
  graphiql: process.env.NODE_ENV === 'dev',
  context: { DevJobModel }
}))

//Ecommerce Rest Api
app.use('/ecommerce/products', require('./ecommerce/routes/productRoutes'))
app.use('/ecommerce/users', require('./ecommerce/routes/userRoutes'))
app.use('/ecommerce/orders', require('./ecommerce/routes/orderRoutes'))
app.use('/ecommerce/send-email', require('./ecommerce/routes/mailRoutes'))

// Error handling for both GraphQL and REST
app.use(errorHandler);


app.listen(port, () => console.log(`Server is listenning on port:${port}`));