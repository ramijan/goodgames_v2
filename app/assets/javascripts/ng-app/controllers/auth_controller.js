/**************************************
 * Login modal controller (login.html.erb)
 *************************************/

angular
  .module('goodGames')
  .controller('AuthCtrl', ['$scope', '$http', '$rootScope', '$modalInstance', function($scope, $http, $rootScope, $modalInstance) {

    // Triggered when user presses Login button
    // Logs user in with valid credentials.  Displays error when invalid
    // Sets relevant variables when login is successful and closes modal
    $scope.login = function() {
      $http.post('/api/login', {user: {username: $scope.username, password: $scope.password}}).success(function(data){
        if(data.error) {
          $('.error-flash').addClass('alert alert-danger').html('<span class="glyphicon glyphicon-exclamation-sign"></span> ' + data.error);
        } else {
          $http.get('/api/currentuser').success(function(data){
            if(data) {
              $rootScope.currentUser = data;
              loggedIn = true;

              $rootScope.userShelves = {};
              for(var i = 0; i < data.games.length; i++) {
                $rootScope.userShelves[data.games[i].giant_bomb_id] = getShelf(data.games[i].id);
              }
            }
            closeModal();
          });
        }
      });
    };

    // Called when (x) button is pressed.  Closes modal
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    // Helper for login, to get user_game_links in a better format (related to giant_bomb_id rather than db game_id)
    function getShelf(game_id) {
      var links = $rootScope.currentUser.user_game_links;

      for(var i = 0; i < links.length; i++) {
        if(links[i].game_id == game_id) return links[i];
      }
    }

    // Closes modal after successful login
    function closeModal() {
      var flash = $('.error-flash');
      flash.empty().removeClass('alert-danger').addClass('alert alert-info').append("<span class='glyphicon glyphicon-thumbs-up'></span> Login successful");
      window.setTimeout(function(){
        $modalInstance.dismiss('close');
      }, 1500);
    }


  }]);
