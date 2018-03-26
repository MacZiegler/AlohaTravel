
// var app = angular.module('alohaApp', [])
// app.controller('JourneyController', function ($scope) {
//     $scope.journey = {
//       "longname": "Brisbane, Australia",
//       "shortname": "Brisbane",
//       "activities": [ "City Tours", "Sports", "Cycling", "Museums", "Boating" ]
//     };
// });

var app = angular.module('alohaApp', [])
app.controller('JourneyController', function ($scope, $http) {
  $http.get('js/data.json').then(function (response) {
    $scope.journey = response.data.records;
  });
});

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

