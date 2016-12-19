angular.module("app.editProfile",["app.service"])
       .controller("EditProfileController",editProfileController);

editProfileController.$inject = ['$scope', '$http', '$compile', '$rootScope', '$window','userService','summaryService']

 function editProfileController($scope, $http, $compile, $rootScope, $window, userService, summaryService ){
     function activateTab (tabIndex) {
       var activeTab;
       activeTab = tabIndex;

       switch (activeTab) {
         case 0:
           $scope.active = [{status: true}, {status: false}, {status: false}];
           break;
         case 1:
           $scope.active = [{status: false}, {status: true}, {status: false}];
           break;
         case 2:
           $scope.active = [{status: false}, {status: false}, {status: true}];
           break;
         default:
           $scope.active = [{status: true}, {status: false}, {status: false}];
       }
     };

     activateTab(0);

     $scope.removeDisable = function(){
         $(".inputDisable").prop("disabled", false);
         $scope.check = 1;
     }


    //  activateTab(0);
     //
    //  $scope.setActiveTab = function(active){
    //    activateTab(active);
    //  }
     //
     //
    //  $scope.active = [{status: false}, {status: false}, {status: false}];
    //  if (sessionStorage.getItem("profileActiveTab") == 1) {
    //      $scope.active[0].status = true;
    //      $scope.active[1].status = false;
    //      $scope.active[2].status = false;
    //  }else if(sessionStorage.getItem("profileActiveTab") == 2){
    //      $scope.active[0].status = false;
    //      $scope.active[1].status = true;
    //      $scope.active[2].status = false;
    //  }else{
    //      $scope.active[0].status = false;
    //      $scope.active[1].status = false;
    //      $scope.active[2].status = true;
    //  }

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
       var portfolioData = {
         title : $scope.form.title,
         imageBase64 : "data:" + $scope.myFile.fivarype + ";" + "base64," + $scope.myFile.base64,
         desc:  $("#portoDesc").val()
       }

      userService.addNewPortofolio(portfolioData).success(function(data, status, header, config){
             //$window.location.reload();
             console.log("success add new portofolio");
         }).error(function(data, status, header, config){
             console.log(data.message);
         });
     }

     $scope.addNewProductDesc = function(){
        var productData = {
          name: $("#product_name").val(),
          price :$("#price").val(),
          desc : $("#product-desc").val()
        }
        console.log(productData);
         userService.addNewProductDesc(productData).success(function(data, status, header, config){
           console.log("add new produk");
           console.log(data);
             $("#add_produk").show();
             for (var i = 0; i < $scope.myFile.length; i++) {
                 var typeData = "data:" + $scope.myFile[i].fivarype + ";";
                 var base64Data = "base64," + $scope.myFile[i].base64;
                 var imageBase64 = typeData + base64Data;
                //  $http({
                //      method: 'POST',
                //      url: urlAPI + "/addProductImage",
                //      headers:{
                //          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                //      },
                //      data: $.param({
                //          token: token,
                //          sessionCode: localStorage.getItem('session'),
                //          idProduct: data.idProduct,
                //          imgbase64: imageBase64,
                //          timestamp: curDate()
                //      })
                //  })

                var imageData = {
                  id : data.idProduct ,
                  source: imageBase64
                }
                console.log(imageData);

                 userService.addProductImage(imageData).success(function(data, status, header, config){
                     console.log(data.message);
                     $window.location.reload();
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
      console.log("getting porto data");
      console.log(idPortofolio);
      userService.getPortofolioDetail(idPortofolio).success(function(data, status, header, config){
          console.log("success get porto detail");
             console.log(data);
             //$scope.img = data.content[0].img_base64;
             $scope.editPortoDetails = data.content[0];
            //  $scope.form.title = data.content[0].title;
         }).error(function(data, status, header, config){
             console.log(data.message);
         });
     }

     $scope.editPortofolio = function(idPortofolio){
         console.log($scope.myFile);
        //  var typeData = "data:" + $scope.myFile.fivarype + ";";
        //  var base64Data = "base64," + $scope.myFile.base64;
        //  var imgBase64 = typeData + base64Data;
        //  console.log(imageBase64);
         console.log(idPortofolio);
         var newPortoData = {
           id: idPortofolio,
           title: $scope.editPortoDetails.title,
           desc: $scope.editPortoDetails.description
         }
         console.log(newPortoData)
         userService.editPortofolio(newPortoData).success(function(data, status, header, config){
            //  console.log("berhasil");
             console.log(data);

             if ($scope.myFile == undefined){
                console.log("No new images");
             }else{
               //  var typeData = "data:" + $scope.myFile.fivarype + ";";
               //  var base64Data = "base64," + $scope.myFile.base64;
               var imgBase64 = "data:" + $scope.myFile.fivarype + ";" + "base64," + $scope.myFile.base64;
               var imgData = {
                 id: idPortofolio,
                 source: imgBase64
               }
               userService.editPortofolioImg(imgData).success(function(data){
                 console.log("edit portfolio image");
                 console.log(data);
               })
             }
         }).error(function(data, status, header, config){
             console.log(data.message);
         });
     }

     $scope.editProductDesc = function(idProduct){
       var productData = {
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
       var newData = {
         title : $('#title').val(),
         category : $("#category").val(),
         desc : $("#companyDesc").val(),
        //  tipe: sessionStorage.getItem('idTipeProfile')
       };
       if (sessionStorage.getItem('idTipeProfile') == null){
         newData.tipe = $scope.dataProfile.id_tipe;
       }else{
         newData.tipe = sessionStorage.getItem('idTipeProfile');
       }
       console.log(newData);
         userService.editProfile(newData).success(function(data, status, header, config){
            //  window.location.reload();
            console.log(data);
            activateTab(1);
             // console.log(localStorage.getItem("session")+" "+curDate()+" "+sessionStorage.getItem('idTipeProfile')+" "+$scope.dataProfile.title+" "+$("#category").val()+" "+$("#companyDesc").val());
             // console.log('HAI');
         }).error(function(data, status, header, config){
             console.log(data.message);
         });
     }
    var idHost = localStorage.getItem('idHost');
    console.log("Getting Profile for " + idHost);
    userService.getProfile(idHost).
     success(function(data, status, header, config){
       console.log(data);
         $scope.dataProfile = data.content[0];
         if ($scope.dataProfile.id_tipe == 1) {
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

    console.log("Getting Portfolios for " + idHost);
    userService.getPortofolios(idHost).
     success(function(data, status, header, config){
       console.log("success getting Portfolio");
         $scope.dataPortofolios = data.content;
         console.log(data);
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

    userService.getProductsEager(10,1).success(function(data, status, header, config){
      console.log(data);
      $scope.dataProducts = data.content.products_with_images;
      var tempData = data.content.products_with_images;


      // console.log(tempData.length);
      // for (var i = 0; i < tempData.length; i++){
      //   console.log(tempData[i].images);
      //   var tempImage = tempData[i].images.split(";");
      //   console.log(tempImage);
      //
      //   for(var j = 0; j < tempImage.length - 1; j++){
      //     console.log(tempImage[j]);
      //     var image = tempImage[j].split(",");
      //     console.log(i);
      //     console.log(image);
      //   }
      // }
      // console.log(tempImages);
      // var prodImages = tempImages;
      // console.log(prodImages);
      $scope.dataProducts.forEach(function(item){
        // var tempImg = item.images.split(';');
        // //console.log(tempImg);
        // //var img = tempImg[0].split(',');
        // var imgArr = [];
        // tempImg.forEach(function(x){
        //   var img = x.split(",");
        //   //console.log(img);
        //   var imgObj = {
        //     id: img[0],
        //     src: img[1]
        //   }
        //   //console.log(imgObj);
        //   imgArr.push(imgObj);
        //   console.log(imgArr);
        // })

        //console.log(img);
        // var imgObj = {
        //   id: img[0],
        //   src: img[1]
        // }
        //console.log(imgObj);
        // imgArr.push(imgObj);
        // console.log(imgArr);
        // tempImg.forEach(function(x){
        //   var imgArr = [];
        //   var img = x.split(',');
        //   var imgObj = {
        //     id: img[0],
        //     src: img[1]
        //   }
        //   imgArr.push(imgObj);
        //   console.log(imgArr);
        // })
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
        console.log(item);

        // var imgObj = {
        //   featured_img: imgs.shift(),
        //   other_imgs: imgs.filter(imgData => imgData && imgData.id)
        // };
        //
        // console.log(imgObj);
      })


      console.log($scope.dataProducts);

     }).error(function(data, status, header, config){
         console.log(data.message);
     });

    // userService.getProductsEager().success(function(data, status, header, config){
    //      $scope.dataProductEager = data;
    //      // console.log($scope.dataProductEager.images.length);
    //      // for (var i = 0; i < $scope.dataProductEager.images.length; i++) {
    //      //     if ($scope.dataProductEager.images[i].id_product == $scope.dataProductEager.product[i].id_product) {
    //      //         console.log($scope.dataProductEager.images[i].id_product);
    //      //         $scope.data = angular.extend({},$scope.dataProductEager.images[i],$scope.dataProductEager.product[i]);
    //      //     }
    //      // }
    //      // console.log($scope.dataProductEager.images[0].id_product);
    //      console.log(data);
    //      // console.log($scope.data);
    //  }).error(function(data, status, header, config){
    //      console.log(data.message);
    //  });

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
