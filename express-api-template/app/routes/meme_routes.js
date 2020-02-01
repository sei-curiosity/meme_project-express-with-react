const express = require('express')

const passport = require('passport')

//import the model of meme
const Meme = require('../models/meme')
const User = require('../models/user');

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404;

const requireOwnership = customErrors.requireOwnership;


const requireToken = passport.authenticate('bearer', {session:false})

const router = express.Router();

//INDEX - get /memes
router.get('/memes',requireToken,(req,res,next) => {
     const id = req.user.id;
    Meme.find({'owner':id})
    .then((memes) => {
        res.status(200).json({memes:memes})
    })
    .catch(next);

    // User.findById(id)
    // .populate('memes')
    // .then((user) => res.status(200).json({memes:user.memes}))
    // .catch(next);
})


// CREATE -post /memes
router.post('/memes',requireToken,(req,res,next) => {
    const id = req.user.id
    const newMeme = req.body.meme
    newMeme.owner = id

    Meme.create(newMeme)
    .then(meme => {
        res.status(201).json({meme:meme})
    })
    .catch(next);
})


//SHOW - get /memes/:id
router.get('/memes/:id',requireToken,(req,res,next) => {
    const idMeme = req.params.id
    Meme.findById(idMeme)
    .then(handle404)
    .then((meme) => {
        requireOwnership(req,meme)
        res.status(200).json({meme:meme})
    })
    .catch(next)
})


//Update -put/patch /memes/:id
router.put('/memes/:id',requireToken,(req,res,next) => {
    const idMeme = req.params.id;
    const updateMeme = req.body.meme;


    Meme.findById(idMeme)
    .then(handle404)
    .then((meme) => {
        requireOwnership(req,meme)
        return meme.update(updateMeme)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})


//Destroy - delete /memes/:id
router.delete('/memes/:id',requireToken,(req,res,next) => {
    const idMeme = req.params.id
    Meme.findById(idMeme)
    .then(handle404)
    .then((meme) => {
        requireOwnership(req,meme)
        meme.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})



module.exports = router

