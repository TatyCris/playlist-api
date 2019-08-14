const { Router } = require('express')
const Playlist = require('./model')
const auth = require('../auth/middleware')

const router = new Router

router.get('/playlists', auth, function (req, res, next) {
    const limit = req.query.limit || 7
    const offset = req.query.offset || 0

    Promise
        .all([
            Playlist.findAll({ where: { userId: req.user.id }, limit, offset }),
            Playlist.count({ where: { userId: req.user.id }, limit, offset })
        ])
        .then(([playlist, total]) => {
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

router.post('/playlists', auth, function (req, res, next) {
    req.body.userId = req.user.dataValues.id
    Playlist
        .create(req.body)
        .then(playlist => {
            res.status(201).send(playlist)
        })
        .catch(err => {
            res.status(422).json({
                message: `Resource can't be saved or updated`,
                error: err
            })
            next(err)
        })
})

router.get('/playlists/:id', auth, function (req, res, next) {
    const { id } = req.params

    Playlist
        .findOne({
            where: {
                id,
                userId: req.user.dataValues.id
            }
        })
        .then(playlist => res.status(200).send(playlist))
        .catch(err => {
            res.status(404).json({
                message: `Not found`,
                error: err
            })
            next(err)
        })
})

router.delete('/playlists/:id', auth, function (req, res, next) {
    const { id } = req.params
    Playlist
        .findByPk(id)
        .then(playlist => playlist.destroy())
        .then(playlist => res.status(200).send('Deleted successfully'))
        .catch(err => next(err))
})

module.exports = router
