angular
  .module('goodGames', ['ngAnimate', 'ui.router', 'ui.bootstrap', 'templates', 'ngResource'])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.common['X-CSRF-Token'] =
      $('meta[name=csrf-token]').attr('content');
  }])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        url: '',
        templateUrl: 'app.html',
        controller: 'NavCtrl',
        abstract: true
      })
        .state('app.home', {
          url: '/',
          templateUrl: 'home.html',
          controller: 'HomeCtrl'
        })
        .state('app.intro', {
          url: '/introduction',
          templateUrl: 'intro.html'
        })
        .state('app.welcome', {
          url: '/welcome',
          templateUrl: 'welcome.html'
        })
        .state('app.search', {
          url: '/search',
          templateUrl: 'search.html'
        })
        .state('app.games', {
          url: '/games',
          templateUrl: 'games.html'
        })
        .state('app.game-detail', {
          url: '/game/:id',
          templateUrl: 'game-detail.html',
          controller: 'GameDetailCtrl'
        })
        .state('app.profile', {
          url: '/profile',
          templateUrl: 'profile.html'
        })
        .state('app.profile-edit', {
          url: '/profile-edit',
          templateUrl: 'profile-edit.html'
        })
        .state('app.about', {
          url: '/about',
          templateUrl: 'about.html'
        });

    $urlRouterProvider.otherwise('/');

  }]);