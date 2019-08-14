const { Router } = require('express')
const bcrypt = require('bcrypt');
const User = require('./model')

const router = new Router

router.post('/users', function (req, res, next) {
    const email = req.body.email
    const password = req.body.password
    const password_confirmation = req.body.password_confirmation

    if (!email || !password) {
        res.status(401).send({
            message: 'Please supply a valid email and password'
        })
    } else if (!password_confirmation) {
        res.status(401).send({
            message: 'Please confirm your password'
        })
    } else {
        User
            .findOne({
                where: {
                    email: email
                }
            })
            .then(entity => {
                if (entity) {
                    res.status(401).send({
                        message: 'User with that email already exist'
                    })
                }
                const user = {
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10)
                }

                User
                    .create(user)
                    .then(user => res.status(201).json(user))
                    .catch(err => {
                        res.status(422).json({
                            message: `Resource can't be saved or updated`,
                            error: err
                        })
                        next(err)
                    })            })
            .catch(err => {
                console.error(err)
                res.status(401).send({
                    message: 'Not authorized, not authenticated'
                })
            })
    }
})

module.exports = router