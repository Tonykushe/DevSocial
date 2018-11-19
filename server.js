const express = require('express');
const mongoose = require('mongoose')
const keys = require('./config/keys')


const auth = require('./routes/api/auth')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

// Initialize express
const app = express();

// Connect to MongoDB
mongoose.connect(keys.mongoURI)
    .then(() => console.log('Success! Connected to MongoDB'))
    .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello Tony'))

// Use Routes
app.use('/api/auth', auth)
app.use('/api/profile', profile)
app.use('/api/posts', posts)














// Connect to port
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server is running on port ${port}`));