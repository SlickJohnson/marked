const express = require('express');

const TurndownService = require('turndown');

const turndown = new TurndownService();

const app = express();

const port = 3000;

app.listen(port, () => console.log(`Listening to port ${port}!`));

app.get('/', (req, res) => {
  console.log(turndown.turndown('<h1>Hellow!</h1>'));
});
