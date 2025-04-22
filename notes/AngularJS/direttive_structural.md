[back](direttive.md)

## Structural Directives

Sono delle direttive che modificano la struttura generale HTML come ng-repeat, ng-if, ng-switch.

Esempio di ng-repeat CUSTOM !.

```html
<body ng-controller="mainCtrl" class="container">
  <h1 class="well">Bounty Hunters</h1>
  <div user-list="hunter in bountyHunters">
    <span>Age: {{hunter.age}}</span>
  </div>
  <hr />
  <button class="btn btn-primary" ng-click="add()">Add</button>
  <button class="btn btn-primary" ng-click="remove()">Remove</button>
</body>
```

```js
// Code goes here

angular.module("app", []);

angular.module("app").controller("mainCtrl", function ($scope) {
  $scope.bountyHunters = [
    {
      name: "Boba Fett",
      age: 35,
    },
    {
      name: "IG-88",
      age: 130,
    },
    {
      name: "Dengar",
      age: 42,
    },
    {
      name: "Bossk",
      age: 782,
    },
    {
      name: "Cad Bane",
      age: 51,
    },
  ];

  $scope.add = function () {
    $scope.bountyHunters.push({ name: "4LOM" });
  };
  $scope.remove = function () {
    $scope.bountyHunters.length--;
  };
});

angular.module("app").directive("userList", function ($compile) {
  return {
    restrict: "A",
    transclude: "element" /* si usa la transclude fn !!!*/,
    link: function (scope, el, attr, ctrl, transclude) {
      var pieces = attr.userList.split(" "); // hunter in bountyHunters
      var itemString = pieces[0]; // hunter
      var collectionName = pieces[2]; // bountyHunters
      var elements = [];

      // si sta in ascolto dei cambiamenti
      scope.$watchCollection(collectionName, function (collection) {
        // all'inizio si cancellano tutti gli elementi e gli scope creati in precedenza
        if (elements.length > 0) {
          for (var i = 0; i < elements.length; i++) {
            elements[i].el.remove(); // rimuove l'elemento
            elements[i].scope.$destroy(); // rimuove lo scope relativo
          }
          elements = [];
        }

        for (var i = 0; i < collection.length; i++) {
          // si crea un nuovo scope
          var childScope = scope.$new();
          childScope[itemString] = collection[i];
          transclude(childScope, function (clone) {
            // si compila il template (visto che ha i bindings si usa $compile altrimenti si poteva usare angular.element)
            var template = $compile(
              '<div class="panel panel-primary" ><div class="panel-heading">{{' +
                itemString +
                '.name}}</div><div class="panel-body" /></div>'
            );
            // si associa il template allo scope
            var wrapper = template(childScope);
            wrapper.find(".panel-body").append(clone); // si mette in un punto preciso

            // traccia gli element (per poter essere cancellati in seguito)
            el.before(wrapper);
            var item = {};
            item.el = wrapper;
            item.scope = childScope;
            elements.push(item);
          });
        }
      });
    },
  };
});
```

## The compile function

Nella maggior parte dei casi non serve. Prima di AJS 1.3 aveva dentro la Transclude fn e per quello si usava, ora è dentro la link fn quindi è usata di rado. E' utilizzata per fare delle manipolazioni prima di far girare la link fn.
