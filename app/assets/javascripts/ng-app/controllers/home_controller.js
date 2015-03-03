angular.module('goodGames')
    .controller('HomeCtrl', ['$scope', '$http', function($scope, $http) {

      $http.get('/api/recentreviews').success(function(data){
        var recent = data;
        $http.get('/api/links').success(function(data){
          $scope.recentActivities = recent.concat(data);
        });
      });

    }]);