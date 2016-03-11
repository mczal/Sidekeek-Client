var appController = angular.module('appController', []);
var urlAPI = "http://localhost:3000/sideAPIkeek"
var token = "eyJhbGciOiJIUzI1NiJ9.dXNlcg.2Tbs8TkRGe7ZNu4CeiR5BXpK7-MMQZXc6ZTOLZiBoLQ";
idTipe = null;
statTemp = null;

function generateUniqueCode(){
   var text = "";
   var possible = "[&900qnw@ml;kNI./UBI~`189`aklm3076IAKU-PASTI-BISA';l";

   for( var i=0; i < 10; i++ )
       text += possible.charAt(Math.floor(Math.random() * possible.length));

   return text;
}

appController.controller('HomeController',['$scope','$http',
    function($scope,$http){
        $.ajax({
            url: urlAPI + '/getCategories',
            method: "POST",
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data:{
                token: token
            },
            success: function(response){
                $scope.categoriesData = response;
            },
            error: function(xhr, status, error){
                console.log(error);
            }
        });
        $.ajax({
            url: urlAPI + '/getProvince',
            method: "POST",
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data:{
                token: token
            },
            success: function(response){
                $scope.provinceData = response;
            },
            error: function(xhr, status, error){
                console.log(error);
            }
        });
    }
]);

appController.controller('StartController', ['$scope', '$http',
    function ($scope, $http){

        $('#button-goods').hide();
        $('#button-service').hide();

        $.ajax({
            url: urlAPI + '/getCategories',
            method: "POST",
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data:{
                token: token
            },
            success: function(response){
                $scope.categoriesData = response;
            },
            error: function(xhr, status, error){
                console.log(error);
            }
        });

        $scope.serviceGoodOnClick = function(id){
            if(id==1){
                idTipe = "goods";
                $('#button-goods').show();
                $('#button-service').hide();
            }else{
                idTipe = "services";
                $('#button-goods').hide();
                $('#button-service').show();
            }
        }

        $scope.submitFirst = function(){
            localStorage.statTemp = generateUniqueCode();
            $.ajax({
                url: urlAPI + '/firstRegister',
                method: 'POST',
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                data:{
                    token: token,
                    tipe: idTipe,
                    statTemp: localStorage.statTemp
                },
                success: function(response){
                    console.log(response.message +" "+ idTipe);
                },
                error: function(xhr, status, error){
                    console.log(xhr);
                }
            });
        }

        $scope.submit = function(){
            var categories = $scope.form.categories;
            var company = $scope.form.company;
            var thread = $scope.form.thread;
            statTemp = localStorage.statTemp;
            $.ajax({
                url: urlAPI + '/secondRegister',
                method: "POST",
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                data:{
                    token: token,
                    cat: categories,
                    statTemp: statTemp,
                    compTitle: company,
                    threadTitle: thread
                },
                success: function(response){
                    console.log(response);
                },
                error: function(xhr, status, error){
                    console.log(error);
                }
            });
        }
    }
]);

appController.controller('SignUpController', ['$scope', '$http',
    function($scope, $http){
        $scope.signUp = function(){
            var email = $scope.form.email;
            var pass = $scope.form.password;
            var confirm = $scope.form.confirmation;
            $.ajax({
                url: urlAPI + '/sign-up',
                method: 'POST',
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                data:{
                    token: token,
                    statTemp: statTemp,
                    email: email,
                    password: pass,
                    confirmation: confirm
                },
                success: function(response){
                    console.log(response);
                },
                error: function(xhr, status, error){
                    console.log(error);
                }
            });
        }
    }
]);

appController.controller('ProfileController', ['$scope', '$http',
    function($scope, $http){
        $.ajax({
            url : urlAPI + '/getProfile',
            method : 'POST',
            contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
            data:{
                token : token,
                email : localStorage.getItem('emailHost')
            },
            success: function(response){
                $scope.dataProfile = response[0];
            },
            error: function(xhr, status, error){
                console.log(error);
            }
        });

        $.ajax({
            url : urlAPI + '/getProducts',
            method : 'POST',
            contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
            data:{
                token : token,
                email : localStorage.getItem('emailHost')
            },
            success: function(response){
                $scope.dataProducts = response;
            },
            error: function(xhr, status, error){
                console.log(error);
            }
        });

        $.ajax({
            url : urlAPI + '/getPortofolios',
            method : 'POST',
            contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
            data:{
                token : token,
                email : localStorage.getItem('emailHost')
            },
            success: function(response){
                $scope.dataPortofolios = response;
            },
            error: function(xhr, status, error){
                console.log(error);
            }
        });
    }
]);

appController.controller('EditProfileController', ['$scope', '$http',
    function($scope, $http){
        $.ajax({
            url : urlAPI + '/getProfile',
            method : 'POST',
            contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
            data:{
                token : token,
                email : localStorage.getItem('emailHost')
            },
            success: function(response){
                $scope.dataProfile = response[0];
            },
            error: function(xhr, status, error){
                console.log(error);
            }
        });

        $.ajax({
            url : urlAPI + '/getProducts',
            method : 'POST',
            contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
            data:{
                token : token,
                email : localStorage.getItem('emailHost')
            },
            success: function(response){
                $scope.dataProducts = response;
            },
            error: function(xhr, status, error){
                console.log(error);
            }
        });

        $.ajax({
            url : urlAPI + '/getPortofolios',
            method : 'POST',
            contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
            data:{
                token : token,
                email : localStorage.getItem('emailHost')
            },
            success: function(response){
                $scope.dataPortofolios = response;
            },
            error: function(xhr, status, error){
                console.log(error);
            }
        });

        $.ajax({
            url: urlAPI + '/getProvince',
            method: "POST",
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data:{
                token: token
            },
            success: function(response){
                $scope.provinceData = response;
            },
            error: function(xhr, status, error){
                console.log(error);
            }
        });

        $scope.addPorto = function (){
            $(".overlay").show();
            $(".offcanvas-portofolio").show();
        }

        var produk = [
        '<div class="edit-profile-full">',
        '                        <div class="row" ng-repeat="dataProduct in dataProducts">',
        '                            <div class="col-lg-4">',
        '                                <div class="upload text-center">',
        '                                    <div class="box container-fluid">',
        '                                        <div class="file-upload text-center">',
        '                                            <img src="assets/img/uploadfoto.png" alt="" />',
        '                                            <input type="file" name="file" id="file-product-1" class="inputfile inputfile-1" data-multiple-caption="{count} files selected" multiple />',
        '                                            <label for="file-product-1"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/></svg><span>Choose a file&hellip;</span></label>',
        '                                        </div>',
        '                                    </div>',
        '                                    <div class="box-kecil">',
        '                                        <img src="assets/img/uploadfoto.png" alt="" />',
        '                                    </div>',
        '                                    <div class="box-kecil">',
        '                                        <img src="assets/img/uploadfoto.png" alt="" />',
        '                                    </div>',
        '                                    <div class="box-kecil">',
        '                                        <img src="assets/img/uploadfoto.png" alt="" />',
        '                                    </div>',
        '                                </div>',
        '                            </div>',
        '                            <div class="col-lg-8">',
        '                                <div class="form-group form-group-xl">',
        '                                    <input type="text" class="form-control" placeholder="Nama Produk" value="" ng-model="form.namaProduk">',
        '                                </div>',
        '                                <div class="form-group form-group-xl">',
        '                                    <input type="text" class="form-control" placeholder="Harga" value="" ng-model="form.harga">',
        '                                </div>',
        '                                <div class="form-group">',
        '                                    <textarea type="text" class="form-control" rows="10" placeholder="Product Description" ng-model="form.descProduk"></textarea>',
        '                                </div>',
        '                            </div>',
        '                        </div>',
        '                    </div>'
        ].join('');
        $scope.addProduk = function (){
            $(".add-produk").append(produk);
        }
    }
]);
