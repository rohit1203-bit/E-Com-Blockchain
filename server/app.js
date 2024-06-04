const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
require('dotenv').config()

// Routes
const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')

// Initialize and connect to database
const app = express()
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, console.log('App Listening on port', PORT))
  })
  .catch(err => {
    console.error(err.message)
    process.exit(1)
  })

// Middlewares
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions))

app.use(cookieParser())
app.use(express.json())
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))

const VERSION = process.env.VERSION;
const api = `/api/v${VERSION}`

// Routes
app.use(`${api}/auth`, authRoutes)
app.use(`${api}/product`, productRoutes)