const mongoose = require('mongoose');

const { Schema } = mongoose;

const PageSchema = new Schema({
  createdAt: { type: Date },
  updatedAt: { type: Date },
  title: { type: String },
  link: { type: String, required: true },
  markdown: { type: String },
  tag: [{ type: String }],
  notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
});

PageSchema.pre('save', function(next) {
  const now = new Date();
  this.updatedAt = now;

  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model('Page', PageSchema);
