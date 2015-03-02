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
        onEnter: function($rootScope, $state) {
          if(!$rootScope.currentUser) $state.go('welcome');
        }
      })
      .state('intro', {
        url: '/introduction',
        templateUrl: 'intro.html'
      })
      .state('welcome', {
        url: '/welcome',
        templateUrl: 'welcome.html'
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
        onEnter: function($rootScope, $state) {
          if(!$rootScope.currentUser) $state.go('welcome');
        }
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
        onEnter: function($rootScope, $state) {
          if(!$rootScope.currentUser) $state.go('welcome');
        }
      })
      .state('profile-edit', {
        url: '/profile-edit',
        templateUrl: 'profile-edit.html'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'about.html'
      });

    $urlRouterProvider.otherwise('/');

  }]);