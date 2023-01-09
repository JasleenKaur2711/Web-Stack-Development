angular.module("routeApp", ["ngRoute"])
    .controller('MyController', function ($scope, $rootScope) {
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
        

      // $scope.rowLimit = 3;
    //  $scope.limit = 3;

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
        $scope.setBookDate = function () {
            if($scope.order === "book_Date") {
                $scope.order = "-book_Date";
                return;
            }
            $scope.order = "book_Date";
        }

        
    })
    .controller("searchController", function ($scope, $rootScope) {
        $scope.item = "";
        $scope.setSearch = function () {
            $rootScope.search = $scope.item;
        }
    })

    .controller('deleteController', function ($scope, $http) {
        $http.get('http://localhost:3000/data').then(function (response) {
           $scope.datas = response.data
        //    $http.get('data.json').then(function (response) {
        //     $scope.datas = response.data;
        })
        console.log($scope.datas)

        

        $scope.deleteEntry = function () {
            console.log($scope.del.name)
            var delName = $scope.del.name
            fetch('http://localhost:3000/data')
            // fetch('data.json')
            .then(resp => resp.json())
            .then(data => {
                var found = false
                var newJson = []
                for (var i=0; i<data.length; i++){
                    var eachData = data[i]
                    if (eachData['name'] != delName) {
                        newJson.push(eachData)
                    }
                    else if (eachData['name'] == delName && found) {
                        newJson.push(eachData)
                    }
                    else {
                        found = true
                    }
                }
                var k = JSON.stringify(newJson).replace('"',`\"`)
                fetch('http://localhost:3000/new', {
                    // fetch('data.json', {
                    method: "POST",
                    body: k,
                    headers: {"Content-type": "application/json; charset=UTF-8"}
                })
                .then(response => response.json()) 
                .then(json => console.log(json))
                .catch(err => console.log(err))
            })
        }
    })
    .controller('createController', function ($scope) {
        $scope.createEntry = function () {
            fetch('http://localhost:3000/data')
            .then(resp => resp.json())
            .then(res => {
                var dataArray = JSON.stringify(res)
                var book_Date = String(new Date($scope.book_Date).getFullYear()) + "-" + (new Date($scope.book_Date).getMonth() < 9 ? "0" : "") + String(new Date($scope.book_Date).getMonth()+1) + "-" + (new Date($scope.book_Date).getDate() < 10 ? "0" : "") + String(new Date($scope.book_Date).getDate())
                var date = String(new Date($scope.date).getFullYear()) + "-" + (new Date($scope.date).getMonth() < 9 ? "0" : "") + String(new Date($scope.date).getMonth()+1) + "-" + (new Date($scope.date).getDate() < 10 ? "0" : "") +String(new Date($scope.date).getDate())
                var newData = "{\"book_Date\":\""+book_Date+"\", \"name\":\""+$scope.name+"\", \"gender\":\""+$scope.gender+"\", \"date\":\""+date+"\", \"orVal\":\""+$scope.orVal+"\", \"orSt\":\""+$scope.orSt+"\"}";
                console.log(newData)
                var newJSON = dataArray.split(']')[0]+"," + newData
                var jsonObj = newJSON+"]"
                console.log(JSON.parse(jsonObj))

                fetch('http://localhost:3000/new', {
                    method: "POST",
                    body: jsonObj,
                    headers: {"Content-type": "application/json; charset=UTF-8"}
                })
                .then(response => response.json()) 
                .then(json => console.log(json))
                .catch(err => console.log(err))

            })
        };
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
                templateUrl: "main.html",
                controller: "MyController"
            })
            .when("/aboutus", {
                templateUrl: "AboutUs.html",
                controller: "homeController"
            })
            .when("/contactus", {
                templateUrl: "ContactUs.html",
                controller: "homeController"
            })
            .when("/booknow", {
                templateUrl: "BookingForm.html",
                controller: "homeController"
            })
            .when("/facilitiesprovided", {
                templateUrl: "FacilitiesProvided.html",
                controller: "homeController"
            })
            .when("/signup", {
                templateUrl: "signup.html",
                controller: "signupController"
            })
            .when("/create", {
                templateUrl: "create.html",
                controller: "createController"
            })
            .when("/view", {
                templateUrl: "view.html",
                controller: "homeController"
            })
            .when("/delete", {
                templateUrl: "delete.html",
                controller: "deleteController"
            });
    })
    .config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }])