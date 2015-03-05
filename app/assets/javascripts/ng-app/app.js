/*************************************
 * App module and config
 **************************************/

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
        controller: 'HomeCtrl',
      })
      .state('welcome', {
        url: '/welcome',
        templateUrl: 'welcome.html',
        controller: 'WelcomeCtrl'
      })
      .state('search', {
        url: '/search',
        templateUrl: 'search.html',
        controller: 'SearchCtrl'
      })
      .state('games', {
        url: '/games',
        templateUrl: 'games.html',
        controller: 'GamesCtrl',
      })
      .state('game-detail', {
        url: '/game/:id',
        templateUrl: 'game-detail.html',
        controller: 'GameDetailCtrl'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'profile.html',
        controller: 'ProfileCtrl',
      });

    $urlRouterProvider.otherwise('/');

  }]);