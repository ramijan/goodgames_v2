/***********************************************
 * Controller for navbars (found in index.html.erb) 
 *************************************************/

angular.module('goodGames')
    .controller('NavCtrl', ['$scope', '$modal', '$http', '$rootScope', '$state', function ($scope, $modal, $http, $rootScope, $state) {
        
      // Triggered when Login link is pressed.  Opens the login modal
      $rootScope.login = function() {
        $modal.open({
          templateUrl: 'login.html',
          controller: 'AuthCtrl',
          windowClass: 'review-modal',
          backdropClass: 'review-backdrop'
        });
      };

      // Triggered when logout is pressed.  Logs user out and redirects to Welcome screen
      $scope.logout = function() {
        $http.delete('/api/logout').success(function(){
        $rootScope.currentUser = null;
        $state.go('welcome');
        loggedIn = false;
      });
    };
  }]);