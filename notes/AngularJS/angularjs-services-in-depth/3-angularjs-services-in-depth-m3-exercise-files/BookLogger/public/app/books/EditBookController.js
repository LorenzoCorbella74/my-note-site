(function () {

    angular.module('app')
        .controller('EditBookController', ['$routeParams', 'books', '$cookies', '$cookieStore', EditBookController]);

    function EditBookController($routeParams, books, $cookies, $cookieStore) {
        //console.log($routeParams.bookID);

        var vm = this;

        //dataService.getAllBooks()
        //    .then(function(books) {
        //        vm.currentBook = books.filter(function(item) {
        //            return item.book_id == $routeParams.bookID;
        //        })[0];
        //    });

        vm.currentBook = books.filter(function(item) {
            return item.book_id == $routeParams.bookID;
        })[0];

        vm.setAsFavorite = function() {

            $cookies.favoriteBook = vm.currentBook.title;

        };

        $cookieStore.put('lastEdited', vm.currentBook);

    }

}());