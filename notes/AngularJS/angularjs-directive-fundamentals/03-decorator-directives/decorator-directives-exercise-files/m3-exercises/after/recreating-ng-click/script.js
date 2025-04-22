// Code goes here

angular.module('app', []);

angular.module('app').controller('mainCtrl', function($scope) {
  $scope.data = {message:"I have not been clicked"};
  $scope.clickHandler = function(p) {
    p.message = "I have been clicked";
  }
});

angular.module('app').directive('myClick', function($parse) {
  return {
    link: function(scope, el, attrs) {
      var fn = $parse(attrs['myClick']);
      el.on('click', function() {
        scope.$apply(function() {
          fn(scope);
        })
      })
    }
  }
})

