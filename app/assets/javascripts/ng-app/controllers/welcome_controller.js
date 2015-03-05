/***************************************
 *  Welcome / Signup (welcome.html) page 
 *  controller
 **************************************/

angular
  .module('goodGames')
  .controller('WelcomeCtrl', ['$scope', '$http', '$state', '$rootScope', function($scope, $http, $state, $rootScope){

    // empty object to store data from sign up form
    $scope.user = {
      username: null,
      email: null,
      password: null,
      password_confirmation: null
    };

    // Called when user clicks the sign up button, submits the provided data to api/signup
    // endpoint and updates certain variables afterwards to indicate logged in user and redirect
    // to home page
    $scope.signup = function() {
      $http.post('api/signup', {user: $scope.user}).success(function(data) {
        if(data.errors) {
          $scope.errors = data.errors;
        } else {
          loggedIn = true;
          $http.get('/api/currentuser').success(function(data){
            if(data) {
              $rootScope.currentUser = data;
              $rootScope.userShelves = {};
              $('.col-md-4').hide().html("<div class='alert alert-success'>Account creation successful!</div>").fadeIn();
              window.setTimeout(function(){
                $('.alert').fadeOut(function() {
                  $state.go('home');
                });
              }, 2000);
            }
          });
        }
      });
    };
  }]);