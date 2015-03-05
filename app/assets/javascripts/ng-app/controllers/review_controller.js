/*****************************************************
 * Review modal controller (review.html).  Modal is 
 * opened from the Game-detail page (game-detail.html), 
 * GameDetailCtrl
 ****************************************************/

angular
  .module('goodGames')
  .controller('ReviewCtrl', ['$scope', '$http', '$modalInstance', 'game', 'review', function($scope, $http, $modalInstance, game, review) {
    
    // game and review are resolved from the $modal.open in GameDetailCtrl
    $scope.game = game;
    $scope.review = review;
    // used to determine if text should say "add" or "edit" review
    $scope.isReviewPresent = review.text;

    // Triggered by modal (x) button.  Closes modal
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    // Triggered by form submit
    // Determines whether it should be a POST or PUT and creates/updates
    // review in database.   Verifies that rating is present for new reviews
    // Successful database save triggers close modal
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

    // helper function for addReview().  Closes modal and returns review data
    // to GameDetailCtrl for use on game-detail page
    function closeModal(data) {
      var flash = $('.review-flash');
      flash.empty().append("<i class='fa fa-floppy-o'></i>&nbsp;Saved!");
      window.setTimeout(function(){
        flash.empty();
        $modalInstance.close(data);
      }, 1000);
    }
  }]);



