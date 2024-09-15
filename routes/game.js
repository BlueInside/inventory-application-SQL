const express = require('express');
const gameController = require('../controllers/game')
const gameRouter = express.Router();

gameRouter.get('/game/:gameId', gameController.getGameDetails);

gameRouter.post('/game', gameController.addGame);

gameRouter.delete('/game/:gameId', gameController.deleteGame);

module.exports = gameRouter