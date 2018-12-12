const TurndownService = require('turndown');
const turndown = new TurndownService();

const Page = require('../models/page');

module.exports = app => {
  app.get('/pages', (req, res) => {
    res.json(turndown.turndown('<h1>Hellow!</h1>'));
  });

  // INDEX
  app.get('/', (req, res) => {
    console.log(req.cookies);
    res.render('brochure');
  });

  // CREATE
  app.post('/pages', (req, res) => {
    const page = new Page(req.body);
    Page.save((err, page) => res.redirect(`/`));
  });

  // NEW
  app.get('/pages/new', (req, res) => {
    res.render('pages-new', {});
  });

  // SHOW
  app.get('/pages/:id', (req, res) => {
    Page.findById(req.params.id)
      .then(page => res.render('pages-show', { page }))
      .catch(err => console.log(err.message));
  });

  // TAG
  app.get('/t/:tag', (req, res) => {
    Page.find({
      tag: req.params.tag,
    })
      .then(pages => {
        res.render('pages-index', { pages });
      })
      .catch(err => {
        console.log(err);
      });
  });
};
