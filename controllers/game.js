const db = require('../db/queries');

async function getGameDetails(req, res) {
    const { gameId } = req.params;
    const game = await db.getGame(gameId);
    res.render(`gameDetails`, { game: game })
};

async function addGame(req, res) {
    const { gameId } = req.params;
    res.send(`Game: ${gameId} page`)
};

async function updateGame(req, res) {
    const { gameId } = req.params;

    res.send(`Game: ${gameId} has been updated`)
};

async function deleteGame(req, res) {
    const { gameId } = req.params;
    res.send(`Game: ${gameId} has been deleted`)
};

async function editGameDetails(req, res) {
    const { gameId } = req.params;
    const game = await db.getGame(gameId);
    const publishers = await db.getAllPublishers()
    res.render('updateGameForm', { game: game, publishers })
}

module.exports = {
    getGameDetails,
    addGame,
    deleteGame,
    updateGame,
    editGameDetails,
}