const { Router } = require('express')
const { toJWT } = require('./jwt')
const bcrypt = require('bcrypt');
const User = require('../user/model')
const auth = require('./middleware')

const router = new Router()

router.post('/tokens', function (req, res, next) {
    const email = req.body.email
    const password = req.body.password

    if (!email || !password) {
        res.status(401).send({
            message: 'Please supply a valid email and password'
        })
    } else {
        User
            .findOne({
                where: {
                    email: email
                }
            })
            .then(entity => {
                if (!entity) {
                    res.status(401).send({
                        message: 'User with that email does not exist'
                    })
                }
                if (bcrypt.compareSync(password, entity.password)) {
                    res.send({
                        token: toJWT({ userId: entity.id })
                    })
                } else {
                    res.status(401).send({
                        message: 'Password was incorrect'
                    })
                }
            })
            .catch(err => {
                res.status(401).send({
                    message: 'Not authorized, not authenticated'
                })
            })
    }
})

router.get('/authentication', auth, (req, res) => {
    res.send({
        message: `The user ${req.user.email} is authenticated`,
    })
})

module.exports = router