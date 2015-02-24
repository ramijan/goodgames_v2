angular.module('goodGames')
    .controller('GameDetailCtrl', ['$scope', '$modal', function ($scope, $modal) {
      $scope.review = function() {
        $modal.open({
          templateUrl: 'review.html'
        });
      };

    }]);