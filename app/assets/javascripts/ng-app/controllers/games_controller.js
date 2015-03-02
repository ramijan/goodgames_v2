angular
  .module('goodGames')
  .controller('GamesCtrl', ['$scope', '$http', 'Flash', function($scope, $http, Flash) {

    $http.get('/api/games').success(function(data){
      $scope.allLinks = data;
      $scope.links = $scope.allLinks;
      getShelfCounts();

      $http.get('/api/reviews/user').success(function(data) {
        $scope.reviews = data;
        for(var i = 0; i < $scope.reviews.length; i++) {
          for(var j = 0; j < $scope.links.length; j++) {
            if($scope.reviews[i].game_id === $scope.links[j].game_id) {
              $scope.links[j].review = $scope.reviews[i];
              break;
            }
          }
        }
      });
    });

    $scope.addShelf = function(shelf, link) {
      Flash.flashIn('shelf-flash-'+link.id);
      $http.put('/api/links/' + link.id, {user_game_link: {shelf: shelf}}).success(function(){
        Flash.flashOut('shelf-flash-'+link.id);
        for(var i = 0; i < $scope.links.length; i++) {
          if($scope.links[i].id == link.id) {
            $scope.links[i].shelf = shelf;
            getShelfCounts();
            break;
          }
        }
      });  
    };

    $scope.addRating = function(link) {
      Flash.flashIn('rating-flash-'+link.id);
      if(link.review && link.review.id) {
        $http.put('/api/reviews/' + link.review.id, {review: {rating: link.review.rating}}).success(function(){
          Flash.flashOut('rating-flash-'+link.id);
        });
      } else {
        $http.post('/api/reviews', {review: {rating: link.review.rating, game_id: link.game.id}}).success(function(data){
          Flash.flashOut('rating-flash-'+link.id);
        });
      }
    };

    function getShelfCounts() {
      $scope.played = [];
      $scope.playing = [];
      $scope.backlog = [];

      for(var i = 0; i < $scope.links.length; i++) {
        if($scope.links[i].shelf == 'played') $scope.played.push($scope.links[i]);
        else if($scope.links[i].shelf == 'playing') $scope.playing.push($scope.links[i]);
        else if($scope.links[i].shelf == 'backlog') $scope.backlog.push($scope.links[i]);
      }
    }

    $scope.filterShelf = function(shelf) {
      if(shelf=='all') $scope.links = $scope.allLinks;
      else if(shelf == 'playing' && $scope.playing.length > 0) $scope.links = $scope.playing;
      else if(shelf == 'played' && $scope.played.length > 0) $scope.links = $scope.played;
      else if(shelf == 'backlog' && $scope.backlog.length > 0) $scope.links = $scope.backlog;
    };


  }]);



