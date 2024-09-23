const express = require('express');
const gameController = require('../controllers/game')
const gameRouter = express.Router();
const { gameValidations, validate } = require('../validation/updateGame')
const asyncHandler = require('express-async-handler');
const { addGameValidations, validateAddGame } = require('../validation/addGame')

gameRouter.post('/', addGameValidations, asyncHandler(validateAddGame), asyncHandler(gameController.addGame));

gameRouter.delete('/', asyncHandler(gameController.deleteGame));

gameRouter.put('/:gameId', gameValidations(), validate, asyncHandler(gameController.updateGame))

gameRouter.get('/new', asyncHandler(gameController.addGameForm))

gameRouter.get('/:gameId', asyncHandler(gameController.getGameDetails));

gameRouter.get('/:gameId/edit', asyncHandler(gameController.editGameDetails))

module.exports = gameRouter