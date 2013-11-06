
angular.module('jqmobile',[]).factory('cordovaReady', function() {
    return function (fn) {

        var queue = [];

        var impl = function () {
            queue.push(Array.prototype.slice.call(arguments));
        };

        document.addEventListener('deviceready', function () {
            queue.forEach(function (args) {
                fn.apply(this, args);
            });
            impl = fn;
        }, false);

        return function () {
            return impl.apply(this, arguments);
        };
    };
});

    angular.module('jqmobile')
        .controller('main', function ($scope,cordovaReady)
        {
            cordovaReady(function (onSuccess, onError, options) {
                var myContact = navigator.contacts.create({"displayName": "Test User"});
                myContact.note = "This contact has a note.";
                $scope.contact = myContact;
                console.log("The contact, " + myContact.displayName + ", note: " + myContact.note);
            })
            $scope.recent = [
                {name:"Kobe",img:"images/1.jpeg"},
                {name:"James",img:"images/2.jpg"},
                {name:"Van Persie",img:"images/3.jpg"},
                {name:"Nani",img:"images/4.jpg"},
                {name:"Ronney",img:"images/5.jpg"}
            ]
        })
