const db = require('../db/queries');

async function addPublisher(req, res, next) {
    const name = req.body.publisherName;

    if (!name) {
        throw new Error('Failed to create publisher')
    }

    // CALL TO DB to create publisher
    await db.createPublisher(name)
    // redirect to the edit 
    res.redirect(`/publisher`)
}


async function getAllPublishers(req, res, next) {
    const publishers = await db.getAllPublishers();

    if (!publishers) {
        throw new Error('Failed to load publishers.')
    }
    res.render('displayPublishers', { publishers })
}

async function deletePublisher(req, res, next) {
    const publisherId = req.body.publisherId;
    let games = null;
    try {
        games = await db.deletePublisher(publisherId);

    } catch (error) {
        throw new Error('Failed to delete publisher.')
    }

    const publishers = await db.getAllPublishers();

    if (!publishers) {
        throw new Error('Failed to load publishers.')
    }

    res.render('displayPublishers', { publishers, games })
}

async function changePublisherName(req, res, next) {
    const publisherId = req.body.publisherId;
    const name = req.body.publisherName

    if (!name || !publisherId) {
        throw new Error('Received invalid data, publisher name change failed.')
    }
    try {
        await db.updatePublisher(publisherId, name);

    } catch (error) {
        throw new Error('Failed to change publisher name.')
    }

    res.redirect('/publisher')
}
module.exports = {
    addPublisher,
    getAllPublishers,
    deletePublisher,
    changePublisherName,


}