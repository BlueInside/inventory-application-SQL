const db = require('../db/queries');

async function getGameDetails(req, res) {
    const { gameId } = req.params;

    if (!gameId) {
        throw new Error('Received wrong data, failed to get game details.')
    }

    const game = await db.getGame(gameId);

    if (!game || !game?.id) {
        throw new Error('Failed to fetch game details from database.')
    }

    res.render(`gameDetails`, { game: game })
};

async function addGameForm(req, res) {
    const publishers = await db.getAllPublishers();

    if (!publishers) {
        throw new Error('Failed to fetch publisher details from database.')
    }

    res.render(`addGameForm`, { publishers });
};

async function updateGame(req, res) {
    const { gameId } = req.params;

    res.send(`Game: ${gameId} has been updated`)
};

async function deleteGame(req, res) {
    const { gameId } = req.params;

    if (!gameId) {
        throw new Error('Received wrong game details, failed to delete game from database.')
    }
    res.send(`Game: ${gameId} has been deleted`)
};

async function editGameDetails(req, res) {
    const { gameId } = req.params;

    if (!gameId) {
        throw new Error('Received wrong game details, Failed to edit game.')
    }

    const game = await db.getGame(gameId);

    if (!game) {
        throw new Error('Failed to fetch game from database.')
    }

    const publishers = await db.getAllPublishers();

    if (!publishers) {
        throw new Error('Failed to fetch publishers from database.')
    }

    res.render('updateGameForm', { game: game, publishers })
}

module.exports = {
    getGameDetails,
    deleteGame,
    updateGame,
    editGameDetails,
    addGameForm
}