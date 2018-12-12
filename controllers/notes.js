const Note = require('../models/note');

module.exports = app => {
  app.post('/pages/:pageId/notes', (req, res) => {
    const note = new Note(req.body);

    note
      .save()
      .then(note => {
        return Page.findById(req.params.pageId);
      })
      .then(page => {
        page.notes.unshift(page);
        return page.save();
      })
      .then(page => {
        res.redirect(`/`);
      })
      .catch(err => {
        console.log(err);
      });
  });
};
