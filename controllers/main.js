const db = require('../db/queries');

async function getMainPage(req, res) {
    const { title, category, publisher } = req.query
    const games = await db.getAllGames(title, publisher, category,);
    const publishers = await db.getAllPublishers();
    const categories = await db.getAllCategories();

    res.render('mainPage', { games: games, publishers, categories })
}

module.exports = {
    getMainPage,
}