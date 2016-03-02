var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/createview', {
      templateUrl: '/views/templates/createview.html',
      controller: 'CreateController'
    })
    .when('/posts', {
      templateUrl: '/views/templates/posts.html',
      controller: 'PostController'
    })
    .when('/review', {
      templateUrl: '/views/templates/review.html',
      controller: 'ReviewController'
    })
    .otherwise({
      redirectTo: 'createview'
    });

}]);
