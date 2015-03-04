angular
  .module('goodGames')
  .controller('SearchCtrl', ['$scope', '$http', '$injector', '$rootScope', 'Flash', function($scope, $http, $injector, $rootScope, Flash) {

    $rootScope.searchPage = 1;

    $scope.getGames = function() {
      $('.search-spinner').show();
      $http.get("/api/search/?query=" + $scope.query)
        .success(function(data) {
          $rootScope.games = data.results;
  
          $rootScope.ratings = {};
          for(var i = 0; i < data.games.length; i++) {
            $rootScope.ratings[data.games[i].giant_bomb_id] = getRatingData(data.reviews[i]);
          }
  
          $scope.query = ''; 
          $injector.get('$state').transitionTo('search');
          $('.search-spinner').hide();

          $rootScope.tenGames = $rootScope.games.slice(0, 10);

      });
    };

    $scope.pageChanged = function(page) {
      var start = 10 * (page - 1);
      $rootScope.tenGames = $rootScope.games.slice(start, start+10);
      window.scrollTo(0,0);
    };


    $http.get('/api/currentuser').success(function(data){
      if(data) {
        $rootScope.currentUser = data;

        $rootScope.userShelves = {};
        for(var i = 0; i < data.games.length; i++) {
          $rootScope.userShelves[data.games[i].giant_bomb_id] = getShelf(data.games[i].id);
        }
      }
    });

    function getShelf(game_id) {
      var links = $rootScope.currentUser.user_game_links;

      for(var i = 0; i < links.length; i++) {
        if(links[i].game_id == game_id) return links[i];
      }
    }

    function getRatingData(reviews) {
      var sum = 0;
      var userRating = 0;
      var id;
      for(var i = 0; i < reviews.length; i++) {
        sum += reviews[i].rating;
        if($rootScope.currentUser && reviews[i].user_id == $rootScope.currentUser.id) {
          userRating = reviews[i].rating;
          id = reviews[i].id;
        }
      }
      var average = sum / reviews.length;
      return { average: average, total: reviews.length, oldRating: userRating, userRating: userRating, id: id };
    }


    $scope.addShelf = function(game_id) {
      $http.get('/api/games/' + game_id).success(function(data){
        var game = data.game;
        Flash.flashIn('shelf-flash-'+game_id);
        if($rootScope.userShelves[game_id] && $rootScope.userShelves[game_id].id) {
          $http.put('/api/links/' + $rootScope.userShelves[game_id].id, {user_game_link: {shelf: $rootScope.userShelves[game_id].shelf}}).success(function(data){
            Flash.flashOut('shelf-flash-'+game_id);
          });
        } else {
          $http.post('/api/links', {user_game_link: {shelf: $rootScope.userShelves[game_id].shelf, game_id: game.id}}).success(function(data){
            $rootScope.userShelves[game_id] = data;  // this prevents bug where changing shelves after first shelf selection(before reload) caused multiple entries in db
            Flash.flashOut('shelf-flash-'+game_id);
          });
        }
      });
    };

    $scope.addRating = function(game_id) {
      $http.get('/api/games/' + game_id).success(function(data){
        var game = data.game;
        var rating = $rootScope.ratings[game_id] || {};

        Flash.flashIn('rating-flash-'+game_id);
        if(rating && rating.id) {
          $http.put('/api/reviews/' + rating.id, {review: {rating: rating.userRating}}).success(function(data){
            Flash.flashOut('rating-flash-'+game_id);
            rating.average = (rating.average * rating.total - rating.oldRating + rating.userRating) / rating.total;
            rating.oldRating = rating.userRating;
          });
        } else {
          $http.post('/api/reviews', {review: {rating: rating.userRating, game_id: game.id}}).success(function(data){
            Flash.flashOut('rating-flash-'+game_id);
            if(rating.average) {
              rating.average = (rating.average * rating.total + rating.userRating) / (rating.total + 1);
              rating.oldRating = rating.userRating;
            } else {
              rating.average = rating.userRating;
              rating.total = 1;
              rating.oldRating = rating.userRating;
              rating.id = data.id;
            }
          });
        }

        if(!$rootScope.userShelves[game_id]) $rootScope.userShelves[game_id]= {shelf: 'played'};

      });
    };

  }]);