const db = require('../db/queries');


async function getMainPage(req, res) {

    const { title, category, publisher } = req.query

    const games = await db.getAllGames(title, publisher, category,);

    if (!games) {
        throw new Error('Failed to fetch games from database.')
    }

    const publishers = await db.getAllPublishers();

    if (!publishers) {
        throw new Error('Failed to fetch publishers from database.')
    }

    const categories = await db.getAllCategories();
    if (!categories) {
        throw new Error('Failed to fetch categories from database.')
    }
    res.render('mainPage', { games: games, publishers, categories })
}

module.exports = {
    getMainPage,
}