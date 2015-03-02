angular.module('goodGames')
    .controller('NavCtrl', ['$scope', '$modal', '$http', '$rootScope', '$state', function ($scope, $modal, $http, $rootScope, $state) {
        $rootScope.login = function() {
          $modal.open({
            templateUrl: 'login.html',
            controller: 'AuthCtrl',
            windowClass: 'review-modal',
            backdropClass: 'review-backdrop'
          });
        };

      $scope.logout = function() {
        $http.delete('/api/logout').success(function(){
        $rootScope.currentUser = null;
        $state.go('welcome');
      });
    };
    }]);