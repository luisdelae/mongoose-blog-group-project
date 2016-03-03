var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/blogdb');
mongoose.model(
  'Post',
  new Schema({
    "postTitle": String,
    "postDate": Date,
    "postAuthor": String,
    "postContent": String,
    "postComment": String //will be used only on review comment page
  },
  {
    collection: 'blog'
  }
));

var Post = mongoose.model('Post');

app.post('/blogPost', function(req, res) {
  var addPost = new Post({
    "postTitle": req.body.postTitle,
    "postDate": req.body.postDate,
    "postAuthor": req.body.postAuthor,
    "postContent": req.body.postContent
  });

//post new blog post
  addPost.save(function(err, data) {
    if(err) {
      console.log('ERROR:', err);
    }

    Post.find({}, function(err, data) {
      if(err) {
        console.log('ERROR:', err);
      }

      res.send(data);

    });
  });
});

//get all posts in list
app.get('/blogPost', function(req, res) {
  Post.find({}, function(err, data) {
    if (err) {
      console.log('ERROR:', err);
    }

    res.send(data);

  });
});

//get data from selected post by ID
app.get('/blogPost/:id', function(req, res) {
  Post.findById({"_id": req.params.id}, function(err, data) {
    if (err) {
      console.log('ERROR:', err);
    }
    res.send(data);
  });
});

//update posts
app.put('/blogPost/:id', function(req, res) {

  var addPost = {
    "postTitle": req.body.postTitle,
    "postDate": req.body.postDate,
    "postAuthor": req.body.postAuthor,
    "postContent": req.body.postContent,
    "postComment": req.body.postComment
  };

  Post.findByIdAndUpdate(
    {_id: req.params.id},
    {
      $set: {postTitle: addPost.postTitle,
      postDate: addPost.postDate,
      postAuthor: addPost.postAuthor,
      postContent: addPost.postContent,
      postComment: addPost.postComment
      }
    },
    function(err, data) {
      if (err) {
        console.log('ERROR:', err);
      }
      res.send(data);
    }
  );
});

app.delete('/blogPost/:id', function(req, res) {
  Post.findByIdAndRemove({"_id": req.params.id}, function(err, data) {
    if (err) {
      console.log('ERROR:', err);
    }
    res.send(data);
  });
});

// Serve back static files
app.use(express.static('public'));
app.use(express.static('public/views'));
app.use(express.static('public/scripts'));
app.use(express.static('public/styles'));
app.use(express.static('public/vendors'));

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});
