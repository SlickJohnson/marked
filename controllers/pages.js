const Page = require('../models/page');

const TurndownService = require('turndown');
const turndown = new TurndownService();

require('es6-promise').polyfill();

require('isomorphic-fetch');

const DOMParser = require('dom-parser');

const parser = new DOMParser();

module.exports = app => {
  // TURNDOWN
  app.post('/pages/down', (req, res) => {
    const { link } = req.body;
    console.log(link);
  });

  // INDEX
  app.get('/', (req, res) => {
    console.log(req.cookies);
    res.render('brochure');
  });

  // CREATE
  app.post('/pages', (req, res) => {
    const { link } = req.body;
    const page = new Page({ link });

    page.save((err, page) => res.json(page));
  });

  // NEW
  app.get('/pages/new', (req, res) => {
    res.render('pages-new', {});
  });

  // SHOW
  app.get('/pages/:id', (req, res) => {
    Page.findById(req.params.id)
      .then(page => {
        fetch(page.link)
          .then(data => {
            return data.text();
          })
          .then(html => {
            const doc = parser.parseFromString(html, 'text/html');
            const title = doc.getElementsByTagName('title')[0].innerHTML;
            console.log(title);
            const markdown = turndown.turndown(html);
            res.json({ title, markdown });
          });
      })
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
