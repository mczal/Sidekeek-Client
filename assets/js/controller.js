var appController = angular.module('appController', []);
var urlAPI = "http://localhost:3000/sideAPIkeek"
var token = "eyJhbGciOiJIUzI1NiJ9.dXNlcg.2Tbs8TkRGe7ZNu4CeiR5BXpK7-MMQZXc6ZTOLZiBoLQ";

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
                alert(error);
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
                alert(error);
            }
        });
    }
]);

appController.controller('StartController', ['$scope', '$http',
    function ($scope, $http){
        var idTipe = null;
        var idHost = null;
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
                alert(error);
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

        $scope.getID = function(){
            var tipe = idTipe;
            $.ajax({
                url: urlAPI + '/firstRegister',
                method: "POST",
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                data:{
                    token: token,
                    tipe: tipe
                },
                success: function(response){
                    idHost=response.myId;
                },
                error: function(xhr, status, error){
                    alert(error);
                }
            });
        }
        $scope.submit = function(){
            var categories = $scope.form.categories;
            var company = $scope.form.company;
            var thread = $scope.form.thread;
            var myId = idHost;
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
                    alert(error);
                }
            });
        }
    }
]);
