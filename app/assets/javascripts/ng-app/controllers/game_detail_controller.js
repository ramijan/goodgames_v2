angular.module('goodGames')
  .controller('GameDetailCtrl', ['$scope', '$modal', '$http', '$stateParams', function ($scope, $modal, $http, $stateParams) {
    
    $http.get('/api/games/' + $stateParams.id).success(function(data){
      $scope.game = data;

      $scope.release_date = getReleaseDate($scope.game);
    });

    

    $scope.addReview = function() {
      $modal.open({
        templateUrl: 'review.html',
        windowClass: 'review-modal',
        backdropClass: 'review-backdrop'
      });
    };

    function getReleaseDate(game) {
      var date;
      if (game.original_release_date) {
        date = new Date(game.original_release_date);
      }
      else if (game.expected_release_year && game.expected_release_quarter) {
        date = "Q" + game.expected_release_quarter + " " + game.expected_release_year;
      }
      else if (game.expected_release_year) {
        date = new Date();
        date.setYear(game.expected_release_year);
        date.setMonth(game.expected_release_month - 1);
        date.setDate(game.expected_release_day);
      } 
      else {
        date = "unknown";
      }

      return date;

    }

  }]);













