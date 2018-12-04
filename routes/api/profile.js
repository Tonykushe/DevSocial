const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
// Load Profile Model
const Profile = require('../../models/Profile')
// Load User Model
const User = require('../../models/User')

// @route   GET api/profile/test
// @desc    Test profile route
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'Profile Works'}));



// @route   get api/profile/test
// @desc    Get Current User's Profile
// @access  Private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const errors = {}
    Profile.findOne({ user: req.user.id })
        .populate('user', ['name', 'avatar'] )
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user'
                return res.status(404).json(errors)
            }
            res.json(profile)
    }).catch(err => res.status(404).json(err))
});

// @route   GET api/profile/all
// @desc    GET all Profiles
// @access  Public
router.get('/all', (req, res) => {
    const errors = {}
    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles => {
            if (!profiles) {
                 errors.noprofile = 'There are no profiles'
                 return res.status(404).json(errors)
            }

            res.json(profiles)
        }).catch(err => res.status(404).json({profile: 'There are no profiles'}))
})



// @route   GET api/profile/handle/:handle
// @desc    GET profile by users handle
// @access  Public

router.get('/handle/:handle', (req, res) => {
    const errors = {}
    Profile.findOne({ handle: req.params.handle })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user'
                return res.status(404).json(errors)
            }

            res.json(profile)
        }).catch(err => res.status(404).json(err))
});


// @route   GET api/profile/user/:user_id
// @desc    GET profile by users ID
// @access  Public

router.get('/user/:user_id', (req, res) => {
    const errors = {}
    Profile.findOne({ user: req.params.user_id })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user'
                return res.status(404).json(errors)
            }

            res.json(profile)
        }).catch(err => res.status(404).json({profile: 'There is no profile for this user'}))
});



// @route   POST api/profile/test
// @desc    create or Update User's Profile
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const errors = {}
    // Get Fields
    const profileFields = {}
    profileFields.user = req.user.id
    if (req.body.handle) profileFields.handle = req.body.handle
    if (req.body.company) profileFields.company = req.body.company
    if (req.body.location) profileFields.location = req.body.location
    if (req.body.status) profileFields.status = req.body.status
    if (req.body.github) profileFields.github = req.body.github
    // Skills  - Split into Array
    if (typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',')
    }
    // Social
    profileFields.social = {}
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram
    
   Profile.findOne({user: req.user.id}).then(profile => {
       if (profile) {
           // Update Profile
           Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
            .then(profile => res.json(profile))
       } else {
           // Create Profile
           // Check if handle exists
           Profile.findOne({ handle: profileFields.handle }).then(profile => {
               if (profile) {
                   errors.handle = 'The handle already exists'
                   return res.status(400).json(errors)
               }

               // Save profile
               new Profile(profileFields).save().then(profile => res.json(profile))
           })
       }
   })

    
})




module.exports = router;