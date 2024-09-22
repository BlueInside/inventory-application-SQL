const db = require('../db/queries');

async function addPublisher(req, res, next) {
    const name = req.body.newPublisher;
    const gameId = req.body.gameId;

    if (!name || !gameId) {
        throw new Error('Failed to create publisher')
    }

    // CALL TO DB to create publisher
    await db.createPublisher(name)
    // redirect to the edit 
    res.redirect(`/game/${gameId}/edit`)
}

async function getAllPublishers(req, res, next) {
    const publishers = await db.getAllPublishers();

    res.render('displayPublishers', { publishers })
}

async function deletePublisher(req, res, next) {
    const publisherId = req.body.publisherId;

    await db.deletePublisher(publisherId);

    const publishers = await db.getAllPublishers();

    res.render('displayPublishers', { publishers })
}

async function changePublisherName(req, res, next) {
    const publisherId = req.body.publisherId;
    const name = req.body.publisherName
    await db.updatePublisher(publisherId, name);

    res.redirect('/publisher')
}
module.exports = {
    addPublisher,
    getAllPublishers,
    deletePublisher,
    changePublisherName,


}