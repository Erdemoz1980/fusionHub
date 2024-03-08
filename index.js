const express = require('express');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const devjobsSchema = require('./devjobs/schema/devjobsSchema');
const {errorHandler } = require('./ecommerce/middleware/errorMiddleware');

const port = process.env.PORT || 3000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Graphql routing
app.use('/devjobs', graphqlHTTP({
  schema:devjobsSchema,
  graphiql:true
}))

//Ecommerce Rest Api
app.use('/ecommerce/products', require('./ecommerce/routes/productRoutes'))
app.use('/ecommerce/users', require('./ecommerce/routes/userRoutes'))
app.use('/ecommerce/orders', require('./ecommerce/routes/orderRoutes'))
app.use('/ecommerce/send-email', require('./ecommerce/routes/mailRoutes'))

// Error handling for both GraphQL and REST
app.use(errorHandler);



app.listen(port, () => console.log(`Server is listenning on port:${port}`));