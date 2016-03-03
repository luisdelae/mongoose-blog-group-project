myApp.factory('PostFactory', ['$http', function($http) {
  var allPosts;
  var selectedPostId;
  var selectedPostData;

  //Create Post post request
  var savePost = function(blogPost) {
    $http.post('/blogPost', blogPost).then(function(response) {
    });
  };

  var getPosts = function() {
    var promise = $http.get('/blogPost').then(function(response) {
      allPosts = response.data;
    });
    return promise;
  };

  var getSelectedPost = function() {
    var promise = $http.get('/blogPost/' + selectedPostId).then(function(response) {
      selectedPostData = response.data;
    });
      return promise;
  };

  var editPost = function(blogPost) {
    $http.put('/blogPost/' + selectedPostId, blogPost).then(function(response) {
    });
  };

  var deletePost = function() {
    $http.delete('blogPost/' + selectedPostId).then(function(){
    });
  };

  var publicFunctions = {
    factoryPostsList: function() {
      return allPosts;
    },
    factorySavePost: function(blogPost) {
      return savePost(blogPost);
    },
    factoryRetrievePosts: function() {
      return getPosts();
    },
    getPostId: function(id){
      selectedPostId = id;
      return selectedPostId;
    },
    factoryGetSelectedPost: function() {
      return getSelectedPost();
    },
    getSelectedPostData: function() {
      return selectedPostData;
    },
    factoryEditPost: function(blogPost) {
      return editPost(blogPost);
    },
    factoryDeletePost: function() {
      return deletePost();
    }
  };

return publicFunctions;

}]);
