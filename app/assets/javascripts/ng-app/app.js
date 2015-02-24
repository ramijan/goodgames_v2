angular
  .module('goodGames', ['ngAnimate', 'ui.router', 'ui.bootstrap', 'templates', 'ngResource'])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.common['X-CSRF-Token'] =
      $('meta[name=csrf-token]').attr('content');
  }])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home.html',
        controller: 'HomeCtrl'
      });

    $urlRouterProvider.otherwise('/');

  }]);