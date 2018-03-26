var app = angular.module('alohaApp', []);
app.controller('JourneyController', function ($scope) {
  $scope.shortname = "Brisbane",
    $scope.longname = "Brisbane, Australia",
    $scope.activities = ["City Tours", "Sports", "Cycling", "Museums", "Boating"]
});

// var app = angular.module('alohaApp', []);
// app.controller('JourneyController', function ($scope) {
//     $scope.places = {
//           "shortname": "Brisbane",
//           "longname": "Brisbane, Australia",
//           "activities": [ "City Tours", "Sports", "Cycling", "Museums", "Boating" ]
//         }
//       });

// var app = angular.module('alohaApp', [])
// app.controller('JourneyController', function ($scope) {
//     $scope.places = {
//       "records": [
//         {
//           "shortname": "Brisbane",
//           "longname": "Brisbane, Australia",
//           "activities": [ "City Tours", "Sports", "Cycling", "Museums", "Boating" ]
//         },
//         {
//           "shortname": "Vancouver",
//           "name": "Vancouver, Canada",
//           "activities": [ "Museums", "Sailing", "Beach", "Hiking", "Boating" ]
//         },
//         {
//           "shortname": "New York City",
//           "name": "New York City, United States",
//           "activities": [ "Museums", "Theatre", "Parks and Recreation", "City Tours" ]
//         },
//         {
//           "shortname": "Berlin",
//           "name": "Berlin, Germany",
//           "activities": [ "City Tours", "Museums", "Cycling" ]
//         },
//         {
//           "shortname": "Cancun",
//           "name": "Cancun, Mexico",
//           "activities": [ "Parks and Recreation", "Beaches", "Boating", "Snorkeling" ]
//         }
//       ]
//     }
// });

// var app = angular.module('alohaApp', [])
// app.controller('JourneyController', function ($scope, $http) {
//   $http.get('js/data.json').then(function (response) {
//     $scope.journey = response.data.records;
//   });
// });

angular.module('filters.stringUtils', [])

  .filter('nospaces', [function () {
    return function (value) {
      return (!value) ? '' : value.replace(/ /g, '');
    };
  }]);

// angular.module('filters.stringUtils', [])

// .filter('removeSpaces', [function() {
//     return function(string) {
//         if (!angular.isString(string)) {
//             return string;
//         }
//         return string.replace(/[\s]/g, '');
//     };
// }])

