const pool = require('./pool');

async function getAllGames() {
    const { rows } = await pool.query('SELECT * FROM games');
    return rows;
}

async function getGame(id) {
    const { rows: gameRows } = await pool.query(`
       SELECT 
       games.title AS game_title,
       publishers.name AS publisher_name,
       games.description,    
       games.image,
       games.rate   
       FROM games
        LEFT JOIN publishers ON games.publisher_id = publishers.id
        WHERE games.id = $1;
     `, [id]);

    const { rows: commentRows } = await pool.query(`
            SELECT * FROM comments
            WHERE comments.game_id = $1
        `, [id])
    return { ...gameRows[0], comments: commentRows }
}

module.exports = {
    getAllGames,
    getGame
}