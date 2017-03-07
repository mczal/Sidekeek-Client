angular.module("app.account",['app.service'])
       .controller("AccountController",accountController);

accountController.$inject = ['$scope','$http', 'userService','summaryService','$state'];

function accountController($scope, $http,userService,summaryService,$state){
        $scope.cancel = function(){
            $window.location.reload();
        }
        $scope.editAccount = function(){
          var coName = $("#coName").val();
          var about = $("#about").val();
          var city = $("#region option:selected").val();
          var address = $("#address").val();
          var handphone = $("#phone").val();

          // var companyName = $scope.dataAccount.company_name;
          // var imageBase64 = "data:" + $scope.fileUpload.filetype + ";" + "base64," + $scope.fileUpload.base64;
          // var handphone = $scope.dataAccount.handphone;

          var tempData = {
            companyName : coName,
            about: about,
            handphone: handphone,
            city: city,
            address: address
          }
          console.log($scope.fileUpload);
          if($scope.fileUpload != undefined || $scope.fileUpload != null){
            var imageBase64 = "data:" + $scope.fileUpload.filetype + ";" + "base64," + $scope.fileUpload.base64;
          }else{
            var imageBase64 = $scope.dataAccount.image_base64;
          }

            userService.editAccount(tempData).then(function(response){
              console.log(response);
                  userService.editAccountPic(imageBase64).then(function(response){
                    if (localStorage.getItem('tipeMember') == 1) {
                      console.log("success update account");
                      console.log(response);
                      console.log("success update Pic");
                      sessionStorage.setItem("activeTab", 1);
                      swal("Success","Account updated!","success");
                      $state.go("edit-profile-host");

                      } else {
                          console.log("success update account");
                          swal("Success","Account updated!","success");
                          location.reload();
                      }
              })
            },
            function(response){
              console.log(response);
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
