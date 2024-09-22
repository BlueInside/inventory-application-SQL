const express = require('express');
const publisherRouter = express.Router();
const publisherController = require('../controllers/publisher')
const { publisherValidation, validateAndRenderUpdateForm, validateAndRenderPublishers } = require('../validation/addPublisher')

publisherRouter.get('/', publisherController.getAllPublishers);
publisherRouter.put('/', publisherValidation(), validateAndRenderPublishers, publisherController.changePublisherName)
publisherRouter.post('/', publisherValidation(), validateAndRenderUpdateForm, publisherController.addPublisher);
publisherRouter.delete('/', publisherController.deletePublisher)
module.exports = publisherRouter