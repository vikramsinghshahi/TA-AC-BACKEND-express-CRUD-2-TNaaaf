// var mongoose = require('mongoose');

// var Schema = mongoose.Schema;

// var bookSchema = new Schema(
//   {
//     title: { type: String, required: true },
//     summary: { type: String, required: true },
//     pages: Number,
//     publication: String,
//     cover_image: String,
//     category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
//     author: { type: Schema.Types.ObjectId, ref: 'Author' },
//   },
//   { timestamps: true }
// );

// var Book = mongoose.model('Book', bookSchema);

// module.exports = Book;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bookSchema = new Schema({
  title: { type: String, required: true },
  summary: String,
  pages: Number,
  publication: Number,
  cover_image: String,
  category: { type: [Schema.Types.ObjectId], ref: 'Category', required: true },
  author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
});

module.exports = mongoose.model('Book', bookSchema);
