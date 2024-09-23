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

async function addGame(req, res) {
    let { title, description, image, rate, publisherId } = req.body;

    if (!image) image = `https://images.twinkl.co.uk/tw1n/image/private/t_630/u/ux/twinkl-video-games-2_ver_1.jpg`


    if (!title || !description || !image || !rate || !publisherId) {
        throw new Error('Received invalid data to create new game to the database.')
    }

    const newGame = await db.createGame(title, description, image, rate, publisherId);

    console.log(newGame);

    res.send('Game added successfully')
}

async function addGameForm(req, res) {
    const publishers = await db.getAllPublishers();
    const categories = await db.getAllCategories();

    if (!publishers) {
        throw new Error('Failed to fetch publisher details from database.')
    }

    res.render(`addGameForm`, { publishers, categories });
};

async function updateGame(req, res) {
    const { gameId } = req.params;

    if (!gameId) {
        throw new Error('Invalid game id parameter.')
    }

    const game = await db.getGame(gameId);

    if (!game || !game?.id) {
        throw new Error('Failed to fetch game details from database.')
    }

    let { title, description, image, rate, publisherId } = req.body;

    if (!image) image = `https://images.twinkl.co.uk/tw1n/image/private/t_630/u/ux/twinkl-video-games-2_ver_1.jpg`

    if (!title || !description || !rate || !publisherId) {
        throw new Error('Received invalid data, failed to update game in the database.')
    }

    await db.updateGame(title, description, image, rate, publisherId, gameId);

    res.redirect(`/game/${gameId}`);
};

async function deleteGame(req, res) {
    const { gameId } = req.body;

    if (!gameId) {
        throw new Error('Received wrong game details, failed to delete game from database.')
    }

    try {
        await db.deleteGame(gameId);

    } catch (error) {
        throw new Error('Failed to delete game from the database.')
    }

    res.redirect(`/`)
};

async function editGameDetails(req, res) {
    const { gameId } = req.params;

    if (!gameId) {
        throw new Error('Received wrong game details, Failed to edit game.')
    }

    const game = await db.getGame(gameId);

    if (!game) {
        throw new Error('Failed to fetch game from database.');
    }

    const publishers = await db.getAllPublishers();

    if (!publishers) {
        throw new Error('Failed to fetch publishers from database.');
    }

    const categories = await db.getAllCategories();

    if (!categories) {
        throw new Error('Failed to fetch categories from database.');
    }
    res.render('updateGameForm', { game, publishers, categories })
}

module.exports = {
    getGameDetails,
    deleteGame,
    updateGame,
    editGameDetails,
    addGameForm,
    addGame
}