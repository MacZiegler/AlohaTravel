var app = angular.module('alohaApp', []);
app.controller('JourneyController', function ($scope, $http) {
  $http.get('js/data.json').then(function (response) {
    $scope.places = response.data;
    $scope.selectedplace = {
      "idno": "0",
      "shortname": "Anywhere",
      "longname": "Your vacation awaits...",
      "filename": "destunknown.jpg",
      "activities": "",
      "choices": []
    };
    var firstplace = angular.copy($scope.selectedplace);

    $scope.resetForm = function () {
      $scope.selectedplace = angular.copy(firstplace);
      $scope.placeform.$setPristine();
    }

    $scope.isPlaceChanged = function ()
    {
      return !angular.equals($scope.selectedplace, firstplace);
    };
    
    $scope.processinput = function () {
      http({
        method: 'POST',
        url: 'post_reserve_data.php',
        // data: $.param($scope.selectedplace),  // pass in data as strings
        data: $scope.selectedplace,  // pass in data as strings
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
      })
        .success(function (data) {
          console.log(data);

          if (!data.success) {
            // if not successful, bind errors to error variables and bind fail message
            $scope.errorShortname = data.errors.shortname;
            $scope.errorAdults = data.errors.adults;
            $scope.errorChildren = data.errors.children;
            $scope.errorDepart = data.errors.depart;
            $scope.errorReturn = data.errors.return;
            $scope.message = data.message;
            $scope.success = data.success;
          } else {
            // if successful, just bind success and message
            $scope.message = data.message;
            $scope.success = data.success;
          }
        });

    }
  });
});
// Super thanks to Alexander Puchkov for the numbers-only directive: https://codepen.io/apuchkov/pen/ILjFr
app.directive('numbersOnly', function () {
  return {
    require: 'ngModel',
    link: function (scope, element, attr, ngNumberController) {
      function fromUser(text) {
        if (text) {
          var transformedInput = text.replace(/[^0-9]/g, '');

          if (transformedInput !== text) {
            ngNumberController.$setViewValue(transformedInput);
            ngNumberController.$render();
          }
          return transformedInput;
        }
        return undefined;
      }
      ngNumberController.$parsers.push(fromUser);
    }
  };
});