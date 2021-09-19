var express = require('express');
const { route } = require('.');
var router = express.Router();

var Article = require('../models/Article');

var Comment = require('../models/Comment');

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

// router.get('/:id', (req, res, next) => {
//   var id = req.params.id;
//   Article.findById(id, (err, data) => {
//     console.log(data);
//     if (err) return next(err);
//     Comment.find({ articleId: id }, (err, comments) => {
//       if (err) return next(err);
//       res.render('articleDetails.ejs', { data, comments });
//     });
//   });
// });

router.get('/:id', (req, res, next) => {
  var id = req.params.id;
  Article.findById(id)
    .populate('comments')
    .exec((err, data) => {
      if (err) return next(err);
      res.render('articleDetails.ejs', { data });
      console.log(data);
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
    Comment.deleteMany({ articleId: id }, (err, info) => {
      if (err) return next(err);
      res.redirect('/articles');
    });
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

//create comments

router.post('/:id/comments', (req, res, next) => {
  var id = req.params.id;
  req.body.articleId = id;
  Comment.create(req.body, (err, comment) => {
    if (err) return next(err);
    Article.findByIdAndUpdate(
      id,
      { $push: { comments: comment._id } },
      (err, updateArticle) => {
        if (err) return next(err);
        res.redirect('/articles/' + id);
        console.log(updateArticle);
      }
    );

    // console.log(err, comment);
  });
});

module.exports = router;
