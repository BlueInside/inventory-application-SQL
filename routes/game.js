const express = require('express');
const gameController = require('../controllers/game')
const gameRouter = express.Router();
const { gameValidations, validate } = require('../validation/updateGame')



// gameRouter.post('/', gameController.addGame);

gameRouter.put('/:gameId', gameValidations(), validate, gameController.updateGame)

gameRouter.delete('/:gameId', gameController.deleteGame);

gameRouter.get('/new', gameController.addGameForm)

gameRouter.get('/:gameId', gameController.getGameDetails);

gameRouter.get('/:gameId/edit', gameController.editGameDetails)

module.exports = gameRouter