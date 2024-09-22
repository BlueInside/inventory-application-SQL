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

module.exports = {
    addPublisher,
    getAllPublishers,


}