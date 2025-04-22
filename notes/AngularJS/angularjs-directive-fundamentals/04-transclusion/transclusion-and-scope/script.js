// Code goes here

angular.module('app', []);

angular.module('app').controller('mainCtrl', function($scope) {
  $scope.message = "This is a message";
  console.log('controller', $scope);
});

angular.module('app').controller('innerCtrl', function($scope) {
  console.log('inner controller', $scope);
})

angular.module('app').directive('displayBox', function() {
  return {
    restrict: 'E',
    templateUrl: 'displayBox.html',
    controller: function($scope) {
      $scope.hidden = false;
      $scope.close = function() {
        $scope.hidden = true;
      }
      $scope.message = "I'm hijacking you";
      console.log('directive', $scope);
    },
    transclude: true,
    scope: true
  }
})
