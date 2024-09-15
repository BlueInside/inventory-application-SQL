#! /usr/bin/env node

require('dotenv').config();

const { Client } = require('pg');

const SQL = `
CREATE TABLE IF NOT EXISTS publishers (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS categories (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS games (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 30 ),
    description TEXT, 
    image VARCHAR(255),
    rate INTEGER, 
    publisher_id INTEGER REFERENCES publishers(id)
);

CREATE TABLE IF NOT EXISTS comments (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
username VARCHAR(30),
text TEXT,
game_id INTEGER REFERENCES games(id)
);

CREATE TABLE IF NOT EXISTS game_categories(
game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
);

INSERT INTO publishers (name) 
VALUES 
    ('Ubisoft'), 
    ('Bethesda'), 
    ('Valve'), 
    ('CD Projekt Red'), 
    ('Activision'), 
    ('Blizzard'),
    ('Lionhead Studio');

    INSERT INTO categories (name) 
VALUES 
    ('RPG'), 
    ('Shooter'), 
    ('Multiplayer'), 
    ('MMORPG'), 
    ('Action');

    INSERT INTO games (name, description, image, rate, publisher_id)
VALUES 
    ('The Witcher 3: Wild Hunt', 'An open-world RPG set in a fantasy universe', 'https://image.api.playstation.com/vulcan/ap/rnd/202211/0711/kh4MUIuMmHlktOHar3lVl6rY.png', 10, 4),  -- CD Projekt Red, RPG
    ('The Last of Us', 'A post-apocalyptic action-adventure game', 'https://static.posters.cz/image/750/posters/the-last-of-us-key-art-i127761.jpg', 9, 2),  -- Bethesda, Action
    ('Red Dead Redemption', 'An open-world western action-adventure game', 'https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg', 9, 5),  -- Activision, Action
    ('GTA V', 'An open-world action-adventure game with multiple protagonists', 'https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png', 8, 1),  -- Ubisoft, Action
    ('Fable', 'A story-driven RPG with player choice', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FFable_%25282004_video_game%2529&psig=AOvVaw0Lb4CqUY9pONoK9c16JHDy&ust=1726480831377000&source=images&cd=vfe&opi=89978449&ved=2ahUKEwi5nsy22MSIAxVyTEEAHWRKAgYQjRx6BAgAEBg', 8, 2),  -- Bethesda, RPG
    ('Counter-Strike 2', 'A tactical shooter and multiplayer game', 'https://static.wikia.nocookie.net/cswikia/images/3/37/Cs2_boxart.jpg/revision/latest?cb=20230930151452', 9, 6);  -- Valve

INSERT INTO game_categories (game_id, category_id)
VALUES 
    (1, 1), -- The Witcher 3: RPG
    (1, 5), -- The Witcher 3: RPG
    (2, 5), -- The Last of Us: Action
    (2, 2), -- The Last of Us: SHOOTER
    (3, 5), -- Red Dead Redemption: Action
    (3, 4), -- Red Dead Redemption: MMORPG
    (4, 5), -- GTA V: Action
    (4, 4), -- GTA V: MMORPG
    (5, 1), -- Fable: RPG
    (5, 5), -- Fable: Action
    (6, 2), -- Counter-Strike 2: Shooter
    (6, 3); -- Counter-Strike 2: Multiplayer
    `

async function main() {
    console.log('seeding...');
    const client = new Client({
        connectionString: process.env.PGCSTRING
    })

    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('done');
}

main();