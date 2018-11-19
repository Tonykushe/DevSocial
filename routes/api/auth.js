const express = require('express');
const router = express.Router();
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')


//Load User model
const User = require('../../models/User')

// @route   GET api/auth/test
// @desc    Test auth route
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'Auth Works'}));



// @route   GET api/auth/register
// @desc    Register new User
// @access  Public
router.post('/register', (req, res) => {
    // Check if email already exists
    let email = req.body.email
    User.findOne(email).then(user => {
        if (email) {
            return res.status(400).json({email: 'Email already exists'})
        } else {
            const avatar = gravatar.url(email, {
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
                        .catch(e => res.status(400).send())
                })
            })

        }
    })
})


module.exports = router;