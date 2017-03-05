angular.module("app.account",['app.service'])
       .controller("AccountController",accountController);

accountController.$inject = ['$scope','$http','$window','userService','summaryService'];

function accountController($scope, $http, $window,userService,summaryService){
        $scope.cancel = function(){
            $window.location.reload();
        }
        $scope.editAccount = function(){
          var about = $("#about").val();
          var city = $("#region").val();
          var address = $("#address").val();

          // var companyName = $scope.dataAccount.company_name;
          // var imageBase64 = "data:" + $scope.fileUpload.filetype + ";" + "base64," + $scope.fileUpload.base64;
          // var handphone = $scope.dataAccount.handphone;

          var accountData = {
            companyName : $scope.dataAccount.company_name,
            about: about,
            handphone: $scope.dataAccount.handphone,
            city: city,
            address: address
          }
          if($scope.fileUpload != undefined){
            var imageBase64 = "data:" + $scope.fileUpload.filetype + ";" + "base64," + $scope.fileUpload.base64;
          }

            userService.editAccount(accountData).then(function(data, status, header, config){
              if (localStorage.getItem('tipeMember') == 1) {
                  console.log("success update account");
                  userService.editAccountPic(imageBase64).then(function(data){
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
            },
            function(data, status, header, config){
                console.log(data.message);
            });
        }
          var idHost = localStorage.getItem('idHost');
          userService.getAccount(idHost).then(function(data, status, header, config){
            console.log(data);
            var userData = data.content[0];
            $scope.dataAccount = userData;
            $scope.img = userData.img_base64;
        },function(data, status, header, config){
            console.log(data.message);
        });

        summaryService.getCities().then(function(data, status, header, config){
          console.log("cities success");
          console.log(data);
            $scope.citiesData = data;
        },function(data, status, header, config){
            console.log(data.message);
        });
    };
