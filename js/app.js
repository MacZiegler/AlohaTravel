var app = angular.module('alohaApp', []);
app.controller('journeyController', function ($scope, $http) {

  // function journeyController($scope, $http) {

  $http.get('js/data.json').then(function (response) {

    $scope.places = response.data;
  });

  $scope.selectedplace = {
    "shortname": "Anywhere",
    "longname": "Your vacation awaits...",
    "filename": "destunknown.jpg",
    "activities": "",
    "choices": []
  };

  $scope.user = {
    "firstname": "",
    "lastname": "",
    "email": "",
    "username": "",
    "password": ""
  };

  var firstplace = angular.copy($scope.selectedplace);
  var firstperson = angular.copy($scope.user);

  $scope.resetForm = function () {
    $scope.selectedplace = angular.copy(firstplace);
    $scope.placeform.$setPristine();
  };

  $scope.resetInfo = function () {
    $scope.user = angular.copy(firstperson);
    $scope.userform.$setPristine();
  };

  $scope.isPlaceChanged = function () {
    return !angular.equals($scope.selectedplace, firstplace);
  };

  $scope.isPersonChanged = function () {
    return !angular.equals($scope.user, firstperson);
  };

  $scope.processinput = function () {
    $http({
      method: 'POST',
      url: 'post_reserve_data.php',
      // data: $.param($scope.selectedplace),  // use jquery to pass in data as strings
      data: $scope.selectedplace,  // pass in data as object
      // headers: { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
    })
      .then(function successCallback(response) {
        // console.log(response);
        $scope.message = response.data;

      }, function errorCallback(response) {
        $scope.errorShortname = response.errors.shortname;
        $scope.errorAdults = response.errors.adults;
        $scope.errorChildren = response.errors.children;
        $scope.errorDepart = response.errors.depart;
        $scope.errorReturn = response.errors.return;
        $scope.message = response.data;
      });

  };

  $scope.processuser = function () {
    $http({
      method: 'POST',
      url: 'post_user_data.php',
      data: $scope.selectedplace,  // pass in data as object
    })
      .then(function successCallback(response) {
        // console.log(response);
        $scope.user = response.data;

      }, function errorCallback(response) {
        $scope.errorFirstname = response.errors.firstname;
        $scope.errorLastname = response.errors.lastname;
        $scope.errorEmail = response.errors.email;
        $scope.errorUsername = response.errors.username;
        $scope.errorPassword = response.errors.password;
        $scope.message = response.data;
      });

  };

});