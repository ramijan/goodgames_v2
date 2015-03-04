angular
  .module('goodGames')
  .controller('ReviewCtrl', ['$scope', '$http', '$modalInstance', 'game', 'review', function($scope, $http, $modalInstance, game, review) {
    $scope.game = game;
    $scope.review = review;
    $scope.isReviewPresent = review.text;

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



