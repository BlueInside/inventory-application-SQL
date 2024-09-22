const { body, validationResult } = require('express-validator');
const db = require('../db/queries');

const publisherValidation = () => [
    body('newPublisher')
        .notEmpty().withMessage('Publisher name cannot be empty.')
        .isLength({ min: 1, max: 30 }).withMessage('Publisher name must be between 3-30 characters long.')
]

async function validateAndRenderUpdateForm(req, res, next) {
    const result = validationResult(req)
    const { gameId } = req.body;
    const game = await db.getGame(gameId);
    const publishers = await db.getAllPublishers();
    const categories = await db.getAllCategories();


    if (!result.isEmpty()) {
        res.render('updateGameForm', { game, publishers, categories, errors: result.array() })
    } else {
        next();
    }
}

module.exports = {
    publisherValidation,
    validateAndRenderUpdateForm
}