var daControllers = angular.module('daControllers', []);

daControllers.controller('SearchController', 
  function MainController($scope, $http) {
    $http.get('js/data.json').then(function(response) {
      $scope.cities = response.data;
      $scope.artistOrder = 'name';
  });
});

// probably do not need this...
daControllers.controller('DetailsController', 
function MainController($scope, $http, $routeParams) {
  $http.get('js/data.json').then(function(response) {
    $scope.cities = response.data;
    $scope.whichItem = $routeParams.itemId;

    if ($routeParams.itemId > 0) {
      $scope.prevItem = Number($routeParams.itemId) - 1;
    } else {
      $scope.prevItem = $scope.cities.length - 1;
    }

    if ($routeParams.itemId < $scope.cities.length-1) {
      $scope.nextItem = Number($routeParams.itemId) + 1;
    } else {
      $scope.nextItem = 0;
    }

});
});