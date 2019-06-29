const express = require('express')
const router = express.Router()
const Song = require('./model')
// const { Router } = require('express')
// const router = new Router

router.get('/playlists/:id/songs', function (req, res, next) {
    const limit = req.query.limit || 10
    const offset = req.query.offset || 0

    Promise.all([
        Song.count(),
        Song.findAll({ limit, offset })
    ])
        .then(([total, songs]) => {
            res.status(200).send({ songs, total })
        })
        .catch(err => {
            res.status(404).json({
                message: `Not found`,
                error: err
            })
            next(err)
        })
})

router.post('/playlists/:id/songs', function (req, res, next) {
    Song
        .create(req.body)
        .then(song => res.status(201).send(song))
        .catch(err => {
            res.status(422).json({
                message: `Resource can't be saved or updated`,
                error: err
            })
            next(err)
        })
})

module.exports = router
