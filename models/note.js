const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
  content: { type: String, required: true },
});

module.exports = mongoose.model('Note', NoteSchema);
