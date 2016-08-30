angular.module("app.editProfile",["app.service"])
       .controller("EditProfileController",editProfileController);

editProfileController.$inject = ['$scope', '$http', '$compile', '$rootScope', '$window','userService','summaryService']

 function editProfileController($scope, $http, $compile, $rootScope, $window){
     $scope.setActiveTab = function (activeTab) {
         sessionStorage.setItem("activeTab", activeTab);
     };
     $scope.active = [{status: false}, {status: false}, {status: false}];
     if (sessionStorage.getItem("activeTab") == 1) {
         $scope.active[0].status = true;
     }else if(sessionStorage.getItem("activeTab") == 2){
         $scope.active[1].status = true;
     }else{
         $scope.active[2].status = true;
     }

     $scope.escapeAdd = function(keyCode){
         if (keyCode == 27) {
             $("#freeze").css({'position': '', 'overflow-y': '', 'width': ''});
             $(".overlay-portofolio-add").hide();
             $(".offcanvas-portofolio").hide();
         }
     }

     $scope.escapeEdit = function(keyCode){
         if (keyCode == 27) {
             $("#freeze").css({'position': '', 'overflow-y': '', 'width': ''});
             $(".overlay-portofolio-edit").hide();
             $(".offcanvas-portofolio").hide();
         }
     }

     $scope.addPorto = function (){
         $("#freeze").css({'position': 'fixed', 'overflow-y': 'scroll', 'width': '100%'});
         $(".overlay-portofolio-add").show();
         $(".offcanvas-portofolio").show();
     }

     $scope.closeOffcanvas_add = function (){
         $("#freeze").css({'position': '', 'overflow-y': '', 'width': ''});
         $(".overlay-portofolio-add").hide();
         $(".offcanvas-portofolio").hide();
     }

     $scope.closeOffcanvas_edit = function(){
         $("#freeze").css({'position': '', 'overflow-y': '', 'width': ''});
         $(".overlay-portofolio-edit").hide();
         $(".offcanvas-portofolio").hide();
     }

     $scope.addNewPortofolio = function (){
       let portfolioData = {
         title : $scope.form.title,
         imageBase64 : "data:" + $scope.myFile.filetype + ";" + "base64," + $scope.myFile.base64,
         desc:  $("#portoDesc").val()
       }

      userService.addNewPortofolio(portfolioData).success(function(data, status, header, config){
             $window.location.reload();
             console.log("success add new portofolio");
         }).error(function(data, status, header, config){
             console.log(data.message);
         });
     }

     $scope.addNewProductDesc = function(){
         $http({
             method: 'POST',
             url: urlAPI + '/addNewProductDesc',
             headers: {
                 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
             },
             data: $.param({
                 token : token,
                 sessionCode : localStorage.getItem('session'),
                 namaProduk : $scope.form.product_name,
                 harga : $scope.form.price,
                 productDesc : $("#product-desc").val(),
                 timestamp : curDate()
             })
         }).success(function(data, status, header, config){
             $("#add_produk").show();
             for (var i = 0; i < $scope.myFile.length; i++) {
                 var typeData = "data:" + $scope.myFile[i].filetype + ";";
                 var base64Data = "base64," + $scope.myFile[i].base64;
                 var imageBase64 = typeData + base64Data;
                 $http({
                     method: 'POST',
                     url: urlAPI + "/addProductImage",
                     headers:{
                         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                     },
                     data: $.param({
                         token: token,
                         sessionCode: localStorage.getItem('session'),
                         idProduct: data.idProduct,
                         imgbase64: imageBase64,
                         timestamp: curDate()
                     })
                 }).success(function(data, status, header, config){
                     $window.location.reload();
                     console.log(data.message);
                 }).error(function(data, status, header, config){
                     console.log(data.message);
                 });
             }
             console.log("success add new product. Id Prod="+data.idProduct);
         }).error(function(data, status, header, config){
             console.log(data.message);
         });
     }

     $scope.viewPortoEditDetails = function(idPortofolio){
      userService.getPortofolioDetail(idPortofolio).success(function(data, status, header, config){
             $scope.img = data[0].img_base64;
             $scope.portoDetails = data[0];
         }).error(function(data, status, header, config){
             console.log(data.message);
         });
     }

     $scope.editPortofolio = function(idPortofolio){
         console.log($scope.myFile);
         // var typeData = "data:" + $scope.myFile.filetype + ";";
         // var base64Data = "base64," + $scope.myFile.base64;
         // var imgBase64 = typeData + base64Data;
         // $http({
         //     method: 'POST',
         //     url: urlAPI + '/editPortofolio',
         //     headers: {
         //         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
         //     },
         //     data: $.param({
         //         token : token,
         //         sessionCode : localStorage.getItem("session"),
         //         idPortofolio : idPortofolio,
         //         timestamp : curDate(),
         //         title : $scope.portoDetails.title,
         //         description : $("#portoDesc_edit").val(),
         //         imgBase64 : imgBase64
         //     }),
         // }).success(function(data, status, header, config){
         //     window.location.reload();
         //     console.log("berhasil");
         // }).error(function(data, status, header, config){
         //     console.log(data.message);
         // });
     }

     $scope.editProductDesc = function(idProduct){
       let productData = {
         namaProduk : $("#product_name_"+idProduct).val(),
         harga : $("#price_"+idProduct).val(),
         productDesc : $("#product_desc_"+idProduct).val(),
       }

       //productData[namaProduk] = $("#product_name_"+idProduct).val();

       var buttonVal = $("#button").val();

       userService.editProductDesc(productData).success(function(data, status, header, config){
             //$window.location.reload();
             console.log(data.message);
             console.log("success edit product.");
         }).error(function(data, status, header, config){
             console.log(data.message);
         });
     }

     $scope.serviceGoodOnClick = function(id){
         if(id==1){
             sessionStorage.setItem('idTipeProfile','1');
             $(".button_goods").css({'top': '5px', 'box-shadow': 'none', 'outline': 'none'});
             $(".button_service").css({'top': '', 'box-shadow': '', 'outline': ''});
         }else{
             sessionStorage.setItem('idTipeProfile','2');
             $(".button_service").css({'top': '5px', 'box-shadow': 'none', 'outline': 'none'});
             $(".button_goods").css({'top': '', 'box-shadow': '', 'outline': ''});
         }
     }

     $scope.editProfiledesc = function (){
         $http({
             method: 'POST',
             url: urlAPI + '/editProfile',
             headers: {
                 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
             },
             data: $.param({
                 token : token,
                 sessionCode : localStorage.getItem("session"),
                 timestamp : curDate(),
                 tipe: sessionStorage.getItem('idTipeProfile'),
                 title : $('#title').val(),
                 businessCategory : $("#category").val(),
                 companyDesc : $("#companyDesc").val()
             })
         }).success(function(data, status, header, config){
             window.location.reload();
             // console.log(localStorage.getItem("session")+" "+curDate()+" "+sessionStorage.getItem('idTipeProfile')+" "+$scope.dataProfile.title+" "+$("#category").val()+" "+$("#companyDesc").val());
             // console.log('HAI');
         }).error(function(data, status, header, config){
             console.log(data.message);
         });
     }

    userService.getProfile().
     success(function(data, status, header, config){
         $scope.dataProfile = data[0];
         if ($scope.dataProfile.tipe == "goods") {
             $(".button_goods").css({'top': '5px', 'box-shadow': 'none', 'outline': 'none'});
             $(".button_service").css({'top': '', 'box-shadow': '', 'outline': ''});
         }else{
             $(".button_service").css({'top': '5px', 'box-shadow': 'none', 'outline': 'none'});
             $(".button_goods").css({'top': '', 'box-shadow': '', 'outline': ''});
         }
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

     summaryService.getCities()
     .success(function(data, status, header, config){
         $scope.citiesData = data;
     }).error(function(data, status, header, config){
         console.log(data.message);
     });

     summaryService.getCategories().success(function(data, status, header, config){
         $scope.categoriesData = data;
     }).error(function(data, status, header, config){
         console.log(data.message);
     });

    userService.getProducts().success(function(data, status, header, config){
         $scope.dataProducts = data;
     }).error(function(data, status, header, config){
         console.log(data.message);
     });

    userService.getProductsEager().success(function(data, status, header, config){
         $scope.dataProductEager = data;
         // console.log($scope.dataProductEager.images.length);
         // for (var i = 0; i < $scope.dataProductEager.images.length; i++) {
         //     if ($scope.dataProductEager.images[i].id_product == $scope.dataProductEager.product[i].id_product) {
         //         console.log($scope.dataProductEager.images[i].id_product);
         //         $scope.data = angular.extend({},$scope.dataProductEager.images[i],$scope.dataProductEager.product[i]);
         //     }
         // }
         // console.log($scope.dataProductEager.images[0].id_product);
         console.log(data);
         // console.log($scope.data);
     }).error(function(data, status, header, config){
         console.log(data.message);
     });

     $scope.addProduk = function (){
         produk =[ '<div class="row">',
         '                            <div class="col-lg-4">',
         '                                <div class="upload text-center">',
         '                                    <div class="box container-fluid">',
         '                                        <div class="file-upload text-center">',
         '                                            <img src="assets/img/uploadfoto.png" alt="" />',
         '                                            <input type="file" name="file" id="fileUpload" class="inputfile inputfile-1" ng-model="myFile" multiple base-sixty-four-input/>',
         '                                            <label for="fileUpload"><span><i class="fa fa-upload" style="padding-right: 5px;"></i>Choose a file&hellip;</span></label>',
         '                                        </div>',
         '                                    </div>',
         '                                </div>',
         '                            </div>',
         '                            <div class="col-lg-8">',
         '                                <div class="form-group form-group-xl">',
         '                                    <label for="">Product Name</label>',
         '                                    <input type="text" class="form-control" ng-model="form.product_name" id="product_name">',
         '                                </div>',
         '                                <div class="form-group form-group-xl">',
         '                                    <label for="">Price</label>',
         '                                    <input type="text" class="form-control" ng-model="form.price" id="price">',
         '                                </div>',
         '                                <div class="form-group">',
         '                                    <label for="">Product Description</label>',
         '                                    <textarea type="text" class="form-control" rows="10" id="product-desc"></textarea>',
         '                                </div>',
         '                            </div>',
         '                            <div class="col-lg-12">',
         '                                <button type="button" class="btn btn-success btn-lg pull-right" ng-click="addNewProductDesc()" style="margin-bottom:50px;" id="button">Add Product</button>',
         '                            </div>',
         '                        </div>',
         '                        <script src="assets/js/custom-file-input.js"></script>'].join('');
         $(".add-produk").append($compile(produk)($scope));
         $("#add_produk").hide();
     }
 };
