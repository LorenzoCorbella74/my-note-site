# BIND CALL APPLY

```Javascript
// SOURCE: https://blog.kevinchisholm.com/javascript/difference-between-scope-and-context/
// SOURCE: http://ryanmorr.com/understanding-scope-and-context-in-javascript/


/* -------------------------------------------------------------------------------------- */

var person = {
  firstName: "Lorenzo",
  lastName: "Corbella",
  getFullName: function () {
    return this.firstName + " " + this.lastName;
  }
};

var person2 = {
 contact: "33434333",
  getContact: function () {
    return this.contact;
  }
};

var logName = function (lang1, lang2) {
  console.log(" I speak ", lang1, lang2);
  console.log('Logged: ', this.getFullName());
  
}

// ESEMPIO BIND (ci leghiamo ad uno specifico oggetto,passando poi i parametri)
// .bind(), unlike .apply() and .call(), returns a function instead of a value.
// .bind() sets the value of this and changes the function to a new function, but it doesn’t invoke the function.
var log1 = logName.bind(person);
log1("test","uno");  

var log3 = logName.bind(person,"test","due");   // i parametri non si devono mettere qua
log1();                                         // ma quacome sopra
  
//var log2 = logName.bind(person2);
//log2();  andrebbe in errore perchè l'obj non ha la funzione getFullName

// Esempio CALL
logName.call(person, 'en', 'es');

// ESEMPIO APPLY
logName.apply(person, ['fi', 'sco']);

/* -------------------------------------------------------------------------------------- */

// SOURCE: http://krasimirtsonev.com/blog/article/JavaScript-bind-function-setting-a-scope
// It’s important to bear in mind that once bind() sets a chosen ‘this’ value, it’s immutable. 
// That is, a function returned from bind() can never again be bound to a different ‘this’ value. Functions can only be bound once. 
var getUserComments = function(callback) {
    // perform asynch operation like ajax call
    var numOfCommets = 34;
    callback({ comments: numOfCommets });
};
var User = {
    fullName: 'John Black',
    print: function() {
        getUserComments(function(data) {
           // qua this è window perchè getUserComments è una funzione glocabale
           // in a callback invoked by an enclosing function, the ‘this’ context changes. 
           // The value ‘this’ holds is reassigned to the function that is calling the function 
            console.log(this.fullName + ' made ' + data.comments + ' comments');
        });
    }
};
User.print(); // undefined made 34 comments

var User2 = {
    fullName: 'John Black',
    print: function() {
        getUserComments(function(data) {
            console.log(this.fullName + ' made ' + data.comments + ' comments');
        }.bind(this));
    }
};
User2.print();

/* -------------------------------------------------------------------------------------- */

// SOURCE: https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback

function Person(name){

    this.name = name

    this.sayNameVersion1 = function(callback){
        callback.bind(this)()
    }
    this.sayNameVersion2 = function(callback){
        callback()
    }
    this.sayNameVersion3 = function(callback){
        callback.call(this)
    }
    this.sayNameVersion4 = function(callback){
        callback.apply(this)
    }

}

function niceCallback(){
    var local ="local";
    var parentObject = this;
    console.log(parentObject, local);
}

var p1 = new Person('zami') // create an instance of Person constructor

p1.sayNameVersion1(niceCallback) // pass simply the callback and bind happens inside the sayNameVersion1 method
p1.sayNameVersion2(niceCallback.bind(p1)) // uses bind before passing callback
p1.sayNameVersion3(niceCallback)
p1.sayNameVersion4(niceCallback)

/* -------------------------------------------------------------------------------------- */


// We can not bind this to setTimeout(), as it always execute with global object (Window), 
// if you want to access this context in the callback function then by using bind() to the 
// callback function we can achieve as:

setTimeout(function(){
    this.methodName();
}.bind(this), 2000);
```

