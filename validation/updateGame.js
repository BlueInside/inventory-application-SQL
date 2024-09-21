const { body, validationResult } = require('express-validator');
const db = require('../db/queries');
const gameValidations = () => [
    body('title')
        .notEmpty().withMessage('Title field cannot be empty.')
        .isLength({ min: 3, max: 30 }).withMessage('Title field must be between 3-30 characters long.')
    ,
    body('description')
        .notEmpty().withMessage('Description field cannot be empty.')
        .isLength({ min: 1, max: 255 }).withMessage('Description must be between 1-255 characters long.')
    ,
    body('image')
        .notEmpty().withMessage('Image field cannot be empty.')
        .isURL().withMessage('Image must be valid URL')
    ,
    body('publisher_id')
        .optional().notEmpty().withMessage('publisher field cannot be empty.')
]

async function validate(req, res, next) {
    const result = validationResult(req)
    const { gameId } = req.params;
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
    gameValidations,
    validate
}