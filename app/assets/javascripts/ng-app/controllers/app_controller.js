angular.module('goodGames')
    .controller('NavCtrl', ['$scope', '$modal', function ($scope, $modal) {
        $scope.login = function() {
          $modal.open({
          templateUrl: 'login.html'
          });
        };
        $scope.signup = function() {
          $modal.open({
            templateUrl: 'signup.html'
          });
        };
    }]);