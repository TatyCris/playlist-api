# Playlist-API
This is a Backend project where users can manage their own playlist
## Table of contents
- [Intro](#Intro)
- [Technologies used](#Technologies-used)
- [Setup](#Setup)
- [API](#API)

## Intro
This is a node.js server for the Playlist-API project - which was created for a week assignment during week 5 of the Codaisseur Academy.

The Backend is deployed to heroku [here](https://api-playlist-api.herokuapp.com)

## Technologies used
- PostgreSQL
- Express
- Sequelize

## Setup
Please note that in order to run the server locally you must also start a Postgres container using the following commands

```bash
$ docker run \
  --rm \
  -e POSTGRES_PASSWORD=secret \
  -p 5432:5432 \
  postgres
```
  
- git clone
```bash
$ git clone https://github.com/TatyCris/playlist-api.git
```

- npm install
```bash
$ npm install
```

- nodemon
```bash
$ nodemon .
```

## API

MODELS:

- Users -> registered users
- Plyalists -> playlists created by users
- Songs -> songs added by users

ENDPOINTS:

\<base url\> is either http://localhost:4000 for local development or https://api-playlist-api.herokuapp.com for the deployed backend.
</br>

Create an user:
- POST \<base url\>/users

Get a token:
- POST \<base url\>/tokens

Authenticate an user:
- GET \<base url\>/authentication

Get all playlists:
- GET \<base url\>/playlists

Create a playlist:
- POST \<base url\>/playlists

Get a playlist:
- GET \<base url\>/playlists/:id

Delete a playlist:
- PUT \<base url\>/playlists/:id

Get all songs:
- GET \<base url\>/playlists/:id/songs

Create a song:
- POST \<base url\>/playlists/:id/songs
