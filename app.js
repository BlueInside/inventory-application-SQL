const express = require('express');
require('dotenv').config();

const mainPageController = require('./controllers/main');
const gameController = require('./controllers/game')
const app = express();
const port = process.env.PORT

const gameRouter = require('./routes/game');

app.use(express.urlencoded());

app.get('/', mainPageController.getMainPage);

app.use('/game', gameRouter);




app.listen(port, () => {
    console.log('Inventory app listening on port: ' + port)
})