const pool = require('./pool');

async function getAllGames(title, publisher, category) {
    let query = `
SELECT DISTINCT games.*, publishers.name AS publisher_name
        FROM games
        JOIN publishers ON games.publisher_id = publishers.id
        LEFT JOIN game_categories ON games.id = game_categories.game_id
        LEFT JOIN categories ON game_categories.category_id = categories.id
`;

    let conditions = [];
    let values = [];
    let index = 1;

    if (title) {
        conditions.push(`title ILIKE $${index}`)
        values.push(`%${title}%`)
        index++;
    }

    if (publisher) {
        conditions.push(`publisher_id = $${index}`);
        values.push(publisher);
        index++
    }

    if (category) {
        conditions.push(`category_id = $${index}`);
        values.push(category)
        index++
    }

    if (conditions.length > 0) {
        query += ` WHERE ` + conditions.join(` AND `)
    }

    query += ' ORDER BY games.title ASC';

    console.log(query)
    const { rows } = await pool.query(query, values);
    return rows;
}

async function getGame(id) {
    const { rows: gameRows } = await pool.query(`
       SELECT 
       games.id,
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

async function getAllPublishers() {
    const { rows: publishers } = await pool.query(`
        SELECT id, name FROM publishers;
        `)

    return publishers;
}

async function getAllCategories() {
    const { rows: categories } = await pool.query(`
        SELECT id, genre FROM categories
        `)

    return categories;
}

module.exports = {
    getAllGames,
    getGame,
    getAllPublishers,
    getAllCategories
}