const { body, validationResult } = require('express-validator');
const db = require('../db/queries');
require('dotenv').config();

const addGameValidations = [
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
        .trim()
        .notEmpty()
        .withMessage('Title cannot be empty.')
        .isLength({ min: 1, max: 30 })
        .withMessage('Title must be between 3-30 characters long.')
        .escape(),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Description cannot be empty')
        .isLength({ min: 1 })
        .withMessage('Description must be at least 1 characters long.')
        .escape(),
    body('image')
        .optional({ checkFalsy: true })
        .trim()
        .notEmpty()
        .withMessage(`Image url cannot be empty.`)
        .escape(),
    body('rate')
        .trim()
        .notEmpty()
        .withMessage('Rate must be between 1-10')
        .isNumeric()
        .withMessage('Rate must be a number from 1-10.')
        .escape(),
    body('publisherId')
        .trim()
        .notEmpty()
        .withMessage('Publisher cannot be empty')
]

const validateAddGame = async (req, res, next) => {
    const result = validationResult(req)
    console.log(req.body)
    const publishers = await db.getAllPublishers();

    if (!result.isEmpty()) {
        res.render('addGameForm', { publishers, errors: result.array() })
    } else {
        next();
    }
}

module.exports = {
    addGameValidations,
    validateAddGame
}