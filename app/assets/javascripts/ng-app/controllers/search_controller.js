angular
  .module('goodGames')
  .controller('SearchCtrl', ['$scope', '$http', function($scope, $http) {

    $scope.getGames = function() {
      $http.get("/api/search/?query=" + $scope.query)
           .success(function(data) {
            $scope.games = data.results;
            $scope.query = ''; 
           });
    };

  }]);