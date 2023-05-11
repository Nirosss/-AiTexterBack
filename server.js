const express = require('express')
require('dotenv').config()
const translateRouter = require('./routes/translate')
const cors = require('cors')
const path = require('path')
const app = express()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')))
} else {
  const corsOptions = {
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
    credentials: true,
  }
  app.use(cors(corsOptions))
}

const corsOptions = {
  origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
  credentials: true,
}
app.use(cors(corsOptions))

app.use(express.static(path.resolve(__dirname, 'public')))

const PORT = process.env.PORT || 8080

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST, PUT')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})


app.use((req, res, next) => {
  console.log(`Received request ${req.method} ${req.url} ${req.hostname}`)
  next()
})

app.use(express.json())

app.use('/translate', translateRouter)

app.get('/**', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript')
  res.sendFile(path.join(__dirname, 'public', 'index.html'), (err) => {
    console.log(req.params)
    if (err) {
      // Handle the error and send a response
      res.status(404).send('File not found')
    }
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
