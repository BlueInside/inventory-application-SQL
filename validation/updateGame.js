const { body, validationResult } = require('express-validator');
const db = require('../db/queries');
require('dotenv').config();

const gameValidations = () => [
    body('password')
        .notEmpty()
        .withMessage('Password cannot be empty.')
        .custom(value => {
            const isInvalidPassword = process.env.FORMPASSWORD !== value;
            if (isInvalidPassword) {
                throw new Error('Wrong admin password.')
            } else {
                return true;
            }
        }),
    body('title')
        .notEmpty().withMessage('Title field cannot be empty.')
        .isLength({ min: 3, max: 30 }).withMessage('Title field must be between 3-30 characters long.')
    ,
    body('description')
        .notEmpty().withMessage('Description field cannot be empty.')
        .isLength({ min: 1, max: 255 }).withMessage('Description must be between 1-255 characters long.')
    ,
    body('image')
        .optional({ checkFalsy: true })
        .notEmpty().withMessage('Image field cannot be empty.')
        .withMessage('Image must be valid URL')
    ,
    body('publisherId')
        .trim().notEmpty().withMessage('publisher field cannot be empty.')
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