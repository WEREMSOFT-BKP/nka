(function() {
    var app = angular.module("controlDeContratistas", ['ngRoute', 'ngAnimate']);


    // Application Constructor
    app.initialize = function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    app.bindEvents = function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    app.onDeviceReady = function() {
        navigator.splashscreen.hide();
        app.addNotification();
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    app.receivedEvent = function(id) {
        console.log('Received Event: ' + id);
    }


    app.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider

            .when('/list', {
                templateUrl: 'templates/categories.html',
                controller: 'CateogoryController',
                controllerAs: 'categoriesCtrl'
            })

            .when('/list/:bookId', {
                templateUrl: 'templates/categories.html',
                controller: 'CateogoryController',
                controllerAs: 'categoriesCtrl'
            })

            .when('/new', {
                templateUrl: 'templates/new.html',
                controller: 'NewController',
                controllerAs: 'newCtrl'
            }).
            otherwise({
                redirectTo: '/list'
            });
        }
    ]);


    app.controller("LoginController", function() {
        this.STATE_WAITING_USER_INPUT = 0;
        this.STATE_CHECKING = 1;
        this.state = this.STATE_WAITING_USER_INPUT;
        this.please = "Por Favor";

        this.setStateCkecking = function() {
            console.log("pasando a checking");
            this.state = this.STATE_CHECKING;
        };

    });

    app.controller("AppFlowCtrl", ['$route', '$routeParams', '$location',
        function($route, $routeParams, $location) {
            this.$route = $route;
            this.$location = $location;
            this.$routeParams = $routeParams;
        }
    ]);

    app.controller("CateogoryController", ['$scope', '$http', '$route', '$routeParams', '$location',
        function($scope, $http, $route, $routeParams, $location) {
            this.$route = $route;
            this.$location = $location;
            this.$routeParams = $routeParams;
            ctrl = this;
            this.categories = {
                "cadorn": 2
            };
            this.scope = $scope;
            $http.get('json/categories.json').success(function(data) {
                console.log(ctrl.categories);
                ctrl.categories = data;
                console.log(ctrl.categories);
            });
        }
    ]);

    app.controller('MainCtrl', ['$route', '$routeParams', '$location',
        function($route, $routeParams, $location) {
            this.$route = $route;
            this.$location = $location;
            this.$routeParams = $routeParams;
        }
    ]);

    app.controller("NewController", ['$scope', '$http',
        function($scope, $http) {
            ctrl = this;
            this.news = {};
            this.scope = $scope;
            $http.get('json/new.json').success(function(data) {
                console.log(ctrl.news);
                ctrl.news = data;
                console.log(ctrl.news);
            });
        }
    ]);


    app.addNotification = function() {
        var now = new Date().getTime(),
            _10_seconds_from_now = new Date(now + 10 * 1000);

        window.plugin.notification.local.add({
            id: 1,
            title: 'Naka - 10% off en camperas',
            message: 'Camperas de pluma Ansilta!.',
            date: _10_seconds_from_now
        });
    };

    app.controller("SearchCtrl", function() {});

    app.initialize();
    //navigator.splashscreen.hide();
})();
