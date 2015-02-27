angular.module('goodGames')
  .controller('GameDetailCtrl', ['$scope', '$modal', '$http', '$stateParams', function ($scope, $modal, $http, $stateParams) {

    /************** Get game, user_game_link, and review data ***************/

    $http.get('/api/games/' + $stateParams.id).success(function(data){
      $scope.game = data.game;
      $scope.release_date = getReleaseDate($scope.game);
      $scope.link = data.link;

      $http.get('/api/review/' + $scope.game.id).success(function(data) {
        $scope.review = data;
      });

      $http.get('/api/reviews/' + $scope.game.id).success(function(data) {
        $scope.reviews = data;
      });
    });



    $scope.addShelf = function(shelf) {
      if($scope.link && $scope.link.id) {
        $http.put('/api/links/' + $scope.link.id, {user_game_link: {shelf: shelf}});
      } else {
        $http.post('/api/links', {user_game_link: {shelf: shelf, game_id: $scope.game.id}}).success(function(data){
          $scope.link = data;
        });
      }
    };

    $scope.addRating = function() {
      if($scope.review && $scope.review.id) {
        $http.put('/api/reviews/' + $scope.review.id, {review: {rating: $scope.review.rating}});
      } else {
        $http.post('/api/reviews', {review: {rating: $scope.review.rating, game_id: $scope.game.id}}).success(function(data){
          $scope.review = data;
        });
      }
    };

    $scope.addReview = function() {
      $modal.open({
        templateUrl: 'review.html',
        windowClass: 'review-modal',
        backdropClass: 'review-backdrop'
      });
    };

    function getReleaseDate( game ) {
      var date;
      if ( game.original_release_date ) {
        date = new Date( game.original_release_date );
      }
      else if ( game.expected_release_year && game.expected_release_quarter ) {
        date = "Q" + game.expected_release_quarter + " " + game.expected_release_year;
      }
      else if ( game.expected_release_year ) {
        date = new Date();
        date.setYear( game.expected_release_year );
        date.setMonth( game.expected_release_month - 1 );
        date.setDate( game.expected_release_day );
      } 
      else {
        date = "unknown";
      }
      return date;
    }

  }]);













