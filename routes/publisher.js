const express = require('express');
const asyncHandler = require('express-async-handler');
const publisherRouter = express.Router();
const publisherController = require('../controllers/publisher')
const { publisherValidation, validateAndRenderUpdateForm, validateAndRenderPublishers } = require('../validation/addPublisher')

publisherRouter.get('/', asyncHandler(publisherController.getAllPublishers));

publisherRouter.put('/', publisherValidation(), validateAndRenderPublishers, asyncHandler(publisherController.changePublisherName))

publisherRouter.post('/', publisherValidation(), validateAndRenderPublishers, asyncHandler(publisherController.addPublisher));
publisherRouter.delete('/', asyncHandler(publisherController.deletePublisher))
module.exports = publisherRouter