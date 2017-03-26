angular.module("app.profile",["app.service"])
       .controller("ProfileController", profileController);

profileController.$inject = ['$scope', '$http', '$uibModal','$routeParams','userService','$stateParams'];

function profileController($scope, $http, $uibModal, $routeParams, userService,$stateParams){
      console.log($stateParams.idHost);
      // //// console.log(activeTab);

      function setTab(tabIndex){
        //// console.log(tabIndex);
        var tab = parseInt(tabIndex);
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

      // var idHost = localStorage.getItem("idHost");
      userService.getAccount($stateParams.idHost).
        then(function(response){
            $scope.dataAccount = response.data.content[0];
            $scope.img = response.data.content[0].img_base64;
        });

        userService.getProfile($stateParams.idHost).
        then(function(response){
            $scope.dataProfile = response.data.content[0];
            if (response.data.content[0].sumrate_totalreview != "" && response.data.content[0].sumrate_totalreview != null){
              $scope.dataProfile.rate = new Array (Math.floor(response.data.content[0].sumrate_totalreview.split('_')[0] / response.data.content[0].sumrate_totalreview.split('_')[1]));
            }else{
              $scope.dataProfile.rate = null;
            }

            //// console.log($scope.dataProfile.rate);
            //// console.log(data[0]);
        },function(data, status, header, config){
            //// console.log(data);
        });

        userService.getProductsEager($stateParams.idHost,10,1).
        then(function(response){
          console.log(response);
          //// console.log("getProductsEager complete");
          if(response.data.content == null){
            $scope.dataProducts = [];
          }else{
            $scope.dataProducts = response.data.content.products_with_images;
            var tempData = response.data.content.products_with_images;
            $scope.dataProducts.forEach(function(item){
              var imgs = item.images
              .split(';')
              .map(imgData => ({
                id: imgData.split(',')[0],
                src: imgData.split(',')[1]
              })
            )
            .filter(imgData =>
              imgData && imgData.id
            );

            item.featured_img = imgs.shift();
            item.images = imgs.filter(imgData => imgData && imgData.id);
            console.log($scope.dataProducts);
          });

        }
        });

        userService.getPortofolios($stateParams.idHost).
         then(function(response){
           // console.log("success getting Portfolio");
             $scope.dataPortofolios = response.data.content;
             // console.log(data);
         },function(data, status, header, config){
             // console.log(data.message);
         });

        userService.getHostReview($stateParams.idHost).
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
