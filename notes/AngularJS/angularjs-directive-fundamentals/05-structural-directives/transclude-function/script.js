// Code goes here

angular.module('app', []);

angular.module('app').controller('mainCtrl', function($scope) {
  $scope.items = [1,3,6,78]  
});

angular.module('app').directive('myTransclude', function() {
  return {
    restrict: 'A',
    transclude: 'element',
    link: function(scope, el, attr, ctrl, transclude) {
      transclude(scope, function(clone) {
        el.after(clone);
      })
    }
  }
})

