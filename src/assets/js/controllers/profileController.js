angular.module("app.profile",["app.service"])
       .controller("ProfileController", profileController);

profileController.$inject = ['$scope', '$http', '$uibModal','$routeParams','userService','$stateParams'];

function profileController($scope, $http, $uibModal, $routeParams, userService,$stateParams){
      // //// console.log($stateParams.type);
      // //// console.log(activeTab);

      function setTab(tabIndex){
        //// console.log(tabIndex);
        let tab = parseInt(tabIndex);
        switch (tab) {
          case 0:
            $scope.active = [{status: true}, {status: false}, {status: false}];
            // //// console.log("activate 0");
            break;
          case 1:
            $scope.active = [{status: false}, {status: true}, {status: false}];
            // //// console.log("activate 1");
            break;
          case 2:
            $scope.active = [{status: false}, {status: false}, {status: true}];
            // //// console.log("activate 2");
            break;
          default:
            $scope.active = [{status: true}, {status: false}, {status: false}];
            // //// console.log("activate default");
        }
      }
      setTab($stateParams.type);

      // let idHost = localStorage.getItem("idHost");
      let idHost = $stateParams.idHost;
      userService.getAccount(idHost).
        then(function(response){
            $scope.dataAccount = response.data.content[0];
            $scope.img = response.data.content[0].img_base64;
        },function(response){

        });

        userService.getProfile(idHost).
        then(function(response){
            $scope.dataProfile = response.data.content[0];
            console.log(response);
            if (response.data.content[0].sumrate_totalreview != ""){
              $scope.dataProfile.rate = new Array (Math.floor(response.data.content[0].sumrate_totalreview.split('_')[0] / response.data.content[0].sumrate_totalreview.split('_')[1]));
            }else{
              $scope.dataProfile.rate = null;
            }

            //// console.log($scope.dataProfile.rate);
            //// console.log(data[0]);
        },function(data, status, header, config){
            //// console.log(data);
        });

        userService.getProductsEager(10,1).
        then(function(response){
          //console.log(response);
          //// console.log("getProductsEager complete");
          if(response.data.products_with_images == null){
            $scope.dataProducts = [];
          }else{
            $scope.dataProducts = response.data.products_with_images;
          }

        },function(data, status, header, config){
            //// console.log(data.message);
        });

        userService.getPortofolios(idHost).
         then(function(response){
           // console.log("success getting Portfolio");
             $scope.dataPortofolios = response.data.content;
             // console.log(data);
         },function(data, status, header, config){
             // console.log(data.message);
         });

        userService.getHostReview(idHost).
        then(function(response){
          // console.log(response);
          response.data.content.forEach(function(item){
            item.rate = new Array(item.rate);
          })
          $scope.reviewData = response.data.content;
          // console.log($scope.reviewData);
        },function(data, status, header, config){
            //// console.log(data.message);
        });

        $scope.viewPortoDetails = function (idPortofolio){
            userService.getPortofolioDetail(idPortofolio)
            .then(function(response){
                console.log(response);
                $scope.portoDetail = response.data[0];
            },function(data, status, header, config){
                //// console.log(data.message);
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
