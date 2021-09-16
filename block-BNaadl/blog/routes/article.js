var express = require('express');
const { route } = require('.');
var router = express.Router();

var Article = require('../models/Article');

/* GET users listing. */

router.get('/', function (req, res, next) {
  Article.find({}, (err, data) => {
    if (err) return next(err);
    res.render('articles.ejs', { articles: data });
  });
});

router.get('/new', (req, res, next) => {
  res.render('articleForm.ejs');
});

router.post('/', (req, res, next) => {
  req.body.tags = req.body.tags.trim().split(' ');
  Article.create(req.body, (err, data) => {
    if (err) return next(err);
    res.redirect('/articles');
  });
});

router.get('/:id', (req, res, next) => {
  var id = req.params.id;
  Article.findById(id, (err, data) => {
    if (err) return next(err);
    res.render('articleDetails.ejs', { data });
  });
});

router.get('/:id/edit', (req, res, next) => {
  var id = req.params.id;
  Article.findById(id, (err, data) => {
    data.tags = data.tags.join('');
    if (err) return next(err);
    res.render('editArticleForm.ejs', { data });
  });
});

router.post('/:id', (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndUpdate(id, req.body, (err, updateArticle) => {
    if (err) return next(err);

    res.redirect('/articles/' + id);
  });
});

router.get('/:id/delete', (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndDelete(id, (err, data) => {
    if (err) return next(err);
    res.redirect('/articles');
  });
});

router.get('/:id/likes', (req, res, next) => {
  var id = req.params.id;

  Article.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, data) => {
    if (err) return next(err);
    res.redirect('/articles/' + id);
  });
});

router.get('/:id/dislikes', (req, res, next) => {
  var id = req.params.id;

  Article.findByIdAndUpdate(id, { $inc: { likes: -1 } }, (err, data) => {
    if (err) return next(err);
    res.redirect('/articles/' + id);
  });
});

module.exports = router;
