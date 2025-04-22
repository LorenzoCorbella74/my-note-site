// Code goes here

angular.module('app', []);

angular.module('app').controller('mainCtrl', function($scope) {
  $scope.items = [2,5,23,253];  
});

angular.module('app').directive('myLazyRender', function() {
  return {
    restrict: 'A',
    transclude: 'element',
    priority: 900,
    link: function(scope, el, attr, ctrl, transclude) {
      var hasBeenShown = false;
      var unwatchFn = scope.$watch(attr.myLazyRender, function(value) {
        if(value && !hasBeenShown) {
          hasBeenShown = true;
          transclude(scope, function(clone) {
            el.after(clone);
          });
          unwatchFn();
        }
      })
    }
  }
})

angular.module('app').directive('echo', function() {
  return {
    priority: 1300,
    link: function() {
      console.log('echo');
    }
  }
})
