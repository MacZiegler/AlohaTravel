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
    
    $scope.submitForm = function () {
      if ($scope.placeform.$valid) {
        $('#resetbutton').show()
        $('#userform').show()
        $('#placeform').hide()
      }
    }

    $scope.processinput = function () {
      http({
        method: 'POST',
        url: 'post_reserve_data.php',
        data: $.param($scope.selectedplace),  // pass in data as strings
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
          } else {
            // if successful, just bind success message
            $scope.message = data.message;
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
// Controller function and passing $http service and $scope var.
app.controller('postReserveController', function ($scope, $http) {
  // create a blank object to handle form data.
  $scope.reserve = {};
  // calling our submit function.
  $scope.submitForm = function () {
    // Posting data to php file
    $http({
      method: 'POST',
      url: 'process.php',
      data: $scope.reserve, //forms user object
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .success(function (data) {
        if (data.errors) {
          // Showing errors.
          $scope.errorShortname = data.errors.shortname;
          $scope.errorAdults = data.errors.adults;
          $scope.errorChildren = data.errors.children;
          $scope.errorDepart = data.errors.depart;
          $scope.errorReturn = data.errors.return;
        } else {
          $scope.message = data.message;
        }
      })
  }
});
// Controller function and passing $http service and $scope var.
app.controller('postUserController', function ($scope, $http) {
  // create a blank object to handle form data.
  $scope.user = {};
  // calling our submit function.
  $scope.submitForm = function () {
    // Posting data to php file
    $http({
      method: 'POST',
      url: 'post_user_data.php',
      data: $scope.user, //forms user object
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .success(function (data) {
        if (data.errors) {
          // Showing errors.
          $scope.errorFirstname = data.errors.firstname;
          $scope.errorLastname = data.errors.lastname;
          $scope.errorEmail = data.errors.email;
          $scope.errorUsername = data.errors.username;
          $scope.errorPassword = data.errors.password;
          $scope.errorUser = data.errors.user;
        } else {
          $scope.message = data.message;
        }
      });
  }
});