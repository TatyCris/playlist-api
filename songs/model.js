const Sequelize = require('sequelize')
const db = require('../db')
const Playlist = require('../playlist/model')

const Song = db.define('songs',
    {
        title: {
            type: Sequelize.STRING,
            field: 'title'
        },
        artist: {
            type: Sequelize.STRING,
            field: 'artist'
        },
        album: {
            type: Sequelize.STRING,
            field: 'album'
        }
    },
    { tableName: 'songs' }
)

Song.belongsTo(Playlist)
module.exports = Song
