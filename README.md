# Inventory Application - SQL Practice with Node.js and Express

Welcome to the Inventory Application! This project is a practice exercise focused on working with SQL databases using the `pg` module in Node.js and refreshing foundational concepts of Express.js.

This application allows users to browse, add, update, and delete games, publishers, and categories in a game inventory. It serves as a hands-on approach to understanding how to integrate PostgreSQL with a Node.js application using Express as the web framework.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Usage](#usage)
- [Acknowledgments](#acknowledgments)
- [License](#license)
- [Contact](#contact)

## Features
- **Game Inventory Management**: Browse a collection of games with details like title, description, rating, and publisher.
- **CRUD Operations**:
  - **Create**: Add new games, publishers, and categories.
  - **Read**: View details of games, publishers, and categories.
  - **Update**: Edit existing games and publishers.
  - **Delete**: Remove games and publishers (with checks for associated records).
- **Search Functionality**: Search for games by title, publisher, or category.
- **Responsive Design**: Styled using Bootstrap for a modern and responsive user interface.
- **Error Handling**: Graceful error handling with user-friendly messages.
- **Database Integration**: Uses PostgreSQL for data storage with proper relational schema design.

## Prerequisites
Before you begin, ensure you have met the following requirements:
- **Node.js**: Version 14.x or later installed on your machine.
- **npm**: Comes bundled with Node.js.
- **PostgreSQL**: Version 12.x or later installed and running.
- **Git**: For cloning the repository.

## Installation
### Clone the Repository
```bash
git clone https://github.com/yourusername/inventory-application.git
cd inventory-application
```
### Instal dependencies
```bash
npm install
```
### Set up environment variables
```env
PGCSTRING=postgres://username:password@localhost:5432/your_database_name
PORT=port
PGHOST=postgresHost
PGPORT=postgresport
PGUSER=postgresUser
PGPASSWORD=postgres password
PGDATABASE=postgres database name
DATABASE_URL=connectionString
FORMPASSWORD= password that will be used as admin password to edit remove games
```
## Database setup

### Create the database
Log into PostgreSQL and create new database:
```sql
CREATE DATABASE your_database_name;
```
The project includes a populatedb.js script that sets up the database schema and seeds it with initial data.

```bash
node populatedb.js
```
This script will create the necessary tables and insert sample data for publishers, categories, games, and game categories.

## Running the Application
### Start the Express server:

```bash
npm start
The application will be running at http://localhost:3000.
```

## Project Structure
```css
inventory-application/
├── db/
│   ├── queries.js
│   ├── pool.js
│   └── populatedb.js
├── controllers/
│   ├── game.js
│   └── publisher.js
├── routes/
│   ├── game.js
│   ├── publisher.js
│   └── index.js
├── views/
│   ├── layout.pug
│   ├── header.pug
│   ├── footer.pug
│   ├── addGameForm.pug
│   ├── updateGameForm.pug
│   ├── displayPublishers.pug
│   ├── gameDetails.pug
│   ├── searchForm.pug
│   └── errorPage.pug
├── public/
│   └── css/
│       └── styles.css
├── app.js
├── package.json
├── .env
└── README.md
```

db/: Database connection and query files.
controllers/: Route handler functions for games and publishers.
routes/: Express route definitions.
views/: Pug templates for rendering HTML.
public/: Static assets like CSS files.
app.js: The main application file.
Technologies Used
Node.js: JavaScript runtime environment.
Express.js: Web framework for Node.js.
PostgreSQL: Relational database management system.
pg (node-postgres): PostgreSQL client for Node.js.
Pug: Template engine for generating HTML.
Bootstrap: CSS framework for responsive design.
dotenv: Loads environment variables from a .env file.
Express Validator: Middleware for validating and sanitizing user input.

## Usage
### Browsing Games
Home Page: Navigate to the home page to see a list of games.
Search: Use the search form to filter games by title, publisher, or category.
Game Details: Click on a game card to view its details.
Managing Games
Add New Game: Click on the "Add new game" button and fill out the form.
Edit Game: From a game's detail page, click on the "Edit" button to modify its details.
Delete Game: From the edit page, use the "Remove game" button to delete the game.
Managing Publishers
View Publishers: Click on "Edit publishers" to see a list of all publishers.
Add Publisher: Use the form at the bottom of the publishers list to add a new publisher.
Edit Publisher: Modify a publisher's name directly in the list and click "Change".
Delete Publisher: Click "Remove" to delete a publisher (if no games are associated).
##Acknowledgments
This project was developed as a practice exercise to enhance understanding of SQL databases integration with Node.js and Express.js. It draws inspiration from various tutorials and documentation:

[Node.js Official Documentation]('https://nodejs.org/en')
[Express.js Official Documentation]('https://expressjs.com/')
[PostgreSQL Official Documentation]('https://www.postgresql.org/')
[node-postgres Documentation]('https://node-postgres.com/')
[Bootstrap Documentation]('https://getbootstrap.com/')
[Pug Documentation]('https://pugjs.org/api/getting-started.html')

## License
This project is open-source and available under the [MIT]('https://opensource.org/license/mit') License.

## Contact
For any inquiries or feedback, please contact:

Author: Karol Puławski
Email: kpulawski13@gmail.com
GitHub: Blueinside

