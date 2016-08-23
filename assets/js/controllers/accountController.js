angular.module("app.account",['app.service'])
       .controller("AccountController",accountController);

accountController.$inject = ['$scope','$http','$window'];

function accountController($scope, $http, $window){
        $scope.cancel = function(){
            $window.location.reload();
        }

        $scope.editAccountTemp = function(){
          let about = $("#about").val();
          let city = $("#region").val();
          let address = $("#address").val();

          // let companyName = $scope.dataAccount.company_name;
          // let imageBase64 = "data:" + $scope.fileUpload.filetype + ";" + "base64," + $scope.fileUpload.base64;
          // let handphone = $scope.dataAccount.handphone;

          let accountData = {
            companyName : $scope.dataAccount.company_name,
            imageBase64: "data:" + $scope.fileUpload.filetype + ";" + "base64," + $scope.fileUpload.base64,
            about: about,
            handphone: $scope.dataAccount.handphone,
            city: city,
            address: address
          }

            userService.editAccount(accountData).success(function(data, status, header, config){
                if (localStorage.getItem('tipeMember') == 1) {
                    console.log("success update account");
                    $window.location.href="#/edit-profile-host";
                    $window.location.reload();
                    sessionStorage.setItem("activeTab", 1);
                }else{
                    $window.location.href="#/home";
                    $window.location.reload();
                }

            }).error(function(data, status, header, config){
                console.log(data.message);
            });
        }

        $scope.editAccount = function(){
          let about = $("#about").val();
          let city = $("#region").val();
          let address = $("#address").val();

          // let companyName = $scope.dataAccount.company_name;
          // let imageBase64 = "data:" + $scope.fileUpload.filetype + ";" + "base64," + $scope.fileUpload.base64;
          // let handphone = $scope.dataAccount.handphone;

          let accountData = {
            companyName : $scope.dataAccount.company_name,
            imageBase64: "data:" + $scope.fileUpload.filetype + ";" + "base64," + $scope.fileUpload.base64,
            about: about,
            handphone: $scope.dataAccount.handphone,
            city: city,
            address: address
          }

            userService.editAccount(accountData).success(function(data, status, header, config){
                console.log("success update account");
                $window.location.reload();
            }).error(function(data, status, header, config){
                console.log(data.message);
            });
        }

          userService.getAccount().success(function(data, status, header, config){
            $scope.dataAccount = data[0];
            $scope.img = data[0].img_base64;
        }).
        error(function(data, status, header, config){
            console.log(data.message);
        });

        userService.getCities().success(function(data, status, header, config){
            $scope.citiesData = data;
        }).error(function(data, status, header, config){
            console.log(data.message);
        });
    };
