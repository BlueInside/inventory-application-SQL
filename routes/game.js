const express = require('express');
const gameController = require('../controllers/game')
const gameRouter = express.Router();

gameRouter.get('/:gameId', gameController.getGameDetails);

gameRouter.post('/', gameController.addGame);

gameRouter.put('/:gameId', gameController.updateGame)

gameRouter.delete('/:gameId', gameController.deleteGame);

gameRouter.get('/:gameId/edit', gameController.editGameDetails)

module.exports = gameRouter