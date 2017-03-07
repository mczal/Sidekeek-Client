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

      userService.addNewPortofolio(portfolioData).then(function(response){
             //$window.location.reload();
             if(response.error == "success"){
              swal("Success!","Portfolio added","success");
             }else{
               swal("Oops","Something went wrong. Please try again","error");
             }
         },function(response){
             console.log(response.data.message);
         });
     }

     $scope.addNewProductDesc = function(){
        var productData = {
          name: $("#product_name").val(),
          price :$("#price").val(),
          desc : $("#product-desc").val()
        }
        console.log(productData);
         userService.addNewProductDesc(productData).then(function(response){
           console.log("add new produk");
           console.log(response.data);
             $("#add_produk").show();
             for (var i = 0; i < $scope.myFile.length; i++) {
                 var typeData = "data:" + $scope.myFile[i].filetype + ";";
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
                  id : response.data.idProduct ,
                  source: imageBase64
                }
                console.log(imageData);

                 userService.addProductImage(imageData).then(function(response){
                     console.log(response.data.message);
                     debugger;
                     $window.location.reload();
                 },function(response){
                     console.log(response.data.message);
                 });
             }
             console.log("success add new product. Id Prod="+response.data.idProduct);
         },function(response){
             console.log(response.data.message);
         });
     }

     $scope.viewPortoEditDetails = function(idPortofolio){
      console.log("getting porto data");
      console.log(idPortofolio);
      userService.getPortofolioDetail(idPortofolio).then(function(response){
          console.log("success get porto detail");
             console.log(response.data);
             //$scope.img = data.content[0].img_base64;
             $scope.editPortoDetails = response.data.content[0];
            //  $scope.form.title = data.content[0].title;
         },function(response){
             console.log(response.data.message);
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
         userService.editPortofolio(newPortoData).then(function(response){
            //  console.log("berhasil");
             console.log(response.data);

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
               userService.editPortofolioImg(imgData).then(function(response){
                 if(response.error == "success"){
                  swal("Success!","Portfolio saved","success");
                 }else{
                   swal("Oops","Something went wrong. Please try again","error");
                 }
                 console.log("edit portfolio image");
                 console.log(response.data);
               })
             }
         },function(response){
             console.log(response.data.message);
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

       userService.editProductDesc(productData).then(function(response){
             //$window.location.reload();
             console.log(response.data.message);
             console.log("success edit product.");
         },function(response){
             console.log(response.data.message);
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
         userService.editProfile(newData).then(function(response){
            //  window.location.reload();
            console.log(response.data);
            activateTab(1);
             // console.log(localStorage.getItem("session")+" "+curDate()+" "+sessionStorage.getItem('idTipeProfile')+" "+$scope.dataProfile.title+" "+$("#category").val()+" "+$("#companyDesc").val());
             // console.log('HAI');
         },function(response){
             console.log(response.data.message);
         });
     }
    var idHost = localStorage.getItem('idHost');
    console.log("Getting Profile for " + idHost);
    userService.getProfile(idHost).
     then(function(response){
       if(response.data.error != "error"){
         console.log(response.data);
         $scope.dataProfile = response.data.content[0];
         if ($scope.dataProfile.id_tipe == 1) {
           $(".button_goods").css({'top': '5px', 'box-shadow': 'none', 'outline': 'none'});
           $(".button_service").css({'top': '', 'box-shadow': '', 'outline': ''});
         }else{
           $(".button_service").css({'top': '5px', 'box-shadow': 'none', 'outline': 'none'});
           $(".button_goods").css({'top': '', 'box-shadow': '', 'outline': ''});
         }
       }else{
         console.log("no profile");
       }

     },function(response){
         console.log(response.data.message);
     });

    console.log("Getting Portfolios for " + idHost);
    userService.getPortofolios(idHost).
     then(function(response){
       console.log("success getting Portfolio");
         $scope.dataPortofolios = response.data.content;
     },function(response){
         console.log(response.data.message);
     });

     summaryService.getCities()
     .then(function(response){
         $scope.citiesData = response.data;
     },function(response){
         console.log(response.data.message);
     });

     summaryService.getCategories().then(function(response){
         $scope.categoriesData = response.data;
     },function(response){
         console.log(response.data.message);
     });

    userService.getProductsEager(10,1).then(function(response){
      $scope.dataProducts = [];
      console.log(response.data);
      if(response.data.content !=null && response.data.content.products_with_images != null){
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
        console.log(item);
      });
      response.data.content.products.map(function(x){
        $scope.dataProducts.push(x);
      })
      console.log($scope.dataProducts);
    }else if(response.data.content !=null && response.data.content.products != null){
      response.data.content.products.map(function(x){
        $scope.dataProducts.push(x);
      })
      console.log($scope.dataProducts);
    }else{
      console.log("no porduct");
    }
    },function(response){
         console.log(response.data.message);
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
