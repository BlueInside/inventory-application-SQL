const { body, validationResult } = require('express-validator');

const gameValidations = () => [
    body('title')
        .notEmpty().withMessage('Title field cannot be empty.')
        .isLength({ min: 3, max: 30 }).withMessage('Must be between 3-30 characters long.')
    ,
    body('description')
        .notEmpty().withMessage('Description field cannot be empty.')
        .isLength({ min: 1, max: 255 }).withMessage('Must be between 1-255 characters long.')
    ,
    body('image')
        .notEmpty().withMessage('Image field cannot be empty.')
        .isURL().withMessage('Image must be valid URL')
    ,
    body('publisher_id')
        .optional().notEmpty().withMessage('publisher cannot be empty.')
]

function validate(req, res, next) {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        res.render('updateGameForm', { errors: result.array() })
    } else {
        next();
    }
}

module.exports = {
    gameValidations,
    validate
}