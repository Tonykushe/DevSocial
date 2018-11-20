const config = require('./config/config');
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const auth = require('./routes/api/auth')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

// Initialize express
const app = express();

// Body-Parser middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Connect to MongoDB
mongoose.connect(config.mongoURI)
    .then(() => console.log('Success! Connected to MongoDB'))
    .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello Tony Mugendi'))

// Use Routes
app.use('/api/auth', auth)
app.use('/api/profile', profile)
app.use('/api/posts', posts)














// Connect to port
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server is running on port ${port}`));