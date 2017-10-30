var app = angular.module('myRegApp',['ui.router']);

app.controller('myRegController', function($scope, $http, $routeProvider) {

    $scope.data = [];
    var request = $http.get('/data');    
    request.success(function(data) {
        console.log("The data fetched is:" +data);
        // $scope.data = data;
    });
    request.error(function(data){
        console.log('Error: ' + data);
    });

    var showUsers = $http.get('/getUsers');
    showUsers.success(function(data){
        $scope.data = data;
        console.log("Tableeeeeee data: ", data);
    });

    showUsers.error(function(error){
        console.log("Errorrrrr", error);
    })
});

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/users');
  
    $stateProvider
        .state('users', {
            url:'/users',
            templateUrl: 'templates/displayUsers.html'
          //  controller: 'myRegController'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'templates/register.html'
           // controller: 'myRegController'
        });
  }]);