angular.module('goodGames')
    .controller('NavCtrl', ['$scope', '$modal', '$http', '$rootScope', function ($scope, $modal, $http, $rootScope) {
        $scope.login = function() {
          $modal.open({
            templateUrl: 'login.html',
            controller: 'AuthCtrl',
            windowClass: 'review-modal',
            backdropClass: 'review-backdrop'
          });
        };
        $scope.signup = function() {
          $modal.open({
            templateUrl: 'signup.html'
          });
        };

      $scope.logout = function() {
        $http.delete('/api/logout').success(function(){
        $rootScope.currentUser = null;
      });
    };
    }]);