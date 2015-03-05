/************************************************
 * Home page controller (home.html.erb)
 ***********************************************/

angular.module('goodGames')
    .controller('HomeCtrl', ['$scope', '$http', '$rootScope', '$state', function($scope, $http, $rootScope, $state) {

      // redirect to welcome page if not logged in
      if(!loggedIn) $state.go('welcome');

      // get recent review and recent shelf data for activity feed
      $http.get('/api/recentreviews').success(function(data){
        var recent = data;
        $http.get('/api/links').success(function(data){
          $scope.recentActivities = recent.concat(data);
        });
      });

    }]);