[back](direttive.md)

## Direttive & Services

E' possibile avere dei service che svolgono della business logic per le directive, o per permettere a direttive di comunicare, ed in certi casi ciò che sta dentro una direttiva dovrebbe stare dentro un service!! _I controller non dovrebbero svolgere business logic, dovrebbe essere responsabilità dei servizi_.

Vediamo un esempio di come estrarre della logica di business da una direttiva e metterla dentro un service.

```js
angular.module("app", []);

angular.module("app").controller("mainCtrl", function ($scope) {
  $scope.user1 = {
    name: "Luke Skywalker",
    address: {
      street: "PO Box 123",
      city: "Secret Rebel Base",
      planet: "Yavin 4",
    },
    friends: ["Han", "Leia", "Chewbacca"],
    hasForce: true,
    yearsOfJediTraining: 4,
    master: "Yoda",
    passedTrials: true,
    masterApproves: true,
  };
  $scope.user2 = {
    name: "Han Solo",
    address: {
      street: "PO Box 123",
      city: "Mos Eisley",
      planet: "Tattoine",
    },
    friends: ["Han", "Leia", "Chewbacca"],
  };
});

angular.module("app").factory("jediPolicy", function ($q) {
  return {
    advanceToKnight: function (candidate) {
      var promise = $q(function (resolve, reject) {
        // $q permette di creare delle promise da angularjs 1.3
        if (
          candidate.hasForce &&
          (candidate.yearsOfJediTraining > 20 ||
            candidate.isChosenOne ||
            (candidate.master === "Yoda" &&
              candidate.yearsOfJediTraining > 3)) &&
          candidate.masterApproves &&
          candidate.passedTrials
        ) {
          candidate.rank = "Jedi Knight";
          resolve(candidate);
        } else {
          reject(candidate);
        }
      });
      return promise;
    },
  };
});

angular.module("app").directive("userInfoCard", function (jediPolicy) {
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
        // si chiama il service !!
        jediPolicy.advanceToKnight(user).then(null, function (user) {
          alert(
            "Sorry, " + user.name + " is not ready to become a Jedi Knight"
          );
        });
      };
      $scope.collapse = function () {
        $scope.collapsed = !$scope.collapsed;
      };

      $scope.removeFriend = function (friend) {
        var idx = $scope.user.friends.indexOf(friend);
        if (idx > -1) {
          $scope.user.friends.splice(idx, 1);
        }
      };
    },
  };
});
```

## Service per permettere a direttive di comunicare

E' possibile permettere la comunicazione tra direttive tramite un elemento contenitore.
[contenitore](communication.png)

Oppure invece di avere un elemento contenitore che lega + direttive si potrebbe usare un service, che condivide uno stato condiviso e semplifica le cose!.

Tutte le volte che si deve manipolare il DOM si deve usare una direttiva!!! Ma tutto ciò che riguarda la business logic deve essere implementato in un service!!!!
