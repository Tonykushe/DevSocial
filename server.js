const express = require('express');
const mongoose = require('mongoose')
const keys = require('./config/keys')

mongoose.connect(keys.mongoURI)
    .then(() => console.log('Success! Connected to MongoDB'))
    .catch(err => console.log(err))
const app = express();

app.get('/', (req, res) => res.send('Hello Tony'))

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server is running on port ${port}`));