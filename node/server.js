const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const { ApolloServer } = require('apollo-server-express')
const makeExecutableSchema = require('./server.graphql')

const server = new ApolloServer({
  schema: makeExecutableSchema,
  playground: true,
})

// Use the BodyParser as a middleware
app.use(bodyParser.json())

// Set port for the app to listen on
app.set('port', process.env.PORT || 9100)

// Set path to serve static files
app.use(express.static(path.join(__dirname, 'public')))

// Enable CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Accept-Encoding, Accept-Language, Access-Control-Request-Headers, Access-Control-Request-Method'
  )
  next()
})

server.applyMiddleware({ app })

app.listen(PORT, function () {
  console.log(`Express server listening on port :${PORT}${server.graphqlPath}`)
})
