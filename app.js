const express = require('express');
const methodOverride = require('method-override');
const path = require('node:path');
const asyncHandler = require('express-async-handler');
require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const mainPageController = require('./controllers/main');
const gameController = require('./controllers/game')
const port = process.env.PORT

const gameRouter = require('./routes/game');
const publisherRouter = require('./routes/publisher');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.get('/', asyncHandler(mainPageController.getMainPage));


app.use('/publisher', publisherRouter)
app.use('/game', gameRouter);

app.use((error, req, res, next) => {
    console.error(error.stack);
    res.render('errorPage', { error })
})

app.listen(port, () => {
    console.log('Inventory app listening on port: ' + port)
})