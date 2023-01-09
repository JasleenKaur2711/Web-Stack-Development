angular.module("Lab9App", ["ngRoute"])
    .controller('mainController', function ($scope, $rootScope) {
        $scope.username = '';
        $scope.password = '';
        $scope.submitForm = function () {
            $rootScope.name = "Hello, " + $scope.username;
            // console.log($rootScope.name);
            $scope.username = '';
            $scope.password = '';
        }
    })
    .controller('homeController', function ($scope, $http) {
        // $scope.name = "Aboutkk scope"
        $http.get('data.json').then(function (response) {
            $scope.datas = response.data;
        });

        $scope.rowLimit = 3;
        $scope.limit = 3;

        $scope.order = "";
        $scope.genderCase = "uppercase";


        $scope.setName = function () {
            if ($scope.order === "name") {
                $scope.order = "-name";
                return;
            }
            $scope.order = "name";
        }

        $scope.setAge = function () {
            if ($scope.order === "age") {
                $scope.order = "-age";
                return;
            }
            $scope.order = "age";
        }

        $scope.setGender = function () {
            if ($scope.order === "gender") {
                $scope.order = "-gender";
                return;
            }
            $scope.order = "gender";
        }

        $scope.setDob = function () {
            if ($scope.order === "date") {
                $scope.order = "-date";
                return;
            }
            $scope.order = "date";
        }

        
    })
    .controller("searchController", function ($scope, $rootScope) {
        $scope.item = "";
        $scope.setSearch = function () {
            $rootScope.search = $scope.item;
        }
    })
    .controller("signupController", function ($scope) {
        $scope.sName = ''
        $scope.sMail = ''
        $scope.sPass = ''
        $scope.sCnfPass = ''
        $scope.sAge = ''

        $scope.clearForm = function () {
            if($scope.sName == '' || $scope.sMail == '' || $scope.sPass == '' || $scope.sCnfPass == '' || $scope.sAge == '')
                return false
            console.log($scope)
            $scope.sName = ''
            $scope.sMail = ''
            $scope.sPass = ''
            $scope.sCnfPass = ''
            $scope.sAge = ''
        }
    })
    .config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "manipulatedata.html",
                controller: "mainController"
            })
            .when("/create", {
                templateUrl: "create.html",
                controller: "homeController"
            })
            .when("/view", {
                templateUrl: "view.html",
                controller: "homeController"
            })
            .when("/delete", {
                templateUrl: "delete.html",
                controller: "homeController"
            });
            
    })
    .config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }])