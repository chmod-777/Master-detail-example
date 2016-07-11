angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope, $http) {
  
  $scope.playlists = null;
  //$scope.selectedPlaylist = null;

  $http.get('https://api.github.com/users/chmod-777/repos')

    .then(function(response) {
      $scope.playlists = response.data;
      console.log("Logging data: " + $scope.playlists);
    }, function(error) {
      console.log("Error: " + error);
    });

})

.controller('PlaylistCtrl', function($http, $scope, $stateParams) {

  var url = 'https://api.github.com/repos/chmod-777/';

  $scope.repoName = $stateParams.repoName;

  $http.get(url + $scope.repoName).then(function(response) {
    $scope.playlist = response.data;
    console.log("Logging single playlist data: " + $scope.playlist);
  }, function(error) {
    console.log("Error on single playlist: " + error);
  })
});


