angular
  .module('goodGames')
  .controller('WelcomeCtrl', ['$scope', '$http', '$state', '$rootScope', function($scope, $http, $state, $rootScope){

    $scope.user = {
      username: null,
      email: null,
      password: null,
      password_confirmation: null
    };

    $scope.signup = function() {
      $http.post('api/signup', {user: $scope.user}).success(function(data) {
        console.log(data);
        if(data.errors) {
          $scope.errors = data.errors;
        } else {
          $http.get('/api/currentuser').success(function(data){
            if(data) {
              $rootScope.currentUser = data;
              $rootScope.userShelves = {};
              $('.col-sm-4').hide().html("<div class='alert alert-success'>Account creation successful!</div>").fadeIn();
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