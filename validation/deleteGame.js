const { body, validationResult } = require('express-validator');
const db = require('../db/queries');
require('dotenv').config();

const deleteGameValidation = [
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
]

async function validateGameDeletion(req, res, next) {
    const result = validationResult(req)
    const { gameId } = req.body;
    const game = await db.getGame(gameId);
    const publishers = await db.getAllPublishers();
    const categories = await db.getAllCategories();

    if (!result.isEmpty()) {
        res.render(`updateGameForm`, { game, publishers, categories, errors: result.array() })
    } else {
        next();
    }
}

module.exports = {
    deleteGameValidation,
    validateGameDeletion
}