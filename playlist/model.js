const Sequelize = require('sequelize')
const db = require('../db')
const User = require('../user/model')

const Playlist = db.define('playlist',
    {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'name'
        }
    },
    { tableName: 'playlists' }
)

Playlist.belongsTo(User)
module.exports = Playlist