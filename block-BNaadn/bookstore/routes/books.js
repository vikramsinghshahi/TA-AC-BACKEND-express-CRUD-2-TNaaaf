// var express = require('express');
// var router = express.Router();

// var Book = require('../models/book');

// /* GET home page. */
// router.get('/', (req, res, next) => {
//   Book.find({}, (err, books) => {
//     if (err) return next(err);
//     res.render('books.ejs', { books });
//   });
// });

// //getting the book form
// router.get('/new', (req, res, next) => {
//   res.render('bookForm.ejs');
// });

// //getting book data and updating in book list
// router.post('/', (req, res, next) => {
//   Book.create(req.body, (err, books) => {
//     if (err) return next(err);
//     res.redirect('/books');
//   });
// });

// //showing individual book

// router.get('/:id', (req, res, next) => {
//   var id = req.params.id;
//   Book.findById(id, (err, book) => {
//     if (err) return next(err);
//     res.render('bookDetails.ejs', { book });
//   });
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const Author = require('../models/author');
const Category = require('../models/category');

router.get('/', (req, res, next) => {
  Book.find({})
    .populate('author')
    .exec((err, books) => {
      if (err) next(err);
      res.render('listBooks', { books });
    });
});

router.get('/new', (req, res, next) => {
  Author.find({}, (err, authors) => {
    if (err) return next(err);
    Category.find({}, (err, categories) => {
      if (err) return next(err);
      res.render('bookForm', { authors: authors, categories: categories });
    });
  });
});

router.post('/', (req, res, next) => {
  Book.create(req.body, (err, book) => {
    if (err) return next(err);
    res.redirect(`/books/`);
  });
});

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  console.log(id);
  Book.findById(id)
    .populate('author')
    .populate('category')
    .exec((err, book) => {
      if (err) return next(err);
      res.render('bookDetail', { book });
    });
});

module.exports = router;
