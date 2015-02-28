angular
  .module('goodGames')
  .controller('ProfileCtrl', ['$scope', '$http', function($scope, $http) {

    $http.get('/api/currentuser').success(function(data){
      if(data) {
        $scope.currentUser = data;

        getShelfCounts();
      }
    });


    function getShelfCounts() {
      $scope.played = [];
      $scope.playing = [];
      $scope.backlog = [];

      for(var i = 0; i < $scope.currentUser.user_game_links.length; i++) {
        if($scope.currentUser.user_game_links[i].shelf == 'played') $scope.played.push($scope.currentUser.user_game_links[i]);
        else if($scope.currentUser.user_game_links[i].shelf == 'playing') $scope.playing.push($scope.currentUser.user_game_links[i]);
        else if($scope.currentUser.user_game_links[i].shelf == 'backlog') $scope.backlog.push($scope.currentUser.user_game_links[i]);
      }
    }

  }]);