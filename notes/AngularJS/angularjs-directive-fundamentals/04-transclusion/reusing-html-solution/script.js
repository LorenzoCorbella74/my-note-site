// Code goes here

angular.module('app', []);

angular.module('app').controller('mainCtrl', function($scope) {
  $scope.person1 = {
    name: 'Luke Skywalker',
    address: {
      street: 'PO Box 123',
      city: 'Secret Rebel Base',
      planet: 'Yavin 4'
    },
    friends: [
      'Han',
      'Leia',
      'Chewbacca'
    ],
    level: 0
  }
  $scope.person2 = {
    name: 'Han Solo',
    address: {
      street: 'PO Box 123',
      city: 'Mos Eisley',
      planet: 'Tattoine'
    },
    friends: [
      'Han',
      'Leia',
      'Chewbacca'
    ],
    level: 1
  }
  $scope.droid1 = {
    name: 'R2-D2',
    specifications: {
      manufacturer: 'Industrial Automaton',
      type: 'Astromech',
      productLine: 'R2 series'
    },
    level: 1
    // owners...etc
  }
  
});

angular.module('app').directive('stateDisplay', function() {
  return {
    link: function(scope, el, attrs) {
      var parms = attrs['stateDisplay'].split(' ');
      var linkVar = parms[0];
      var classes = parms.slice(1);
      
      scope.$watch(linkVar, function(newVal) {
        el.removeClass(classes.join(' '));
        el.addClass(classes[newVal]);
      });
    }
  }
});

angular.module('app').directive('userPanel', function() {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'userPanel.html',
    scope: {
      name: '@',
      level: '=',
      initialCollapsed: '@collapsed'
    },
    controller: function($scope) {
      $scope.collapsed = ($scope.initialCollapsed === 'true');
      $scope.nextState = function(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        $scope.level++;
        $scope.level = $scope.level % 4;
      }
      $scope.collapse = function() {
        $scope.collapsed = !$scope.collapsed;
      }
    }
  }
})


angular.module('app').directive('droidInfoCard', function() {
  return {
    templateUrl: "droidInfoCard.html",
    restrict: "E",
    scope: {
      droid: '=',
      initialCollapsed: '@collapsed'
    },
    controller: function($scope) {
      
    }
  }
});

angular.module('app').directive('personInfoCard', function() {
  return {
    templateUrl: "personInfoCard.html",
    restrict: "E",
    scope: {
      person: '=',
      initialCollapsed: '@collapsed'
    },
    controller: function($scope) {
      $scope.knightMe = function(person) {
        person.rank = "knight";
      }
      
      $scope.removeFriend = function(friend) {
        var idx = $scope.person.friends.indexOf(friend);
        if(idx > -1) {
          $scope.person.friends.splice(idx, 1);
        }
      }
    }
  }
});

angular.module('app').directive('removeFriend', function() {
  return {
    restrict: 'E',
    templateUrl: 'removeFriend.html',
    scope: {
      notifyParent: '&method'
    },
    controller: function($scope) {
      $scope.removing = false;
      $scope.startRemove = function() {
        $scope.removing = true;
      }
      $scope.cancelRemove = function() {
        $scope.removing = false;
      }
      $scope.confirmRemove = function() {
        $scope.notifyParent();
      }
      
    }
  }
})

angular.module('app').directive('address', function() {
  return {
    restrict: 'E',
    scope: true,
    templateUrl: 'address.html',
    controller: function($scope) {
      $scope.collapsed = false;
      $scope.collapseAddress = function() {
        $scope.collapsed = true;
      }
      $scope.expandAddress = function() {
        $scope.collapsed = false;
      }
    }
  }
})












