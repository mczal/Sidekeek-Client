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

            userService.editAccount(accountData).then(function(response){
              if (localStorage.getItem('tipeMember') == 1) {
                  console.log("success update account");
                  userService.editAccountPic(imageBase64).then(function(response){
                    console.log(response);
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
            function(response){
                console.log(response.data.message);
            });
        }
          var idHost = localStorage.getItem('idHost');
          userService.getAccount(idHost).then(function(response){
            console.log(response.data);
            var userData = response.data.content[0];
            $scope.dataAccount = userData;
            $scope.img = userData.img_base64;
        },function(response){
            console.log(response.data.message);
        });

        summaryService.getCities().then(function(response){
          console.log("cities success");
          console.log(response.data);
            $scope.citiesData = response.data;
        },function(response){
            console.log(response.data.message);
        });
    };
