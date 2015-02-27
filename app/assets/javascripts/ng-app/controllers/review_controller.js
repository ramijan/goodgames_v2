angular
  .module('goodGames')
  .controller('ReviewCtrl', ['$scope', '$http', '$modalInstance', 'game', 'review', function($scope, $http, $modalInstance, game, review) {
    $scope.game = game;
    $scope.review = review;

    if($scope.review && $scope.review.text) {
      $scope.header = "Edit review for " + $scope.game.name;
    } else {
      $scope.header =  "Add review for " + $scope.game.name;
    }
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    $scope.addReview = function() {
      if(!$scope.review || !$scope.review.rating) {
        $('.rating-review-flash').empty().append('<span>Rating is required</span>');
        return;
      }

      $('.review-flash').append("<i class='fa fa-spinner fa-spin'></i>&nbsp;Saving...").fadeIn();
 
      if($scope.review && $scope.review.id) {
        $http.put('/api/reviews/' + $scope.review.id, {review: {rating: $scope.review.rating, text: $scope.review.text}}).success(function(data){
          closeModal(data);
        });
      } else {
        $http.post('/api/reviews', {review: {rating: $scope.review.rating, text: $scope.review.text, game_id: $scope.game.id}}).success(function(data){
          closeModal(data);
        });
      }
    };

    function closeModal(data) {
      var flash = $('.review-flash');
      flash.empty().append("<i class='fa fa-floppy-o'></i>&nbsp;Saved!");
      window.setTimeout(function(){
        flash.empty();
        $modalInstance.close(data);
      }, 1000);
    }

  }]);





    //   $scope.addRating = function() {
    //   flashIn('rating');
    //   if($scope.review && $scope.review.id) {
    //     $http.put('/api/reviews/' + $scope.review.id, {review: {rating: $scope.review.rating}}).success(function(){
    //       $scope.starCounts[$scope.oldRating] -= 1; 
    //       $scope.starCounts[$scope.review.rating] += 1;
    //       $scope.oldRating = $scope.review.rating;
    //       updateReviews();
    //       flashOut('rating');
    //     });
    //   } else {
    //     $http.post('/api/reviews', {review: {rating: $scope.review.rating, game_id: $scope.game.id}}).success(function(data){
    //       $scope.review = data;
    //       $scope.starCounts[$scope.review.rating] += 1;
    //       updateReviews();
    //       flashOut('rating');
    //     });
    //   }
    // };