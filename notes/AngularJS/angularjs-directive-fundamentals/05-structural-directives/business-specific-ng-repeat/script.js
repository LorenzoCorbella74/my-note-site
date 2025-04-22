// Code goes here

angular.module('app', []);

angular.module('app').controller('mainCtrl', function($scope) {
  $scope.bountyHunters = [{
    name: 'Boba Fett', age: 35
  }, {
    name: 'IG-88', age: 130
  }, {
    name: 'Dengar', age: 42
  }, {
    name: 'Bossk', age: 782
  }, {
    name: 'Cad Bane', age: 51
  }]
  
  $scope.add = function() {
    $scope.bountyHunters.push({name: '4LOM'});
  }
  $scope.remove = function() {
    $scope.bountyHunters.length--;
  }
});

angular.module('app').directive('userList', function($compile) {
  return {
    restrict: 'A',
    transclude: 'element',
    link: function(scope, el, attr, ctrl, transclude) {
      var pieces = attr.userList.split(' ');
      var itemString = pieces[0];
      var collectionName = pieces[2];
      var elements = [];
      
      scope.$watchCollection(collectionName, function(collection) {
        if(elements.length > 0) {
          for(var i=0; i < elements.length; i++) {
            elements[i].el.remove();
            elements[i].scope.$destroy();
          }
          elements = [];
        }
        
        for(var i=0; i < collection.length; i++) {
          var childScope = scope.$new();
          childScope[itemString] = collection[i];
          transclude(childScope, function(clone) {
            var template = $compile('<div class="panel panel-primary" ><div class="panel-heading">{{' + itemString + '.name}}</div><div class="panel-body" /></div>');
            var wrapper = template(childScope);
            wrapper.find(".panel-body").append(clone);
            
            el.before(wrapper);
            var item = {};
            item.el = wrapper;
            item.scope = childScope;
            elements.push(item);
          })
        }
      })
    }
  }
})






















