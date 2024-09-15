const express = require('express');
const path = require('node:path');
require('dotenv').config();

const app = express();

const mainPageController = require('./controllers/main');
const gameController = require('./controllers/game')
const port = process.env.PORT

const gameRouter = require('./routes/game');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.urlencoded());

app.get('/', mainPageController.getMainPage);

app.use('/game', gameRouter);




app.listen(port, () => {
    console.log('Inventory app listening on port: ' + port)
})