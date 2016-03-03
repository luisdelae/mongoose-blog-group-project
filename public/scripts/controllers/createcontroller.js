myApp.controller('CreateController', ['$scope', '$http', 'PostFactory', function($scope, $http, PostFactory) {
  console.log('Hello from the CreateController');

  $scope.post = {};
  $scope.postFactory = PostFactory;

  $scope.addPost = function() {
    var post = {
      postTitle: $scope.title,
      postDate: $scope.date,
      postAuthor: $scope.author,
      postContent: $scope.entry
    };


    $scope.postFactory.factorySavePost(post);

    $scope.title = '';
    $scope.date = '';
    $scope.author = '';
    $scope.entry = '';

  };

}]);
