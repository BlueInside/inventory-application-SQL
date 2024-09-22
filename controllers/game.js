const db = require('../db/queries');

async function getGameDetails(req, res) {
    const { gameId } = req.params;
    const game = await db.getGame(gameId);
    res.render(`gameDetails`, { game: game })
};

async function addGameForm(req, res) {
    const publishers = await db.getAllPublishers();
    res.render(`addGameForm`, { publishers });
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
    deleteGame,
    updateGame,
    editGameDetails,
    addGameForm
}