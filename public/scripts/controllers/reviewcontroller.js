myApp.controller('ReviewController', ['$scope', '$location', 'PostFactory', function($scope, $location, PostFactory) {
  console.log('Hello from the ReviewController');

  $scope.postFactory = PostFactory;

  $scope.postFactory.factoryGetSelectedPost().then(function() {
    $scope.posts = $scope.postFactory.getSelectedPostData();
    enterData();
  });

  function enterData() {
    $scope.title = $scope.posts.postTitle;
    $scope.date = new Date($scope.posts.postDate);
    $scope.author = $scope.posts.postAuthor;
    $scope.entry = $scope.posts.postContent;
    $scope.comments = $scope.posts.postComment;
  }

  $scope.editPost = function() {
    var post = {
      postTitle: $scope.title,
      postDate: $scope.date,
      postAuthor: $scope.author,
      postContent: $scope.entry,
      postComment: $scope.comments
    };

    $scope.postFactory.factoryEditPost(post);

    $location.path('posts');
  };

  $scope.deletePost = function() {
    $scope.postFactory.factoryDeletePost();
    alert('post has been deleted');
    $location.path('posts');
  };

}]);
