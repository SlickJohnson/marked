const express = require('express');

const app = express();

const exphbs = require('express-handlebars');

const port = 3000;

const bodyParser = require('body-parser');

const expressValidator = require('express-validator');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.listen(port, () => console.log(`Listening to port ${port}!`));

require('./controllers/pages')(app);

require('./data/marked-db');
