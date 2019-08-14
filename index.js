const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const playlistRouter = require('./playlist/router')
const songsRouter = require('./songs/router')
const authRouter = require('./auth/router')
const userRouter = require('./user/router')

app.listen(port, function () {
    console.log(`Web server listening on port :${port}`)
})

app.use(jsonParser)
app.use(playlistRouter)
app.use(songsRouter)
app.use(authRouter)
app.use(userRouter)