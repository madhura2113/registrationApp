var app = angular.module('myRegApp',['ui.router']);
        
        app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/home');
          
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'templates/regHome.html',
                    controller: 'myRegController'
                })
                .state('users', {
                    url:'/users',
                    templateUrl: 'templates/displayUsers.html',
                    controller: 'myUsersController'
                })
                .state('register', {
                    url: '/register',
                    templateUrl: 'templates/register.html',
                    controller: 'myNewRegisterController'
                });
          }]);
        
app.controller('myRegController', function($scope, $http) {
        });
        
// angular.module("myRegApp",['ngTable']).controller('myUsersController', function($scope, $http, ngTableParams, $defer) {
    angular.module("myRegApp").controller('myUsersController',
    function($scope, $http, $filter) {         
        $scope.displayUsers = true;
          $scope.data = [];
         // $scope.oldData = [];
            var showUsers = $http.get('/getUsers');
            showUsers.success(function(data){
                $scope.data = data;

                $scope.currentPage = 0;
                $scope.pageSize = 5;
              //  $scope.data = [];
                $scope.q = '';


                $scope.getData = function () {
                    return $filter('filter')($scope.data, $scope.searchText)
                  }

                  $scope.numberOfPages=function(){
                    return Math.ceil($scope.data.length/$scope.pageSize);                   
                }
                $scope.getData();
        
            });
            showUsers.error(function(error){
                console.log("Error: ", error);
            });        

    });

    app.filter('startFrom', function() {
        return function(input, start) {
            start = +start; 
            return input.slice(start);
        }
    });
        
angular.module("myRegApp").controller('myNewRegisterController', function($scope, $http) {
           $scope.newUser = {
             name:"",
             inTime:"",
             outTime:"",
             reason:""
           }
        
        $scope.insertData = function(){		
            var obj = {
                name: $scope.newUser.name,
                inTime: $scope.newUser.inTime,
                outTime: $scope.newUser.outTime,
                reason: $scope.newUser.reason
          }
            $http.post("/saveUsers", obj)
            .success(function(data,status,headers,config){
                if(data.affectedRows == 0){
                    console.log("Duplicate entry!");
                    alert("Duplicate entry!");
                }else{
                    console.log("Data Inserted Successfully");
                    alert("Data Inserted Successfully!");
                }
            
            }).error(function (data, status, headers, config) {
                $scope.status = status;
                alert("Error in saving data!");
            });;
        }
        
        });