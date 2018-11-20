const keys = require('./config/keys');
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')

const auth = require('./routes/api/auth')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

// Initialize express
const app = express();

// Body-Parser middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Connect to MongoDB
mongoose.connect(keys.mongoURI)
    .then(() => console.log('Success! Connected to MongoDB'))
    .catch(err => console.log(err))

// Passport Middleware
app.use(passport.initialize())
// Passport Config
require('./config/passport')(passport)



// Use Routes
app.use('/api/auth', auth)
app.use('/api/profile', profile)
app.use('/api/posts', posts)














// Connect to port
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server is running on port ${port}`));