angular.module('app', []);

angular.module('app').controller('mainCtrl', function($scope) {

});

angular.module('app').directive('emperor', function() {
  return {
    scope: true,
    link: {
      pre: function($scope, el, attrs) {
        el.data('name', 'The Emperor');
        $scope.master = 'The Emperor';
      }
    }
  };
});

angular.module('app').directive('vader', function() {
  return {
    scope: true,
    link: {
      pre: function($scope, el, attrs) {
        el.data('name', 'Vader');
        el.data('master', $scope.master);
        console.log('Vader\'s master is ' + $scope.master);
        $scope.master = 'Vader';
      }
    }
  };
});

angular.module('app').directive('starkiller', function() {
  return {
    scope: true,
    link: {
      post: function($scope, el, attrs) {
        el.data('name', 'Starkiller');
        el.data('master', $scope.master);
        console.log('Starkiller\'s master is ' + $scope.master);
      }
    }
  };
})

















