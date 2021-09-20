var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var bookSchema = new Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  pages: Number,
  publication: String,
});
