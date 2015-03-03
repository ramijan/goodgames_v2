angular.module('goodGames')
    .controller('HomeCtrl', ['$scope', '$http', '$rootScope', '$state', function($scope, $http, $rootScope, $state) {

      if(!loggedIn) $state.go('welcome');

      $http.get('/api/recentreviews').success(function(data){
        var recent = data;
        $http.get('/api/links').success(function(data){
          $scope.recentActivities = recent.concat(data);
        });
      });

    }]);