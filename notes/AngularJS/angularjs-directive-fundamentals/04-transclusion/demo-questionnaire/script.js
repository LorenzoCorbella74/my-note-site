// Code goes here

angular.module('app', []);

angular.module('app').controller('mainCtrl', function($scope) {
  $scope.answers = {baseLocation:"Yavin 4"}
});

angular.module('app').directive('myQuestion', function() {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'myQuestion.html',
    scope: {
      questionText: '@q'
    }
  }
})
