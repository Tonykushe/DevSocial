const express = require('express');
const router = express.Router();
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../../config/config')


//Load User model
const User = require('../../models/User')

// @route   GET api/auth/test
// @desc    Test auth route
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'Auth Works'}));



// @route   POST api/auth/register
// @desc    Register new User
// @access  Public
router.post('/register', (req, res) => {
    // Check if email already exists
    const email = req.body.email
    User.findOne({email}).then(user => {
        if (user) {
            return res.status(400).json({email: 'Email already exists'})
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: '200', // Size
                r: 'pg', // Rating
                d: 'mm', // Deafult image
            });

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                })
            })

        }
    })
})

// @route   POST api/auth/login
// @desc    Login user / Return JWT Token
// @access  Public
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password

    User.findOne({email}).then(user => {
        // Check if user doesn't exist
        if (!user) {
            return res.status(404).json({email: 'User not found'})
        }

        // Check Password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // Create JWT Payload
                const payload = {id: user._id, name: user.name}
                // Sign the Token
                jwt.sign(payload, config.TokenKey, {expiresIn: 604800}, (err, token) => {
                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    })
                })
            } else {
                return res.status(400).json({password: 'Password incorrect'})
            }
        })
    })

})


module.exports = router;
