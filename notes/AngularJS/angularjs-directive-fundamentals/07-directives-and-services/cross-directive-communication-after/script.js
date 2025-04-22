angular.module('app', []);

angular.module('app').controller('mainCtrl', function($scope) {
  $scope.users = [
    {name: 'Luke', planet: 'Tatooine', job: 'Jedi'  },
    {name: 'Han', planet: 'Nowhere', job: 'Jedi'  },
    {name: 'Chewbacca', planet: 'Kashyyyk', job: 'CoPilot'  }
  ]
  
  
});

angular.module('app').factory('userListState', function() {
  return {
    selectedUser: null
  }
})

angular.module('app').directive('masterUsers', function(userListState) {
  return {
    scope: {
      users: '=data'
    },
    templateUrl: 'masterUsers.html',
    controller: function($scope) {
      $scope.state = userListState;
      userListState.selectedUser = $scope.users[0];
    }
  } 
});

angular.module('app').directive('detailUsers', function(userListState) {
  return {
    scope: {
      users: '=data'
    },
    templateUrl: 'detailUsers.html',
    controller: function($scope) {
      $scope.state = userListState;
    }
  }
});