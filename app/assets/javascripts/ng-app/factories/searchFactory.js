// Not sure how this works exactly.  


// angular
//   .module('goodGames')
//   .factory('SearchFactory', ['$http', function($http) {

//       var results = [];

//       var factory = {
//         search: function(query) {
//           $http.get("/api/search/?query=" + query)
//             .success(function(data) {
//               results = data.results;
//             });
//         },
//         getResults: function() {
//           return results;
//         }
//       };

//       return factory;


//   }]);