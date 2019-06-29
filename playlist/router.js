const express = require('express')
const router = express.Router()
const Playlist = require('./model')
// const { Router } = require('express')
// const router = new Router

router.get('/playlists', function (req, res, next) {
    const limit = req.query.limit || 7
    const offset = req.query.offset || 0

    Promise.all([
        Playlist.count(),
        Playlist.findAll({ limit, offset })
    ])
        .then(([total, playlist]) => {
            res.status(200).send({ playlist, total })
        })
        .catch(err => {
            res.status(404).json({
                message: `Not found`,
                error: err
            })
            next(err)
        })
})

router.post('/playlists', function (req, res, next) {
    Playlist
        .create(req.body)
        .then(playlist => res.status(201).send(playlist))
        .catch(err => {
            res.status(422).json({
                message: `Resource can't be saved or updated`,
                error: err
            })
            next(err)
        })
})

router.get('/playlists/:id', function (req, res, next) {
    const { id } = req.params
    Playlist
        .findByPk(id)
        .then(playlist => res.status(200).send(playlist))
        .catch(err => {
            res.status(404).json({
                message: `Not found`,
                error: err
            })
            next(err)
        })
})

router.delete('/playlists/:id', function (req, res) {
    const { id } = req.params
    Playlist
        .destroy({ where: { id } })
        .then(playlist => res.status(200).send(playlist))
        .catch(err => {
            res.status(422).json({
                message: `Resource can't be saved or updated`,
                error: err
            })
            next(err)
        })
})

router.put('/playlists/:id', function (req, res, next) {
    const { id } = req.params
    const { name } = req.body
    Playlist
        .findByPk(id)
        .then(playlist => playlist.update({ name }))
        .then(playlist => res.status(200).json({
            message: 'Playlist updated!',
            playlist
        }))
        .catch(err => {
            res.status(422).json({
                message: `Resource can't be saved or updated`,
                error: err
            })
            next(err)
        })
})

module.exports = router
