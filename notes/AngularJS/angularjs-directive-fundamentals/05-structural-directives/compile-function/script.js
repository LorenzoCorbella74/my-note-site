// Code goes here

angular.module('app', []);

angular.module('app').controller('mainCtrl', function($scope) {
  
});

angular.module('app').directive('simpleDirective', function() {
  return {
    // controller etc..
    compile: function(el, attrs) {
      // do some work
      return function(scope, el, attrs, ctrl, transclude) {
        // implementation
      }
    }
  }
})
