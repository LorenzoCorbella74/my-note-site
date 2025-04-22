# Direttive

In AngularJS ci possono essere le seguenti tre tipologie di direttive:

- Components: di solito rappresentato come un custom-element -> devono usare l'isolated scope
- Decorator: aggiunge delle funzionalità aggiuntive ad un tag esistente o modifica la visualizzazione di tale tag (come può essere la direttiva ng-click, ng-show, ng-hide, etc) e sono di solito implementate come attributi che non hanno template. -> devono usare idealmente lo shared scope o l'inherited scope
- Structural/Templating che manipolano la struttura del DOM (come può essere ng-repeat)

Il consiglio generale è di prevedere sempre un prefix nel nome della direttiva per prevenire problemi in seguito.

```js
/** 
 *  Nel template si mette:
 * <body ng-controller="mainCtrl">
    <user-info-card></user-info-card>
  </body>
*/

angular.module("app", []);

angular.module("app").controller("mainCtrl", function ($scope) {
  $scope.user = {
    name: "Luke Skywalker",
    address: {
      street: "PO Box 123",
      city: "Secret Rebel Base",
    },
    friends: ["Han", "Leia", "Chewbacca"],
  };
});

angular.module("app").directive("userInfoCard", function () {
  return {
    // template: stringa del template
    templateUrl: "userInfoCard.html",
    restrict: "E", // restringe ad elemento html (E), per attributo (A), classi (C) o commenti (M), si può specificare formati multipli (EAC), di default è EA
    // replace: true, rimpiazza il custo element con il contenuto del template (senza un root element), deprecato da AJS 1.3

    // riceve lo $scope obj corrente e la logica è gestita internamente
    controller: function ($scope) {
      $scope.knightMe = function (user) {
        user.rank = "knight";
      };
    },
  };
});
```

Con i bindings nel template _userInfoCard.html_ che guardano allo scope corrente e l'uso di altre direttive:

```html
<div class="panel panel-primary">
  <div class="panel-heading">{{user.name}}</div>
  <div class="panel-body">
    <div ng-show="!!user.address">
      <h4>Address:</h4>
      {{user.address.street}} <br />
      {{user.address.city}}<br />
    </div>
    <br />

    <h4>Friends:</h4>
    <ul>
      <li ng-repeat="friend in user.friends">{{friend}}</li>
    </ul>
    <div ng-show="!!user.rank">Rank: {{user.rank}}</div>
    <button
      ng-show="!user.rank"
      class="btn btn-success"
      ng-click="knightMe(user)"
    >
      Knight Me
    </button>
  </div>
</div>
```

## Events, scope and controllers

Le direttive possono ereditare la logica del controller dell'elemento che le contiene, ma possono anche avere una logica "interna" che manipola lo scope corrente. Questo permette di incapsulare logica all'interno delle direttive/componenti.

Ci sono tre modalità di relazione tra "lo scope della direttiva" e "lo scope del controller contenitore":

- _Directive with Shared Scope_ - Di default si ha la condivisione dello scope tra direttiva e controller contenitore (_scope: false_ che è il default e non è messo).
- _Directive with Inherited Scope_ - La direttiva eredita lo scope dal contenitore ma può avere un suo stato privato. Si utilizza nell'oggetto di configurazione la proprietà _scope: true_ che permette di avere uno scope suo ma di poter accedere a quello del contenitore (tramite il $parent, anche se nel codice non si deve fare $scope.$parent ma si accede direttamente in quanto è normale ereditarietà di JS). Un esempio può essere un widget avente come input un oggetto user (ereditato dal contenitore) a cui si aggiunge un flag collapsed per collassare il box (stato privato che non interessa al contenitore)
- _Direttive con Scope isolato_: si crea impostando _scope: { user:'='}_ in cui si specifica degli input per poter passare delle informazioni dal controller contenitore alla direttiva

le direttive con scope isolato possono prendere i parametri in tre forme diverse:

1. Semplici valori (monodirezionali, valori "stringa") con @ = [ONE WAY BINDING]

```js
angular.module("app").directive("userInfoCard", function () {
  return {
    templateUrl: "userInfoCard.html",
    restrict: "E",
    scope: {
      user: "=",
      initialCollapsed: "@collapsed",
    },
    controller: function ($scope) {
      $scope.collapsed = $scope.initialCollapsed === "true"; // si riceve una stringa si deve usare un'altra variabile internamente...
      $scope.knightMe = function (user) {
        user.rank = "knight";
      };
      $scope.collapse = function () {
        $scope.collapsed = !$scope.collapsed;
      };
    },
  };
});
```

E nel template:

```html
<body ng-controller="mainCtrl" class="container" style="padding-top:30px">
  <user-info-card user="user1" collapsed="true"></user-info-card>
</body>
```

2. Oggetti: = [TWO WAY BINDING]

3. Funzioni

```js
angular.module("app").directive("userInfoCard", function () {
  return {
    templateUrl: "userInfoCard.html",
    restrict: "E",
    scope: {
      user: "=",
      initialCollapsed: "@collapsed",
    },
    controller: function ($scope) {
      $scope.collapsed = $scope.initialCollapsed === "true";
      $scope.knightMe = function (user) {
        user.rank = "knight";
      };
      $scope.collapse = function () {
        $scope.collapsed = !$scope.collapsed;
      };
      // funzione del contenitore che viene chiamata
      $scope.removeFriend = function (friend) {
        var idx = $scope.user.friends.indexOf(friend);
        if (idx > -1) {
          $scope.user.friends.splice(idx, 1);
        }
      };
    },
  };
});

angular.module("app").directive("removeFriend", function () {
  return {
    restrict: "E",
    templateUrl: "removeFriend.html",
    scope: {
      notifyParent: "&method",
    },
    controller: function ($scope) {
      $scope.removing = false;
      $scope.startRemove = function () {
        $scope.removing = true;
      };
      $scope.cancelRemove = function () {
        $scope.removing = false;
      };
      $scope.confirmRemove = function () {
        $scope.notifyParent();
        /**
         * Si può fare l'override dal figlio al padre del parametro mettendo $scope.notifyParent({friend:'Lore'})  !!!!!
         */
      };
    },
  };
});
```

Dentro _removeFried(friend)_ si passa l'user sempre dal componente contenitore. Quando dalla direttiva di chiama _method_ si chiama la funzione del contenitore (a cui si può eventualmente fare l'override dei parametri, basta chiamarlo con lo stesso nome indicato nel template).

```html
<div class="panel panel-primary">
  <div class="panel-heading" ng-click="collapse()">{{user.name}}</div>
  <div class="panel-body" ng-hide="collapsed">
    <address></address>
    <h4>Friends:</h4>
    <ul>
      <li ng-repeat="friend in user.friends">
        {{friend}}
        <remove-friend method="removeFriend(friend)"></remove-friend>
      </li>
    </ul>
    <div ng-show="!!user.rank">Rank: {{user.rank}}</div>
    <button
      ng-show="!user.rank"
      class="btn btn-success"
      ng-click="knightMe(user)"
    >
      Knight Me
    </button>
  </div>
</div>
```

Notare che AJS non permette a due direttive di chiedere per l'isolated scope sullo stesso elemento. Se + direttive sono presenti su uno stesso elemento con _scope:true_ (inherited) di fatto lavorano sullo stesso scope e possono tra loro esserci dei conflitti.

## Decorator directive

Tali direttive aggiungono funzionalità a tag esistente o modificano la visualizzazione di tale tag e sono di solito implementate come attributi che non hanno template.

Tramite la _link function_ si riceve tre parameti, lo scope, gli elementi su cui è presente la direttiva e un array di attributi su tali elementi. Se al posto di un oggetto di configurazione AJS ritorna una funzione, allora implicitamente si utilizzano i field al valore di default e la funzione è la link fn. Dentro la link fn si può usare jquery per facilitarsi le operazioni sul DOM, eventi, etc. _La logica dentro tale fn è e deve essere legata, a differenza di quella del ctrl, che è per manipolare un modello di dati, per manipolazione del dDOM, eventi, etx_.

```html
<!DOCTYPE html>
<html ng-app="app">

  <head>
    <link data-require="bootstrap-css@*" data-semver="3.2.0" rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" />
    <script data-require="jquery@*" data-semver="2.1.1" src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script data-require="angular.js@*" data-semver="1.3.0-beta.5" src="https://code.angularjs.org/1.3.0-beta.5/angular.js"></script>
    <link rel="stylesheet" href="style.css" />
    <script src="script.js"></script>
  </head>

  <body ng-controller="mainCtrl" class="container" style="padding-top: 30px">
    <video id="vid" spacebar-support controls preload="none" poster="http://media.w3.org/2010/05/sintel/poster.png">
      <source src="http://media.w3.org/2010/05/sintel/trailer.mp4" type="video/mp4"></source>
      <source src="http://media.w3.org/2010/05/sintel/trailer.webm5" type="video/webm"></source>
      <source src="http://media.w3.org/2010/05/sintel/trailer.ogv" type="video/ogg"></source>
    </video>
  </body>

</html>
```

```js
angular.module("app", []);

angular.module("app").controller("mainCtrl", function ($scope) {});

angular.module("app").directive("spacebarSupport", function () {
  return {
    restrict: "A",
    link: function (scope, el, attrs) {
      $("body").on("keypress", function (evt) {
        var vidEl = el[0];
        if (evt.keyCode === 32) {
          if (vidEl.paused) {
            vidEl.play();
          } else {
            vidEl.pause();
          }
        }
      });
    },
  };
});
```

Un altro esempio è far si che un evento che avviene internamente ad una direttiva sia considerato dal dygest-cycle di AJS tramite _$scope.$apply()_ (ad indicare che qualcosa è cambiato e scatenare quindi il dygest cycle):

```js
angular.module("app").directive("eventPause", function ($parse) {
  return {
    restrict: "A",
    link: function (scope, el, attrs) {
      var fn = $parse(attrs["eventPause"]);
      el.on("pause", function (event) {
        scope.$apply(function () {
          fn(scope, { evt: event });
        });
      });
    },
  };
});
```

Si ricrea ng-click. Nel template si usa:

```html
<body ng-controller="mainCtrl" my-click="clickHandler(data)">
  <h1>Hello Plunker!</h1>
  <h2>{{data.message}}</h2>
</body>
```

```js
angular.module("app", []);

angular.module("app").controller("mainCtrl", function ($scope) {
  $scope.data = { message: "I have not been clicked" };
  $scope.clickHandler = function (p) {
    p.message = "I have been clicked";
  };
});

angular.module("app").directive("myClick", function ($parse) {
  return {
    link: function (scope, el, attrs) {
      var fn = $parse(attrs["myClick"]); // tramite parse si riesce a risalire alla fn nello scope clickHandler(data)
      el.on("click", function () {
        scope.$apply(function () {
          fn(scope);
        });
      });
    },
  };
});
```

All'interno della _link fn_ si manipola il DOM stando in ascolto dei cambiamenti che possono avvenire nel ctrl della direttiva:

```html
<div class="panel panel-primary">
  <div class="panel-heading" ng-click="collapse()">{{user.name}}</div>
  <div class="panel-body" state-display="user.level">
    ...
    <button ng-click="nextState()" class="btn btn-info">Next State</button>
  </div>
</div>
```

```js
angular.module("app").directive("stateDisplay", function () {
  return {
    link: function (scope, el, attrs) {
      scope.$watch(attrs["stateDisplay"], function (newVal) {
        switch (newVal) {
          case 0:
            el.css("background-color", "white");
            break;
          case 1:
            el.css("background-color", "yellow");
            break;
          case 2:
            el.css("background-color", "red");
            break;
        }
      });
    },
  };
});

angular.module("app").directive("userInfoCard", function () {
  return {
    templateUrl: "userInfoCard.html",
    restrict: "E",
    scope: {
      user: "=",
    },
    controller: function ($scope) {
      $scope.nextState = function () {
        $scope.user.level++;
        $scope.user.level = $scope.user.level % 3;
      };
    },
  };
});
```

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

## [Transclusion](direttive_transclusion.md)

## [Structural Directives](direttive_structural.md)

# Links

- [corso](https://github.com/joeeames/AngularJSDirectivesFundamentals/wiki)
