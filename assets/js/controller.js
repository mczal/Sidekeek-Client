var appController = angular.module('appController', []);
var urlAPI = "http://localhost:3000/sideAPIkeek"
var token = "eyJhbGciOiJIUzI1NiJ9.dXNlcg.2Tbs8TkRGe7ZNu4CeiR5BXpK7-MMQZXc6ZTOLZiBoLQ";
var idTipe = null;
idHost = null;

function generateUniqueCode(){
   var text = "";
   var possible = "[&900qnw@ml;kNI./UBI~`189`aklm3076IAKU-PASTI-BISA';l";

   for( var i=0; i < 10; i++ )
       text += possible.charAt(Math.floor(Math.random() * possible.length));

   idHost = text;
}

appController.controller('HomeController',['$scope','$http',
    function($scope,$http){
        $.ajax({
            url: urlAPI + '/getCategories',
            method: "POST",
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data:{
                token: token
            },
            success: function(response){
                $scope.categoriesData = response;
            },
            error: function(xhr, status, error){
                console.log(error);
            }
        });
        $.ajax({
            url: urlAPI + '/getProvince',
            method: "POST",
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data:{
                token: token
            },
            success: function(response){
                $scope.provinceData = response;
            },
            error: function(xhr, status, error){
                console.log(error);
            }
        });
    }
]);

appController.controller('StartController', ['$scope', '$http',
    function ($scope, $http){

        $('#button-goods').hide();
        $('#button-service').hide();

        $.ajax({
            url: urlAPI + '/getCategories',
            method: "POST",
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data:{
                token: token
            },
            success: function(response){
                $scope.categoriesData = response;
            },
            error: function(xhr, status, error){
                console.log(error);
            }
        });

        $scope.serviceGoodOnClick = function(id){
            if(id==1){
                idTipe = "goods";
                $('#button-goods').show();
                $('#button-service').hide();
            }else{
                idTipe = "services";
                $('#button-goods').hide();
                $('#button-service').show();
            }
        }

        $scope.submit = function(){
            var myId = idHost;
            var categories = $scope.form.categories;
            var company = $scope.form.company;
            var thread = $scope.form.thread;
            $.ajax({
                url: urlAPI + '/secondRegister',
                method: "POST",
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                data:{
                    token: token,
                    cat: categories,
                    myId: myId,
                    compTitle: company,
                    threadTitle: thread
                },
                success: function(response){
                    alert("Berhasil");
                },
                error: function(xhr, status, error){
                    console.log(error);
                }
            });
        }
    }
]);

appController.controller('SignUpController', ['$scope', '$http',
    function($scope, $http){
        $scope.signUp = function(){
            var email = $scope.form.email;
            var pass = $scope.form.password;
            var confirm = $scope.form.confirmation;
            $.ajax({
                url: urlAPI + '/sign-up',
                method: 'POST',
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                data:{
                    token: token,
                    myId: idHost,
                    email: email,
                    password: pass,
                    confirmation: confirm
                },
                success: function(response){
                    alert("berhasil");
                },
                error: function(xhr, status, error){
                    alert(error);
                }
            });
        }
    }
]);
