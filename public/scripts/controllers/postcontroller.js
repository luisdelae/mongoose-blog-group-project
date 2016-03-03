myApp.controller('PostController', ['$scope', '$location', 'PostFactory', function($scope, $location, PostFactory) {
  console.log('Hello from the PostController');

  $scope.postFactory = PostFactory;
  $scope.posts = [];

  // if ($scope.postFactory.factoryPostsList() === undefined){
    $scope.postFactory.factoryRetrievePosts().then(function() {
      $scope.posts = $scope.postFactory.factoryPostsList();
    });
    // } else {
    //   $scope.posts = $scope.postFactory.factoryPostsList();
    //   console.log('PostControllerElse: ', $scope.posts);
    // }

  $scope.selectPost = function(id){
    $scope.postFactory.getPostId(id);
    $location.path('review');
  };

}]);
