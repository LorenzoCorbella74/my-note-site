// Code goes here

angular.module('app', []);

angular.module('app').controller('mainCtrl', function($scope) {
  
});

angular.module('app').directive('swTabstrip', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    controller: function($scope) {
      $scope.panes = [];
      $scope.select = function(pane) {
        pane.selected = true;
        $scope.panes.forEach(function(curPane) {
          if(curPane !== pane) {
            curPane.selected = false;
          }
        })
      };
      
      this.addPane = function(pane) {
        $scope.panes.push(pane);
        if($scope.panes.length === 1) {
          pane.selected = true;
        }
      }
    },
    templateUrl: 'swTabstrip.html'
  }
});

angular.module('app').directive('swPane', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      title: '@'
    },
    require: '^swTabstrip',
    link: function(scope, el, attrs, tabstripCtrl) {
      tabstripCtrl.addPane(scope);
    },
    templateUrl: 'swPane.html'
  }
})






















