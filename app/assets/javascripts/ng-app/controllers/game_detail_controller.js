angular.module('goodGames')
  .controller('GameDetailCtrl', ['$scope', '$modal', '$http', '$stateParams', 'Flash', '$rootScope', function ($scope, $modal, $http, $stateParams, Flash, $rootScope) {

    /************** Get game, user_game_link, and review data ***************/

    $http.get('/api/games/' + $stateParams.id).success(function(data){
      $scope.game = data.game;
      $scope.release_date = getReleaseDate($scope.game);
      $scope.link = data.link;

      $http.get('/api/review/' + $scope.game.id).success(function(data) {
        $scope.review = data;
        if($scope.review) $scope.oldRating = $scope.review.rating;
      });

      $http.get('/api/reviews/' + $scope.game.id).success(function(data) {
        $scope.reviews = data;
        $scope.averageRating = getAverageRating($scope.reviews);
        $scope.getStars = getStars;
        starCount();
      });
    });



    $scope.addShelf = function(shelf) {
      Flash.flashIn('shelf-flash');
      if($scope.link && $scope.link.id) {
        $http.put('/api/links/' + $scope.link.id, {user_game_link: {shelf: shelf}}).success(function(){
          Flash.flashOut('shelf-flash');
        });
      } else {
        $http.post('/api/links', {user_game_link: {shelf: shelf, game_id: $scope.game.id}}).success(function(data){
          $scope.link = data;
          Flash.flashOut('shelf-flash');
        });
      }
    };

    $scope.addRating = function() {
      Flash.flashIn('rating-flash');
      if($scope.review && $scope.review.id) {
        $http.put('/api/reviews/' + $scope.review.id, {review: {rating: $scope.review.rating}}).success(function(){
          updateReviews();
          Flash.flashOut('rating-flash');
        });
      } else {
        $http.post('/api/reviews', {review: {rating: $scope.review.rating, game_id: $scope.game.id}}).success(function(data){
          $scope.review = data;
          updateReviews();
          Flash.flashOut('rating-flash');
        });
      }
    };

    $scope.openReviewModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'review.html',
        controller: 'ReviewCtrl',
        windowClass: 'review-modal',
        backdropClass: 'review-backdrop',
        resolve: {
          game: function(){return $scope.game;},
          review: function(){return $scope.review;}
        }
      });

      modalInstance.result.then(function (review) {
        $scope.review = review;
        $scope.review.user = {};
        $scope.review.user.username = $rootScope.currentUser.username;
        updateReviews();
      });
    };



    function getReleaseDate( game ) {
      var date;
      if ( game.original_release_date ) {
        date = new Date( game.original_release_date );
      }
      else if ( game.expected_release_year && game.expected_release_quarter ) {
        date = "Q" + game.expected_release_quarter + " " + game.expected_release_year;
      }
      else if ( game.expected_release_year ) {
        date = new Date();
        date.setYear( game.expected_release_year );
        date.setMonth( game.expected_release_month - 1 );
        date.setDate( game.expected_release_day );
      } 
      else {
        date = "unknown";
      }
      return date;
    }

    function getAverageRating( reviews ) {
      if(reviews.length===0) return 0;
      var sum = 0;
      for(var i = 0; i < reviews.length; i++) {
        sum += reviews[i].rating;
      }
      return sum / reviews.length;
    }

    function getStars() {
      if($scope.reviews.length === 0) {
        return ['fa-star-o','fa-star-o','fa-star-o','fa-star-o','fa-star-o'];
      }
      avg = $scope.averageRating;
      floor = Math.floor(avg);
      stars = [];

      for ( var i = 0; i < floor; i++ ) {
        stars.push('fa-star');
      }

      if(avg - floor > 0.25) {
        stars.push('fa-star-half-o');
        floor++;
      }

      for(i = floor; i < 5; i++) {
        stars.push('fa-star-o');
      }
      return stars;
    }

    function starCount() {
      $scope.starCounts = [0,0,0,0,0,0];
      $scope.reviewCount = $scope.reviews.length;
      for (var i = 0; i < $scope.reviews.length; i++) {
        $scope.starCounts[$scope.reviews[i].rating] += 1;
      }
    }

    function updateReviews() {
      var newReview = true;
      var index;
      for(var i = 0 ; i < $scope.reviews.length; i++) {
        if($scope.reviews[i].id == $scope.review.id) {
          newReview = false;
          index = i;
          break;
        }
      }
      if(newReview) {
        $scope.reviews.push($scope.review);
      } else {
        $scope.reviews[index].rating = $scope.review.rating;
        $scope.reviews[index].text = $scope.review.text;
      }
      $scope.averageRating = getAverageRating($scope.reviews);

      $scope.starCounts[$scope.oldRating] -= 1; 
      $scope.starCounts[$scope.review.rating] += 1;
      $scope.oldRating = $scope.review.rating;

      if(!$scope.link) {
        $scope.link = {};
        $scope.link.shelf = 'played';
      }

    }



  }]);













