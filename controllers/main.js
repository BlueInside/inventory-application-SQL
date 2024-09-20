const db = require('../db/queries');

async function getMainPage(req, res) {
    const { title, category, publisher } = req.query
    const games = await db.getAllGames(title, publisher, category,);
    const publishers = await db.getAllPublishers();
    res.render('mainPage', { games: games, publishers })
}

module.exports = {
    getMainPage,
}