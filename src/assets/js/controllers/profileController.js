angular.module("app.profile",["app.service"])
       .controller("ProfileController", profileController);

profileController.$inject = ['$scope', '$http', '$uibModal','$routeParams','userService'];

function profileController($scope, $http, $uibModal, $routeParams, userService){

      //let idHost = localStorage.getItem("idHost");
      let idHost = $routeParams.idHost;
      userService.getAccount(idHost).
        success(function(data, status, header, config){
          console.log(data);
            $scope.dataAccount = data[0];
            $scope.img = data[0].img_base64;
        }).
        error(function(data, status, header, config){
            console.log(data.message);
        });

        userService.getProfile(idHost).
        success(function(data, status, header, config){
            $scope.dataProfile = data[0];
            console.log(data[0]);
        }).
        error(function(data, status, header, config){
            console.log(data);
        });

        userService.getProductsEager().
        success(function(data, status, header, config){
          console.log(data.products);
          console.log("getProductsEager complete");
            $scope.dataProducts = data.products;
        }).
        error(function(data, status, header, config){
            console.log(data.message);
        });

        userService.getPortofolios().
        success(function(data, status, header, config){
            $scope.dataPortofolios = data;
        }).
        error(function(data, status, header, config){
            console.log(data.message);
        });

        $scope.viewPortoDetails = function (idPortofolio){
            userService.getPortofolioDetail(idPortofolio)
            .success(function(data, status, header, config){
                console.log(data[0]);
                $scope.portoDetail = data[0];
            }).error(function(data, status, header, config){
                console.log(data.message);
            });
        }

        $scope.close = function(){
            $("#freeze").css({'position': '', 'overflow-y': '', 'width': ''});
            $(".overlay-portofolio-details").hide();
        }

        $scope.escape = function(keyCode){
            $("#freeze").css({'position': '', 'overflow-y': '', 'width': ''});
            $(".overlay-portofolio-details").hide();
        }

        $scope.contactus = function (size) {
          uiService.showModal(size,"contactus.html");
        };

        $scope.feedback = function (size) {
            uiService.showModal(size,"feedback.html");
        };

        $scope.support = function (size) {
            uiService.showModal(size,"support.html");
        };
    };
