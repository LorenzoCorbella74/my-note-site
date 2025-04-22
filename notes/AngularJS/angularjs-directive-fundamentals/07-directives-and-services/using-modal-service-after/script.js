
angular.module('app', ['ui.bootstrap']);

angular.module('app').controller('mainCtrl', function($scope, users) {
  $scope.users = users;
   
});

angular.module('app').controller('knightConfirmationCtrl', function($scope, $modalInstance, user) {
  $scope.user = user;
  
  $scope.yes = function() {
    $modalInstance.close(true);
  }
  
  $scope.no = function() {
    $modalInstance.close(false);
  }
})

angular.module('app').directive('userInfoCard', function(users) {
  return {
    templateUrl: "userInfoCard.html",
    restrict: "E",
    scope: {
      user: '=',
      initialCollapsed: '@collapsed'
    },
    controllerAs: 'vm',
    bindToController: true,
    controller: function($modal) {
      var that = this;
      this.collapsed = (this.initialCollapsed === 'true');
      this.knightMe = function(user) {
        var modalInstance = $modal.open({
          templateUrl: 'knightConfirmation.html',
          controller: 'knightConfirmationCtrl',
          resolve: {
            user: function() {
              return that.user;
            }
          }
        })
        
        modalInstance.result.then(function(answer) {
          if(answer) {
            that.user.rank = "Jedi Knight";
          }
        })
      }
      
      this.collapse = function() {
        this.collapsed = !this.collapsed;
      }
      
      this.removeFriend = function(friend) {
        var that = this;
      
        var idx = this.user.likes.indexOf(friend);
        if(idx > -1) {
          this.user.likes.splice(idx, 1);
          users.forEach(function(user) {
            if(user.id === friend.id) {
              var foundLike;
              user.likedBy.forEach(function(like) {
                if(like.id === that.user.id) {
                  foundLike = like;
                  return false;
                }
              });
              var likedByIdx = user.likedBy.indexOf(foundLike);
              if(likedByIdx > -1) {
                user.likedBy.splice(likedByIdx, 1);
              }
              return false;
            }
          })
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












