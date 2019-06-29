const Sequelize = require('sequelize')
const db = require('../db')

const Playlist = db.define('playlist',
    {
        name: {
            type: Sequelize.STRING,
            field: 'name'
        }
    },
    { tableName: 'playlists' }
)

module.exports = Playlist