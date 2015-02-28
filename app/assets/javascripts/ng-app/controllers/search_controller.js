angular
  .module('goodGames')
  .controller('SearchCtrl', ['$scope', '$http', '$injector', '$rootScope', function($scope, $http, $injector, $rootScope) {

    $scope.getGames = function() {
      $('.search-spinner').show();
      $http.get("/api/search/?query=" + $scope.query)
           .success(function(data) {
            $rootScope.games = data.results;
            $scope.query = ''; 
            $injector.get('$state').transitionTo('search');
            $('.search-spinner').hide();
           });
    };

    // For testing
    // $scope.games = [{"api_detail_url":"http://www.giantbomb.com/api/game/3030-16909/","deck":"When humanity is still a newcomer on the futuristic galactic stage, it's up to the charismatic Commander Shepard to investigate the actions of a rogue agent in the first chapter of the Mass Effect trilogy.","expected_release_year":null,"id":16909,"image":{"icon_url":"http://static.giantbomb.com/uploads/square_avatar/8/82063/2577246-me1.jpg","medium_url":"http://static.giantbomb.com/uploads/scale_medium/8/82063/2577246-me1.jpg","screen_url":"http://static.giantbomb.com/uploads/screen_medium/8/82063/2577246-me1.jpg","small_url":"http://static.giantbomb.com/uploads/scale_small/8/82063/2577246-me1.jpg","super_url":"http://static.giantbomb.com/uploads/scale_large/8/82063/2577246-me1.jpg","thumb_url":"http://static.giantbomb.com/uploads/scale_avatar/8/82063/2577246-me1.jpg","tiny_url":"http://static.giantbomb.com/uploads/square_mini/8/82063/2577246-me1.jpg"},"name":"Mass Effect","original_release_date":"2007-11-20 00:00:00","platforms":[{"api_detail_url":"http://www.giantbomb.com/api/platform/3045-20/","id":20,"name":"Xbox 360","site_detail_url":"http://www.giantbomb.com/xbox-360/3045-20/","abbreviation":"X360"},{"api_detail_url":"http://www.giantbomb.com/api/platform/3045-88/","id":88,"name":"PlayStation Network (PS3)","site_detail_url":"http://www.giantbomb.com/playstation-network-ps3/3045-88/","abbreviation":"PS3N"},{"api_detail_url":"http://www.giantbomb.com/api/platform/3045-94/","id":94,"name":"PC","site_detail_url":"http://www.giantbomb.com/pc/3045-94/","abbreviation":"PC"}],"resource_type":"game"},{"api_detail_url":"http://www.giantbomb.com/api/game/3030-37437/","deck":"Go rogue against the human supremacist organization Cerberus in this third-person Mass Effect spin-off for iOS and Android devices. Progress made in the campaign can improve the overall mission for players of Mass Effect 3.","expected_release_year":null,"id":37437,"image":{"icon_url":"http://static.giantbomb.com/uploads/square_avatar/6/62543/2180853-480px_infiltrator_icon.png","medium_url":"http://static.giantbomb.com/uploads/scale_medium/6/62543/2180853-480px_infiltrator_icon.png","screen_url":"http://static.giantbomb.com/uploads/screen_medium/6/62543/2180853-480px_infiltrator_icon.png","small_url":"http://static.giantbomb.com/uploads/scale_small/6/62543/2180853-480px_infiltrator_icon.png","super_url":"http://static.giantbomb.com/uploads/scale_large/6/62543/2180853-480px_infiltrator_icon.png","thumb_url":"http://static.giantbomb.com/uploads/scale_avatar/6/62543/2180853-480px_infiltrator_icon.png","tiny_url":"http://static.giantbomb.com/uploads/square_mini/6/62543/2180853-480px_infiltrator_icon.png"},"name":"Mass Effect: Infiltrator","original_release_date":"2012-03-06 00:00:00","platforms":[{"api_detail_url":"http://www.giantbomb.com/api/platform/3045-96/","id":96,"name":"iPhone","site_detail_url":"http://www.giantbomb.com/iphone/3045-96/","abbreviation":"IPHN"},{"api_detail_url":"http://www.giantbomb.com/api/platform/3045-121/","id":121,"name":"iPad","site_detail_url":"http://www.giantbomb.com/ipad/3045-121/","abbreviation":"IPAD"},{"api_detail_url":"http://www.giantbomb.com/api/platform/3045-123/","id":123,"name":"Android","site_detail_url":"http://www.giantbomb.com/android/3045-123/","abbreviation":"ANDR"}],"resource_type":"game"},{"api_detail_url":"http://www.giantbomb.com/api/game/3030-26087/","deck":"A top-down shooter in the Mass Effect franchise starring Jacob Taylor, a biotic-powered super-soldier.","expected_release_year":null,"id":26087,"image":{"icon_url":"http://static.giantbomb.com/uploads/square_avatar/0/7465/1041429-megheader580px.jpg","medium_url":"http://static.giantbomb.com/uploads/scale_medium/0/7465/1041429-megheader580px.jpg","screen_url":"http://static.giantbomb.com/uploads/screen_medium/0/7465/1041429-megheader580px.jpg","small_url":"http://static.giantbomb.com/uploads/scale_small/0/7465/1041429-megheader580px.jpg","super_url":"http://static.giantbomb.com/uploads/scale_large/0/7465/1041429-megheader580px.jpg","thumb_url":"http://static.giantbomb.com/uploads/scale_avatar/0/7465/1041429-megheader580px.jpg","tiny_url":"http://static.giantbomb.com/uploads/square_mini/0/7465/1041429-megheader580px.jpg"},"name":"Mass Effect: Galaxy","original_release_date":"2009-06-22 00:00:00","platforms":[{"api_detail_url":"http://www.giantbomb.com/api/platform/3045-96/","id":96,"name":"iPhone","site_detail_url":"http://www.giantbomb.com/iphone/3045-96/","abbreviation":"IPHN"}],"resource_type":"game"},{"api_detail_url":"http://www.giantbomb.com/api/game/3030-29935/","deck":"When Earth begins to fall in an ancient cycle of destruction, Commander Shepard must unite the forces of the galaxy to stop the Reapers in the infamous final chapter of the first Mass Effect trilogy.","expected_release_year":null,"id":29935,"image":{"icon_url":"http://static.giantbomb.com/uploads/square_avatar/8/87790/2126447-box_me3.png","medium_url":"http://static.giantbomb.com/uploads/scale_medium/8/87790/2126447-box_me3.png","screen_url":"http://static.giantbomb.com/uploads/screen_medium/8/87790/2126447-box_me3.png","small_url":"http://static.giantbomb.com/uploads/scale_small/8/87790/2126447-box_me3.png","super_url":"http://static.giantbomb.com/uploads/scale_large/8/87790/2126447-box_me3.png","thumb_url":"http://static.giantbomb.com/uploads/scale_avatar/8/87790/2126447-box_me3.png","tiny_url":"http://static.giantbomb.com/uploads/square_mini/8/87790/2126447-box_me3.png"},"name":"Mass Effect 3","original_release_date":"2012-03-06 00:00:00","platforms":[{"api_detail_url":"http://www.giantbomb.com/api/platform/3045-20/","id":20,"name":"Xbox 360","site_detail_url":"http://www.giantbomb.com/xbox-360/3045-20/","abbreviation":"X360"},{"api_detail_url":"http://www.giantbomb.com/api/platform/3045-35/","id":35,"name":"PlayStation 3","site_detail_url":"http://www.giantbomb.com/playstation-3/3045-35/","abbreviation":"PS3"},{"api_detail_url":"http://www.giantbomb.com/api/platform/3045-88/","id":88,"name":"PlayStation Network (PS3)","site_detail_url":"http://www.giantbomb.com/playstation-network-ps3/3045-88/","abbreviation":"PS3N"},{"api_detail_url":"http://www.giantbomb.com/api/platform/3045-94/","id":94,"name":"PC","site_detail_url":"http://www.giantbomb.com/pc/3045-94/","abbreviation":"PC"},{"api_detail_url":"http://www.giantbomb.com/api/platform/3045-139/","id":139,"name":"Wii U","site_detail_url":"http://www.giantbomb.com/wii-u/3045-139/","abbreviation":"WIIU"}],"resource_type":"game"},{"api_detail_url":"http://www.giantbomb.com/api/game/3030-21590/","deck":"After a violent death by an unknown force and a timely reanimation by the human supremacist organization Cerberus, Commander Shepard must assemble a new squad in the seedier side of the galaxy for a suicide mission in the second installment of the \"Mass Effect\" trilogy.","expected_release_year":null,"id":21590,"image":{"icon_url":"http://static.giantbomb.com/uploads/square_avatar/8/82063/2577248-me2.jpg","medium_url":"http://static.giantbomb.com/uploads/scale_medium/8/82063/2577248-me2.jpg","screen_url":"http://static.giantbomb.com/uploads/screen_medium/8/82063/2577248-me2.jpg","small_url":"http://static.giantbomb.com/uploads/scale_small/8/82063/2577248-me2.jpg","super_url":"http://static.giantbomb.com/uploads/scale_large/8/82063/2577248-me2.jpg","thumb_url":"http://static.giantbomb.com/uploads/scale_avatar/8/82063/2577248-me2.jpg","tiny_url":"http://static.giantbomb.com/uploads/square_mini/8/82063/2577248-me2.jpg"},"name":"Mass Effect 2","original_release_date":"2010-01-26 00:00:00","platforms":[{"api_detail_url":"http://www.giantbomb.com/api/platform/3045-20/","id":20,"name":"Xbox 360","site_detail_url":"http://www.giantbomb.com/xbox-360/3045-20/","abbreviation":"X360"},{"api_detail_url":"http://www.giantbomb.com/api/platform/3045-35/","id":35,"name":"PlayStation 3","site_detail_url":"http://www.giantbomb.com/playstation-3/3045-35/","abbreviation":"PS3"},{"api_detail_url":"http://www.giantbomb.com/api/platform/3045-88/","id":88,"name":"PlayStation Network (PS3)","site_detail_url":"http://www.giantbomb.com/playstation-network-ps3/3045-88/","abbreviation":"PS3N"},{"api_detail_url":"http://www.giantbomb.com/api/platform/3045-94/","id":94,"name":"PC","site_detail_url":"http://www.giantbomb.com/pc/3045-94/","abbreviation":"PC"}],"resource_type":"game"},{"api_detail_url":"http://www.giantbomb.com/api/game/3030-46631/","deck":"The next installment of the Mass Effect franchise is in development at BioWare Montreal.","expected_release_year":2016,"id":46631,"image":{"icon_url":"http://static.giantbomb.com/uploads/square_avatar/0/3699/2723301-screenshot+1.jpg","medium_url":"http://static.giantbomb.com/uploads/scale_medium/0/3699/2723301-screenshot+1.jpg","screen_url":"http://static.giantbomb.com/uploads/screen_medium/0/3699/2723301-screenshot+1.jpg","small_url":"http://static.giantbomb.com/uploads/scale_small/0/3699/2723301-screenshot+1.jpg","super_url":"http://static.giantbomb.com/uploads/scale_large/0/3699/2723301-screenshot+1.jpg","thumb_url":"http://static.giantbomb.com/uploads/scale_avatar/0/3699/2723301-screenshot+1.jpg","tiny_url":"http://static.giantbomb.com/uploads/square_mini/0/3699/2723301-screenshot+1.jpg"},"name":"Untitled Mass Effect Game","original_release_date":null,"platforms":[{"api_detail_url":"http://www.giantbomb.com/api/platform/3045-94/","id":94,"name":"PC","site_detail_url":"http://www.giantbomb.com/pc/3045-94/","abbreviation":"PC"},{"api_detail_url":"http://www.giantbomb.com/api/platform/3045-145/","id":145,"name":"Xbox One","site_detail_url":"http://www.giantbomb.com/xbox-one/3045-145/","abbreviation":"XONE"},{"api_detail_url":"http://www.giantbomb.com/api/platform/3045-146/","id":146,"name":"PlayStation 4","site_detail_url":"http://www.giantbomb.com/playstation-4/3045-146/","abbreviation":"PS4"}],"resource_type":"game"}];


  }]);