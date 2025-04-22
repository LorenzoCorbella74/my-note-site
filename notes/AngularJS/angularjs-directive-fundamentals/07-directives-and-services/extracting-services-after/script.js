// Code goes here

angular.module('app', []);

angular.module('app').controller('mainCtrl', function($scope) {
  $scope.user1 = {
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
    hasForce: true,
    yearsOfJediTraining: 4,
    master: 'Yoda',
    passedTrials: true,
    masterApproves: true
  }
  $scope.user2 = {
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
    ]
  }
  
});

angular.module('app').factory('jediPolicy', function($q) {
  return {
    advanceToKnight: function(candidate) {
      var promise = $q(function(resolve, reject) {
        if(candidate.hasForce && 
        (
          candidate.yearsOfJediTraining > 20 
          || candidate.isChosenOne 
          || (candidate.master === 'Yoda' && candidate.yearsOfJediTraining > 3)
        ) 
        && candidate.masterApproves 
        && candidate.passedTrials) {
          candidate.rank = 'Jedi Knight';  
          resolve(candidate);
        } else {
          reject(candidate);
        }
      });
      return promise;
    }
  }
})
 
angular.module('app').directive('userInfoCard', function(jediPolicy) {
  return {
    templateUrl: "userInfoCard.html",
    restrict: "E",
    scope: {
      user: '=', 
      initialCollapsed: '@collapsed'
    },
    controller: function($scope) {
      $scope.collapsed = ($scope.initialCollapsed === 'true');
      $scope.knightMe = function(user) {
        jediPolicy.advanceToKnight(user).then(null, function(user) {
          alert('Sorry, ' + user.name + ' is not ready to become a Jedi Knight');
        })
        
      }
      $scope.collapse = function() {
        $scope.collapsed = !$scope.collapsed;
      }
      
      $scope.removeFriend = function(friend) {
        var idx = $scope.user.friends.indexOf(friend);
        if(idx > -1) {
          $scope.user.friends.splice(idx, 1);
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












