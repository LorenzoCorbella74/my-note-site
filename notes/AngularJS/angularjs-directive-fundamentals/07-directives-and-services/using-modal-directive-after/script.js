
angular.module('app', []);

angular.module('app').controller('mainCtrl', function($scope, users) {
  $scope.users = users;
   
});


angular.module('app').directive('modal', function($document) {
  return {
    scope: {
      modalOpen: '=open',
      options: '=',
      onClose: '&'
    },
    transclude: true,
    templateUrl: 'modal.html',
    controller: function($scope) {
      $scope.close = function() {
        $scope.modalOpen = false;
        $scope.onClose();
      }
    },
    link: function($scope, el, attrs) {
      var options = angular.extend({
        height: '250px',
        width: '500px',
        top: '20%',
        left: '30%'
      }, $scope.options);
      
      el.find('.modal-container').css({
        'left':options.left,
        'top':options.top,
        'height':options.height + 'px',
        'width':options.width + 'px'
      })
      
      var pageHeight = $document.height();
      var pageWidth = $document.width();
      el.find('.modal-blackout').css({
        'width': pageWidth + 'px',
        'height': pageHeight + 'px'
      })
    }
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
    controller: function() {
      this.collapsed = (this.initialCollapsed === 'true');
      this.knightMe = function(user) {
        this.showKnightModal = true;       
      }
      
      this.knightDialogDone = function(response) {
        this.showKnightModal = false;
        if(response) {
          this.user.rank = "Jedi Knight";
        }
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












