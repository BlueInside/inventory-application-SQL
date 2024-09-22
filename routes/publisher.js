const express = require('express');
const publisherRouter = express.Router();
const publisherController = require('../controllers/publisher')
const { publisherValidation, validateAndRenderUpdateForm } = require('../validation/addPublisher')

publisherRouter.get('/', publisherController.getAllPublishers);
publisherRouter.post('/', publisherValidation(), validateAndRenderUpdateForm, publisherController.addPublisher);

module.exports = publisherRouter