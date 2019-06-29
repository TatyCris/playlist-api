const Sequelize = require('sequelize')
const databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:secret@localhost:5432/spotify_db'
const sequelize = new Sequelize(databaseUrl, { define: { timestamps: false } })

sequelize
    // .sync()
    .sync({ force: true })
    .then(() => console.log('Database schema updated'))
    .catch(console.error)

module.exports = sequelize