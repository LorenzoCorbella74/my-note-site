[back](direttive.md)

## Controllers and nested directives

I controller sono delle funzioni che possono essere portati fuori dall'obj di configurazione (magari in altro file, anche se si deve stare attendi alla minificazione...) specificando il nome.

Mettendo la sintassi _controllerAs: 'vm'_ si deve sostituire tutti i binding nel template con il prefix _vm_.

```html
<div class="panel panel-primary">
  <div class="panel-heading" ng-click="vm.collapse()">{{vm.user.name}}</div>
  <div class="panel-body" ng-hide="vm.collapsed">
    <address></address>

    <h4>Friends:</h4>
    <ul>
      <li ng-repeat="friend in vm.user.friends">
        {{friend}}
        <remove-friend method="vm.removeFriend(friend)"></remove-friend>
      </li>
    </ul>
    <div ng-show="!!vm.user.rank">Rank: {{vm.user.rank}}</div>
    <button
      ng-show="!vm.user.rank"
      class="btn btn-success"
      ng-click="vm.knightMe(vm.user)"
    >
      Knight Me
    </button>
  </div>
</div>
```

Mentre nella direttiva si toglie lo _$scope_ e si mette il _this_ in quanto si è specificato _bindToController:true_ .
AngularJS ha introdotto la proprietà _bindToController_ nell'oggeto di configurazione delle direttive che permette alle proprietà ereditate di essere legate al controller senza lo $scope object. Quando un controller è istanziato i valori iniziali dell'isolated scope bindings sono disponibili su _this_ e cambiamenti futuri sono automaticamente disponibili.

```js
angular.module("app").directive("userInfoCard", function () {
  return {
    templateUrl: "userInfoCard.html",
    restrict: "E",
    scope: {
      user: "=",
      initialCollapsed: "@collapsed",
    },
    controllerAs: "vm",
    bindToController: true,
    controller: function ($scope) {
      // con controllerAs angular fa questo
      // $scope.vm = this;
      this.collapsed = this.initialCollapsed === "true";
      this.knightMe = function (user) {
        user.rank = "knight";
      };
      this.collapse = function () {
        this.collapsed = !this.collapsed;
      };

      this.removeFriend = function (friend) {
        var idx = this.user.friends.indexOf(friend);
        if (idx > -1) {
          this.user.friends.splice(idx, 1);
        }
      };
    },
  };
});
```

## PreLink e PostLink

Quando si hanno direttive innestate come nel caso:

```html
<body ng-controller="mainCtrl" class="container" style="padding-top:30px">
  <h1>Master & Apprentice</h1>
  <emperor>
    <vader>
      <starkiller></starkiller>
    </vader>
  </emperor>
</body>
```

La link fn in realtà può essere una _postLink_ fn o una _preLink_ fn. Con componenti innestati viene prima eseguita la postLink del componente nipote-> portLink figlio -> portLink padre mentre nella preLink viene eseguita prima sul padre-> preLink figlio -> preLink nipote. Per permettere il passaggio di dati (inherited scope) da un padre ad un nipote si deve stare attenti all'ordine oppure per permettere alle direttive innestate di comunicare tra loro si richiede il ctrl di un'altra direttiva.

```js
angular.module("app").directive("emperor", function () {
  return {
    scope: true,
    link: {
      pre: function ($scope, el, attrs) {
        el.data("name", "The Emperor");
        $scope.master = "The Emperor";
      },
    },
  };
});

angular.module("app").directive("vader", function () {
  return {
    scope: true,
    link: {
      pre: function ($scope, el, attrs) {
        el.data("name", "Vader");
        el.data("master", $scope.master);
        console.log("Vader's master is " + $scope.master);
        $scope.master = "Vader";
      },
    },
  };
});

angular.module("app").directive("starkiller", function () {
  return {
    scope: true,
    link: {
      post: function ($scope, el, attrs) {
        el.data("name", "Starkiller");
        el.data("master", $scope.master);
        console.log("Starkiller's master is " + $scope.master);
      },
    },
  };
});
```

Qua si richiede il controller delle altre direttive tramite il campo _require_:

```js
angular.module("app").directive("emperor", function () {
  var name = "The Emperor";
  return {
    scope: true,
    controller: function ($scope) {
      this.name = name;
    },
    link: function ($scope, el, attrs) {
      el.data("name", name);
    },
  };
});

angular.module("app").directive("vader", function () {
  var name = "Vader";
  return {
    scope: true,
    require: "^emperor", // a salire ^, altrimenti se non ci fosse dovrebbe stare sullo stesso nodo.
    controller: function ($scope) {
      this.name = name; // da notare che non è attaccato allo $scope ma direttiamente al controller
    },
    link: function ($scope, el, attrs, emperorCtrl) {
      el.data("name", name);
      el.data("master", emperorCtrl.name);
      console.log("Vader's master is " + emperorCtrl.name);
    },
  };
});

angular.module("app").directive("starkiller", function () {
  return {
    scope: true,
    require: "?^^vader",
    link: function ($scope, el, attrs, vaderCtrl) {
      el.data("name", "Starkiller");
      if (!!vaderCtrl) {
        el.data("master", vaderCtrl.name);
        console.log("Starkiller's master is " + vaderCtrl.name);
      } else {
        console.log("Starkiller doesn't have a master");
      }
    },
  };
});
```

E' possibile richiedere anche + di un controller tramite la seguente sintassi:

```js
angular.module('app').directive('starkiller', function() {
  return {
    scope: true,
    require: ['^vader', '^emperor'],
    link: function($scope, el, attrs, ctrls) {
      el.data('name', 'Starkiller');
      if(ctrls[0]) {
        el.data('master', ctrls[0].name);
        console.log('Starkiller\'s master is ' + ctrls[0].name);
        console.log('Starkiller\'s master\'s master is ' + ctrls[1].name);
      } else {
        console.log('Starkiller doesn\'t have a master')
      }
    }
  };
}
```

Un esempio di comunicazione tra direttive innestate può essere il caso dei tabs

```html
<body ng-controller="mainCtrl" class="container" style="padding-top:30px">
  <sw-tabstrip>
    <sw-pane title="Bounty Hunters">
      <h4>We don't need that scum</h4>
    </sw-pane>
    <sw-pane title="Death Star">
      <h4>That's no moon...</h4>
    </sw-pane>
    <sw-pane title="I love you">
      <h4>I know</h4>
    </sw-pane>
  </sw-tabstrip>
</body>
```

Il componente padre ha il template:

```html
<div>
  <ul class="nav nav-tabs">
    <li ng-repeat="pane in panes" ng-class="{active:pane.selected}">
      <a href="" ng-click="select(pane)">{{pane.title}}</a>
    </li>
  </ul>
  <div class="tab-content" ng-transclude></div>
</div>
```

Il componente figlio ha il template:

```html
<div class="tab-pane" ng-show="selected" ng-transclude></div>
```

I due componenti interaragiscono in quanto i figli si attaccano al ctrl del padre

```js
angular.module("app").directive("swTabstrip", function () {
  return {
    restrict: "E",
    transclude: true,
    scope: {},
    controller: function ($scope) {
      $scope.panes = [];
      $scope.select = function (pane) {
        pane.selected = true;
        $scope.panes.forEach(function (curPane) {
          if (curPane !== pane) {
            curPane.selected = false;
          }
        });
      };
      // non è attaccato allo $scope ma direttamente al controller !!!!!!!
      this.addPane = function (pane) {
        // si passa lo scope del figlio!!
        $scope.panes.push(pane);
        if ($scope.panes.length === 1) {
          pane.selected = true;
        }
      };
    },
    templateUrl: "swTabstrip.html",
  };
});

angular.module("app").directive("swPane", function () {
  return {
    restrict: "E",
    transclude: true,
    scope: {
      title: "@",
    },
    require: "^swTabstrip",
    link: function (scope, el, attrs, tabstripCtrl) {
      tabstripCtrl.addPane(scope); // si chiama l'API del padre!!
    },
    templateUrl: "swPane.html",
  };
});
```
