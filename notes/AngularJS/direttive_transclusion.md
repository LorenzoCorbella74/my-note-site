[back](direttive.md)

## Transclusion

Si definisce un componente displayBox avente nel template un div placeholder con la direttiva _ng-transclude_ e una proprietà _transclude:true_ nell'oggetto di configurazione:

```html
<div class="well" style="width:350px" ng-hide="hidden">
  <div style="float:right;margin-top:-15px">
    <i
      class="glyphicon glyphicon-remove"
      ng-click="close()"
      style="cursor:pointer"
    ></i>
  </div>
  <div ng-transclude></div>
</div>
```

```js
angular.module("app", []);

angular.module("app").controller("mainCtrl", function ($scope) {
  $scope.message = "This is a message";
});

angular.module("app").directive("displayBox", function () {
  return {
    restrict: "E",
    templateUrl: "displayBox.html",
    controller: function ($scope) {
      $scope.hidden = false;
      $scope.close = function () {
        $scope.hidden = true;
      };
    },
    transclude: true,
  };
});
```

Se impostiamo l'ereditarietà dello scope tramite _scope:true_ non è più possibile fare l'override dello scope del contenitore (nel caso di variabili primitive). Ciò che sta dentro i tag NON eredita lo scope del contenitore ma eredita lo scope del tag che racchiude tale parte ed ha un suo scope in modo da non dare conflitti con lo scope del contenitore. Ciò che sta all'interno dovrebbe aver per lo meno un inherited scope (_quando faccio l'override di un valore nel modello del contenitore questo non viene aggiornato nel contenitore!!! a meno che non sia un oggetto!!!!_ ) (meglio sarebbe un isolated scope).

Uno dei benefici della transclusion è quello di riutilizzare l'HTML. Invece di avere più componenti che hanno logiche molto simili si può avere un componente generico che nella parte della transclusion (tra i tag) ha la parte di differenziazione.

Notare che se abbiamo definito un input in One Way allora si deve specificare l'interpolazione altrimenti se invece abbiamo in input un Two way binding allora si passa come nome: \<my-component name="{{input.name}}" level="data.level"></my-component>

In index.html si

```html
<body ng-controller="mainCtrl" class="container" style="padding-top:30px">
  <person-info-card person="person1" collapsed="true"></person-info-card>
  <person-info-card person="person2"></person-info-card>
  <droid-info-card droid="droid1"></droid-info-card>
</body>
```

userPanel.html

```html
<div class="panel panel-primary">
  <div class="panel-heading" ng-click="collapse()">
    <span state-display="level user-ok user-warning user-problem user-error"
      >{{name}}</span
    >
    <button
      class="btn btn-xs btn-info"
      ng-click="nextState($event)"
      style="float:right"
    >
      Next State
    </button>
  </div>
  <div class="panel-body" ng-hide="collapsed" ng-transclude></div>
</div>
```

droidInfo.html usa userPanel

```html
<user-panel
  name="{{droid.name}}"
  collapsed="{{initialCollapsed}}"
  level="droid.level"
>
  <h4>Specifications:</h4>
  {{droid.specifications.manufacturer}} - {{droid.specifications.type}} -
  {{droid.specifications.productLine}}<br />
</user-panel>
```

personInfo.html usa userPanel

```html
<user-panel
  name="{{person.name}}"
  collapsed="{{initialCollapsed}}"
  level="person.level"
>
  <address></address>

  <h4>Friends:</h4>
  <ul>
    <li ng-repeat="friend in person.friends">
      {{friend}}
      <remove-friend method="removeFriend(friend)"></remove-friend>
    </li>
  </ul>
  <div ng-show="!!person.rank">Rank: {{person.rank}}</div>
  <button
    ng-show="!person.rank"
    class="btn btn-success"
    ng-click="knightMe(person)"
  >
    Knight Me
  </button>
</user-panel>
```

```js
// componente che tiene la logica condivisa
angular.module("app").directive("userPanel", function () {
  return {
    restrict: "E",
    transclude: true,
    templateUrl: "userPanel.html",
    scope: {
      name: "@",
      level: "=",
      initialCollapsed: "@collapsed",
    },
    controller: function ($scope) {
      $scope.collapsed = $scope.initialCollapsed === "true";
      $scope.nextState = function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        $scope.level++;
        $scope.level = $scope.level % 4;
      };
      $scope.collapse = function () {
        $scope.collapsed = !$scope.collapsed;
      };
    },
  };
});

angular.module("app").directive("droidInfoCard", function () {
  return {
    templateUrl: "droidInfoCard.html",
    restrict: "E",
    scope: {
      droid: "=",
      initialCollapsed: "@collapsed",
    },
    controller: function ($scope) {},
  };
});

angular.module("app").directive("personInfoCard", function () {
  return {
    templateUrl: "personInfoCard.html",
    restrict: "E",
    scope: {
      person: "=",
      initialCollapsed: "@collapsed",
    },
    controller: function ($scope) {
      $scope.knightMe = function (person) {
        person.rank = "knight";
      };

      $scope.removeFriend = function (friend) {
        var idx = $scope.person.friends.indexOf(friend);
        if (idx > -1) {
          $scope.person.friends.splice(idx, 1);
        }
      };
    },
  };
});
```

## Transcluded function

E' una funzione che permette di decidere quando e dove una parte transclusa di html sarà inclusa nel DOM. Questa permette alle structural directive di fare la propria magia. La priorità delle direttive strutturali è 1000.

```html
<body ng-controller="mainCtrl">
  <h1>Hello Plunker!</h1>
  <div my-lazy-render="showit" echo ng-repeat="item in items">{{item}}</div>

  <button class="btn btn-primary" ng-click="showit = true">
    Render Content
  </button>
</body>
```

```js
angular.module("app", []);

angular.module("app").controller("mainCtrl", function ($scope) {
  $scope.items = [2, 5, 23, 253];
});

angular.module("app").directive("myLazyRender", function () {
  return {
    restrict: "A",
    transclude: "element" /* ELEMENT !!!!!!! */,
    priority: 900,
    link: function (scope, el, attr, ctrl, transclude) {
      var hasBeenShown = false;
      var unwatchFn = scope.$watch(attr.myLazyRender, function (value) {
        if (value && !hasBeenShown) {
          hasBeenShown = true;
          transclude(scope, function (clone) {
            // clone del DOM NODE che è stato transcluded
            el.after(clone);
          });
          unwatchFn();
        }
      });
    },
  };
});
```
