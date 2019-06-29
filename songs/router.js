const { Router } = require('express')
const Song = require('./model')
const auth = require('../auth/middleware')
const Playlist = require('../playlist/model')

const router = new Router

router.get('/playlists/:id/songs', auth, function (req, res, next) {
    const limit = req.query.limit || 10
    const offset = req.query.offset || 0

    Playlist.findOne({
        where: {
            id: req.params.id,
            userId: req.user.dataValues.id
        }
    })
    .then(playlist => {
        if (!playlist) {
            res.status(404).send(playlist)
        }

        Promise.all([
            Song.count({ where: { playlistId: req.params.id }, limit, offset }),
            Song.findAll({ where: { playlistId: req.params.id }, limit, offset })
        ])
            .then(([playlist, total, songs]) => {
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
})

router.post('/playlists/:id/songs', auth, function (req, res, next) {
    Playlist.findOne({
        where: {
            id: req.params.id,
            userId: req.user.dataValues.id
        }
    })
    .then(playlist => {
        if (!playlist) {
            res.status(404).send(playlist)
        }
        req.body.playlistId = playlist.id
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
})

module.exports = router
