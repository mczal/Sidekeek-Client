angular.module("app.profile",["app.service"])
       .controller("ProfileController", profileController);

profileController.$inject = ['$scope', '$http', '$uibModal','$routeParams','userService','$stateParams'];

function profileController($scope, $http, $uibModal, $routeParams, userService,$stateParams){
      // //console.log($stateParams.type);
      // //console.log(activeTab);

      function setTab(tabIndex){
        //console.log(tabIndex);
        let tab = parseInt(tabIndex);
        switch (tab) {
          case 0:
            $scope.active = [{status: true}, {status: false}, {status: false}];
            // //console.log("activate 0");
            break;
          case 1:
            $scope.active = [{status: false}, {status: true}, {status: false}];
            // //console.log("activate 1");
            break;
          case 2:
            $scope.active = [{status: false}, {status: false}, {status: true}];
            // //console.log("activate 2");
            break;
          default:
            $scope.active = [{status: true}, {status: false}, {status: false}];
            // //console.log("activate default");
        }
      }
      setTab($stateParams.type);

      let idHost = localStorage.getItem("idHost");
    //   let idHost = $stateParams.idHost;
      userService.getAccount(idHost).
        success(function(data, status, header, config){
          console.log(data);
            $scope.dataAccount = data.content[0];
            $scope.img = data.content[0].img_base64;
        }).
        error(function(data, status, header, config){
            //console.log(data.message);
        });

        userService.getProfile(idHost).
        success(function(data, status, header, config){
            $scope.dataProfile = data.content[0];
            console.log(data);
            //console.log();
            if (data.content[0].sumrate_totalreview != ""){
              $scope.dataProfile.rate = new Array (Math.floor(data.content[0].sumrate_totalreview.split('_')[0] / data.content[0].sumrate_totalreview.split('_')[1]));
            }else{
              $scope.dataProfile.rate = null;
            }

            //console.log($scope.dataProfile.rate);
            //console.log(data[0]);
        }).
        error(function(data, status, header, config){
            //console.log(data);
        });

        userService.getProductsEager(10,1).
        success(function(data, status, header, config){
          //console.log(data);
          //console.log("getProductsEager complete");
          $scope.dataProducts = data.content.products_with_images;
        }).
        error(function(data, status, header, config){
            //console.log(data.message);
        });

        userService.getPortofolios(idHost).
         success(function(data, status, header, config){
           console.log("success getting Portfolio");
             $scope.dataPortofolios = data.content;
             console.log(data);
         }).
         error(function(data, status, header, config){
             console.log(data.message);
         });

        userService.getHostReview(idHost).
        success(function(data,status,header,config){
          console.log("Hello Review");
          console.log(data);
          data.content.forEach(function(item){
            item.rate = new Array(item.rate);
          })
          $scope.reviewData = data.content;
          console.log($scope.reviewData);
        }).error(function(data, status, header, config){
            //console.log(data.message);
        });

        $scope.viewPortoDetails = function (idPortofolio){
            userService.getPortofolioDetail(idPortofolio)
            .success(function(data, status, header, config){
                //console.log(data[0]);
                $scope.portoDetail = data[0];
            }).error(function(data, status, header, config){
                //console.log(data.message);
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
