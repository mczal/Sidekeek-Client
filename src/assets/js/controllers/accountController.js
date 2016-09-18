angular.module("app.account",['app.service'])
       .controller("AccountController",accountController);

accountController.$inject = ['$scope','$http','$window','userService','summaryService'];

function accountController($scope, $http, $window,userService,summaryService){
        $scope.cancel = function(){
            $window.location.reload();
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
            about: about,
            handphone: $scope.dataAccount.handphone,
            city: city,
            address: address
          }

          let imageBase64 = "data:" + $scope.fileUpload.filetype + ";" + "base64," + $scope.fileUpload.base64;

            userService.editAccount(accountData).success(function(data, status, header, config){
              if (localStorage.getItem('tipeMember') == 1) {
                  console.log("success update account");
                  userService.editAccountPic(imageBase64).success(function(data){
                    console.log(data);
                    console.log("success update Pic");
                    $window.location.href="#/edit-profile-host";
                    $window.location.reload();
                    sessionStorage.setItem("activeTab", 1);
                  })
              }else{
                  console.log("success update account");
                  $window.location.href="#/home";
                  $window.location.reload();
              }
            }).error(function(data, status, header, config){
                console.log(data.message);
            });
        }
          let idHost = localStorage.getItem('idHost');
          userService.getAccount(idHost).success(function(data, status, header, config){
            console.log(data);
            let userData = data.content[0];
            $scope.dataAccount = userData;
            $scope.img = userData.img_base64;
        }).
        error(function(data, status, header, config){
            console.log(data.message);
        });

        summaryService.getCities().success(function(data, status, header, config){
          console.log("cities success");
          console.log(data);
            $scope.citiesData = data;
        }).error(function(data, status, header, config){
            console.log(data.message);
        });
    };
