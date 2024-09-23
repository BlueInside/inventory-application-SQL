#! /usr/bin / env node

require('dotenv').config();

const { Client } = require('pg');

const SQL = `
CREATE TABLE IF NOT EXISTS publishers (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    genre VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS games (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(30),
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

-- Insert publishers
INSERT INTO publishers (name) 
VALUES 
    ('Ubisoft'), 
    ('Bethesda'), 
    ('Valve'), 
    ('CD Projekt Red'), 
    ('Activision'), 
    ('Blizzard'),
    ('Lionhead Studio'),
    ('Rockstar Games'),
    ('Sony Computer Entertainment'),
    ('Electronic Arts'),
    ('Mojang Studios'),
    ('Epic Games'),
    ('InnerSloth');

-- Insert categories
INSERT INTO categories (genre) 
VALUES 
    ('RPG'), 
    ('Shooter'), 
    ('Multiplayer'), 
    ('MMORPG'), 
    ('Action'),
    ('Puzzle'),
    ('Strategy'),
    ('Battle Royale'),
    ('Social Deduction');

-- Insert games
INSERT INTO games (title, description, image, rate, publisher_id)
VALUES 
    ('The Witcher 3: Wild Hunt', 'An open-world RPG set in a fantasy universe', 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Witcher_3_cover_art.jpg/220px-Witcher_3_cover_art.jpg', 10, 4),
    ('The Last of Us', 'A post-apocalyptic action-adventure game', 'https://upload.wikimedia.org/wikipedia/en/4/46/Video_Game_Cover_-_The_Last_of_Us.jpg', 9, 9),
    ('Red Dead Redemption', 'An open-world western action-adventure game', 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Red_Dead_Redemption.jpg/220px-Red_Dead_Redemption.jpg', 9, 8),
    ('GTA V', 'An open-world action-adventure game with multiple protagonists', 'https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png', 8, 8),
    ('Fable', 'A story-driven RPG with player choice', 'https://upload.wikimedia.org/wikipedia/en/5/5b/Fablebox.jpg', 8, 7),
    ('Counter-Strike 2', 'A tactical shooter and multiplayer game', 'https://upload.wikimedia.org/wikipedia/en/f/f2/CS2_Cover_Art.jpg', 9, 3),
    ('Overwatch', 'A team-based multiplayer shooter', 'https://upload.wikimedia.org/wikipedia/en/thumb/5/51/Overwatch_cover_art.jpg/220px-Overwatch_cover_art.jpg', 8, 6),
    ('Assassin Creed', 'An action-adventure stealth game', 'https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Assassin%27s_Creed.jpg/220px-Assassin%27s_Creed.jpg', 8, 1),
    ('Doom', 'A fast-paced first-person shooter', 'https://upload.wikimedia.org/wikipedia/en/5/57/Doom_cover_art.jpg', 9, 2),
    ('Half-Life', 'A sci-fi first-person shooter', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Orange_lambda.svg/1024px-Orange_lambda.svg.png', 9, 3),
    ('Call of Duty: Modern Warfare', 'A first-person shooter game', 'https://upload.wikimedia.org/wikipedia/en/1/1f/Call_of_Duty_Modern_Warfare_%282019%29_cover.jpg', 8, 5),
    ('World of Warcraft', 'A massively multiplayer online role-playing game', 'https://upload.wikimedia.org/wikipedia/en/6/65/World_of_Warcraft.png', 9, 6),
    ('Elder Scrolls V: Skyrim', 'An open-world action RPG', 'https://upload.wikimedia.org/wikipedia/en/1/15/The_Elder_Scrolls_V_Skyrim_cover.png', 10, 2),
    ('Portal 2', 'A puzzle-platform game', 'https://upload.wikimedia.org/wikipedia/en/f/f9/Portal2cover.jpg', 9, 3),
    ('Mass Effect 2', 'A sci-fi action RPG', 'https://upload.wikimedia.org/wikipedia/en/9/97/Mass_Effect_Legendary_Edition.jpeg', 9, 10),
    ('Starcraft II', 'A military science fiction real-time strategy game', 'https://upload.wikimedia.org/wikipedia/en/thumb/9/93/StarCraft_box_art.jpg/220px-StarCraft_box_art.jpg', 9, 6),
    ('Diablo III', 'An action role-playing game', 'https://upload.wikimedia.org/wikipedia/en/9/93/StarCraft_box_art.jpg', 8, 6),
    ('Minecraft', 'A sandbox video game', 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c9/Minecraft_Mobs.png/220px-Minecraft_Mobs.png', 9, 11),
    ('Fortnite', 'A battle royale game', 'https://upload.wikimedia.org/wikipedia/en/a/ae/Fortnite_Save_The_World.jpg', 8, 12),
    ('Among Us', 'An online multiplayer social deduction game', 'https://upload.wikimedia.org/wikipedia/en/9/9a/Among_Us_cover_art.jpg', 7, 13);

-- Insert game categories
INSERT INTO game_categories (game_id, category_id)
VALUES 
    (1, 1), -- The Witcher 3: RPG
    (1, 5), -- The Witcher 3: Action
    (2, 5), -- The Last of Us: Action
    (2, 2), -- The Last of Us: Shooter
    (3, 5), -- Red Dead Redemption: Action
    (3, 4), -- Red Dead Redemption: MMORPG
    (4, 5), -- GTA V: Action
    (4, 4), -- GTA V: MMORPG
    (5, 1), -- Fable: RPG
    (5, 5), -- Fable: Action
    (6, 2), -- Counter-Strike 2: Shooter
    (6, 3), -- Counter-Strike 2: Multiplayer
    (7, 2), -- Overwatch: Shooter
    (7, 3), -- Overwatch: Multiplayer
    (8, 5), -- Assassin's Creed: Action
    (9, 2), -- Doom: Shooter
    (10, 2), -- Half-Life: Shooter
    (10, 5), -- Half-Life: Action
    (11, 2), -- Call of Duty: Shooter
    (11, 5), -- Call of Duty: Action
    (11, 3), -- Call of Duty: Multiplayer
    (12, 1), -- World of Warcraft: RPG
    (12, 4), -- World of Warcraft: MMORPG
    (13, 1), -- Skyrim: RPG
    (13, 5), -- Skyrim: Action
    (14, 5), -- Portal 2: Action
    (14, 6), -- Portal 2: Puzzle
    (15, 1), -- Mass Effect 2: RPG
    (15, 2), -- Mass Effect 2: Shooter
    (15, 5), -- Mass Effect 2: Action
    (16, 7), -- Starcraft II: Strategy
    (16, 3), -- Starcraft II: Multiplayer
    (17, 1), -- Diablo III: RPG
    (17, 5), -- Diablo III: Action
    (18, 5), -- Minecraft: Action
    (18, 3), -- Minecraft: Multiplayer
    (19, 8), -- Fortnite: Battle Royale
    (19, 3), -- Fortnite: Multiplayer
    (20, 9), -- Among Us: Social Deduction
    (20, 3); -- Among Us: Multiplayer
`;

async function main() {
    console.log('Seeding database...');
    const client = new Client({
        connectionString: process.env.DATABASE_URL
    });

    try {
        await client.connect();
        await client.query(SQL);
        console.log('Database seeding completed successfully.');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await client.end();
    }
}

main();
