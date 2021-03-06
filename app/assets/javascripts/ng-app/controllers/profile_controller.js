/***************************************************
 * Profile page controller (profile.html.erb)
 **************************************************/

angular
  .module('goodGames')
  .controller('ProfileCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {

    // redirect to welcome page if not logged in
    if(!loggedIn) $state.go('welcome');

    // get current user data from api endpoint
    $http.get('/api/currentuser').success(function(data){
      if(data) {
        $scope.currentUser = data;
        $scope.activities = $scope.currentUser.user_game_links.concat($scope.currentUser.reviews);
        
        $scope.games = {};
        var g = $scope.currentUser.games;
        for(var i = 0; i < g.length; i++) {
          $scope.games[g[i].id] = {thumb_image: g[i].thumb_image, name: g[i].name, giant_bomb_id: g[i].giant_bomb_id};
        }

        setShelfCounts();
      }
    });

    // Calculate number of game in each shelf (for display)
    function setShelfCounts() {
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