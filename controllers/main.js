const db = require('../db/queries');

async function getMainPage(req, res) {
    const games = await db.getAllGames();
    res.render('mainPage', { games: games })
}

module.exports = {
    getMainPage,
}