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

appController.controller('IndexController', ['$scope', '$http',
    function($scope, $http){
        // array of month
        var arrOfMonth = [];
        arrOfMonth['Jan']='01';
        arrOfMonth['Feb']='02';
        arrOfMonth['Mar']='03';
        arrOfMonth['Apr']='04';
        arrOfMonth['May']='05';
        arrOfMonth['Jun']='06';
        arrOfMonth['Jul']='07';
        arrOfMonth['Aug']='08';
        arrOfMonth['Sep']='09';
        arrOfMonth['Oct']='10';
        arrOfMonth['Nov']='11';
        arrOfMonth['Des']='12';

        // current time using time interval (every 5 second)
        function curDate(){
            var cur = new Date();
            var temp = cur +" ";
            var temp2 = temp.split(" ");
            return temp2[3]+"-"+temp2[2]+"-"+arrOfMonth[temp2[1]]+" "+temp2[4];
        }

        $scope.login = function(){
            var email = $('#emailUser').val();
            var pass = $('#passwordUser').val();
            localStorage.setItem('emailHost', email);
            $http({
                method: 'POST',
                url: urlAPI + '/login',
                headers: {
                   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                data: $.param({
                    token: token,
                    email: email,
    				password: pass,
    				timestamp: curDate()
                }),
            }).success(function(data, status, header, config){
                localStorage.setItem('session', data.session);
                sessionStorage.setItem("activeTab", 1);
                $('#btn-hide').addClass('hide');
                $('.dropdown').addClass('hide');
                $('#img-acc').removeClass('hide');
            }).error(function(data, status, header, config){
                console.log(data.message);
            });
        }

        // logout session
        $scope.logout = function(){
            $http({
                method: 'POST',
                url: urlAPI + '/logout',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                data: $.param({
                    token: token,
                    sessionCode: localStorage.getItem('session')
                }),
            }).success(function(data, status, header, config){
                localStorage.removeItem('emailHost');
                localStorage.removeItem('session');
                sessionStorage.removeItem('activeTab');
                $('#btn-hide').removeClass('hide');
                $('.dropdown').removeClass('hide');
                $('#img-acc').addClass('hide');
            }).error(function(data, status, header, config){
                console.log(data.message);
            });
        }

        //check if the session is still available
        $http({
            method: 'POST',
            url: urlAPI + '/integrityCheck',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token: token,
                sessionCode: localStorage.getItem('session')
            }),
        }).success(function(data, status, header, config){
            if (data.status == "forbidden") {
                $('#btn-hide').removeClass('hide');//sign-up button
                $('.dropdown').removeClass('hide');//login button
                $('#img-acc').addClass('hide');//profile pict
            }else{
                $('#btn-hide').addClass('hide');
                $('.dropdown').addClass('hide');
                $('#img-acc').removeClass('hide');
            }
        }).error(function(data, status, header, config){
            console.log(data.message);
        });

        $http({
            method: 'POST',
            url: urlAPI + '/getProfile',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token : token,
                email : localStorage.getItem('emailHost')
            }),
        }).
        success(function(data, status, header, config){
            temp = data[0].email + " ";
            namaUser = temp.split("@");
            $scope.namaUser = namaUser[0];
        }).
        error(function(data, status, header, config){
            console.log(data.message);
        });
    }
]);

appController.controller('HomeController',['$scope','$http',
    function($scope,$http){
        $http({
            method: 'POST',
            url: urlAPI + '/getCategories',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token: token
            }),
        }).success(function(data, status, header, config){
            $scope.categoriesData = data;
        }).error(function(data, status, header, config){
            console.log(data.message);
        });

        $http({
            method: 'POST',
            url: urlAPI + '/getProvince',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token: token
            }),
        }).success(function(data, status, header, config){
            $scope.provinceData = data;
        }).error(function(data, status, header, config){
            console.log(data.message);
        });
    }
]);

appController.controller('StartController', ['$scope', '$http',
    function ($scope, $http){

        $('#button-goods').hide();
        $('#button-service').hide();

        $http({
            method: 'POST',
            url: urlAPI + '/getCategories',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token: token
            }),
        }).success(function(data, status, header, config){
            $scope.categoriesData = data;
        }).error(function(data, status, header, config){
            console.log(data.message);
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
            $http({
                url : urlAPI +'/firstRegister',
                method : 'POST',
                header : {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                data:$.param({
                    token : token,
                    tipe : idTipe,
                    statTemp : localStorage.statTemp
                }),
            }).success(function(data, status, header, config){
                console.log(data.message + " " + idTipe);
            }).error(function(data, status, header, config){
                console.log(data.message);
            });
        }

        $scope.submit = function(){
            var categories = $scope.form.categories;
            var company = $scope.form.company;
            var thread = $scope.form.thread;
            statTemp = localStorage.statTemp;
            $http({
                url : urlAPI + '/secondRegister',
                method : 'POST',
                header : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
                data : $.param({
                    token : token,
                    cat : categories,
                    statTemp : statTemp,
                    compTitle : company,
                    threadTitle : thread
                }),
            }).success(function(data, status, header, config){
                console.log(data.message);
            }).error(function(data, statuc, header, config){
                console.log(data.message);
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
            $http({
                utl: urlAPI + '/sign-up',
                method: 'POST',
                header: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
                data: $.param({
                    token: token,
                    statTemp: statTemp,
                    email: email,
                    password: pass,
                    confirmation: confirm
                }),
            }).success(function(data, status, header, config){
                console.log(data);
            }).error(function(data, status, header, config){
                console.log(data);
            });
        }
    }
]);

appController.controller('ProfileController', ['$scope', '$http',
    function($scope, $http){
        $http({
            method: 'POST',
            url: urlAPI + '/getProfile',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token : token,
                email : localStorage.getItem('emailHost')
            }),
        }).
        success(function(data, status, header, config){
            $scope.dataProfile = data[0];
        }).
        error(function(data, status, header, config){
            console.log(data.message);
        });

        $http({
            method: 'POST',
            url: urlAPI + '/getProducts',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token : token,
                email : localStorage.getItem('emailHost')
            }),
        }).
        success(function(data, status, header, config){
            $scope.dataProducts = data;
        }).
        error(function(data, status, header, config){
            console.log(data.message);
        });

        $http({
            method: 'POST',
            url: urlAPI + '/getPortofolios',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token : token,
                email : localStorage.getItem('emailHost')
            }),
        }).
        success(function(data, status, header, config){
            $scope.dataPortofolios = data;
        }).
        error(function(data, status, header, config){
            console.log(data.message);
        });

        $scope.viewPortoDetails = function (idPortofolio){
            $http({
                method: 'POST',
                url: urlAPI + '/getPortofolioDetail',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                data: $.param({
                    token : token,
                    idPortofolio : idPortofolio
                }),
            }).success(function(data, status, header, config){
                $scope.portoDetail = data[0];
                $("#freeze").css({'position': 'fixed', 'overflow-y': 'scroll', 'width': '100%'});
                $(".overlay-portofolio-details").show();
            }).error(function(data, status, header, config){
                console.log(data.message);
            });
        }

        $scope.close = function(){
            $("#freeze").css({'position': '', 'overflow-y': '', 'width': ''});
            $(".overlay-portofolio-details").hide();
        }
    }
]);

appController.controller('EditProfileController', ['$scope', '$http', '$compile', '$rootScope', 'FileUploader',
    function($scope, $http, $compile, $rootScope, FileUploader){
        $scope.uploader = new FileUploader();
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

        $scope.editPorto = function(idPortofolio){
            $http({
                method: 'POST',
                url: urlAPI + '/getPortofolioDetail',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                data: $.param({
                    token : token,
                    idPortofolio : idPortofolio
                }),
            }).success(function(data, status, header, config){
                $scope.portoDetails = data[0];
                $("#freeze").css({'position': 'fixed', 'overflow-y': 'scroll', 'width': '100%'});
                $(".overlay-portofolio-edit").show();
                $(".offcanvas-portofolio").show();
            }).error(function(data, status, header, config){
                console.log(data.message);
            });
        }

        $scope.closeOffcanvas_edit = function(){
            $("#freeze").css({'position': '', 'overflow-y': '', 'width': ''});
            $(".overlay-portofolio-edit").hide();
            $(".offcanvas-portofolio").hide();
        }

        $scope.addNewPortofolio = function (){
            var imgBase64 = "";
            $http({
                method: 'POST',
                url: urlAPI + '/addNewPortofolio',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                data: $.param({
                    token : token,
                    sessionCode : localStorage.getItem('session'),
                    title : $scope.form.title,
                    description : $("#portoDesc").val(),
                    timestamp : curDate(),
                    imgBase64 : imgBase64
                }),
            }).success(function(data, status, header, config){
                window.location.reload();
                $(".overlay").hide();
                $(".offcanvas-portofolio").hide();
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
                }),
            }).success(function(data, status, header, config){
                $("#add_produk").show();
                window.location.reload();
                console.log("success add new product. Id Prod="+data.idProduct);
            }).error(function(data, status, header, config){
                console.log(data.message);
            });
        }

        $scope.editPortofolio = function(idPortofolio){
            var imgBase64 = "";
            $http({
                method: 'POST',
                url: urlAPI + '/editPortofolio',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                data: $.param({
                    token : token,
                    sessionCode : localStorage.getItem("session"),
                    idPortofolio : idPortofolio,
                    timestamp : curDate(),
                    title : $scope.portoDetails.title,
                    description : $("#portoDesc_edit").val(),
                    imgBase64 : imgBase64
                }),
            }).success(function(data, status, header, config){
                window.location.reload();
                console.log("berhasil");
            }).error(function(data, status, header, config){
                console.log(data.message);
            });
        }

        $scope.editProductDesc = function(idProduct){
            var namaProduk = $("#product_name_"+idProduct).val();
            var harga = $("#price_"+idProduct).val();
            var productDesc = $("#product_desc_"+idProduct).val();
            var buttonVal = $("#button").val();
            console.log(namaProduk);
            console.log(harga);
            console.log(productDesc);
            console.log(idProduct);
            $http({
                method: 'POST',
                url: urlAPI + '/editProductDesc',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                data: $.param({
                    token : token,
                    sessionCode : localStorage.getItem("session"),
                    idProduct : idProduct,
                    namaProduk : namaProduk,
                    harga : harga,
                    productDesc : productDesc,
                    timestamp : curDate()
                }),
            }).success(function(data, status, header, config){
                window.location.reload();
                console.log(data.message);
                console.log("success edit product.");
            }).error(function(data, status, header, config){
                console.log(data.message);
            });
        }

        $scope.editProfiledesc = function (){
            var companyName = $scope.dataProfile.company_name;
            var title = $scope.dataProfile.title;
            var tagline = $scope.dataProfile.tagline;
            $http({
                method: 'POST',
                url: urlAPI + '/editProfileFull',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                data: $.param({
                    token : token,
                    sessionCode : localStorage.getItem("session"),
                    timestamp : curDate(),
                    companyName : companyName,
                    title : title,
                    businessField : $("#category").val(),
                    tagline : tagline,
                    companyDesc : $("#companyDesc").val(),
                    region : $("#region").val(),
                    address : $("#address").val()
                }),
            }).success(function(data, status, header, config){
                window.location.reload();
                alert(data.message);
                console.log("success edit profile");
            }).error(function(data, status, header, config){
                console.log(data.message);
            });
        }

        $http({
            method: 'POST',
            url: urlAPI + '/getProfile',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token : token,
                email : localStorage.getItem('emailHost')
            }),
        }).
        success(function(data, status, header, config){
            $scope.dataProfile = data[0];
        }).
        error(function(data, status, header, config){
            console.log(data.message);
        });

        $http({
            method: 'POST',
            url: urlAPI + '/getPortofolios',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token : token,
                email : localStorage.getItem('emailHost')
            }),
        }).
        success(function(data, status, header, config){
            $scope.dataPortofolios = data;
        }).
        error(function(data, status, header, config){
            console.log(data.message);
        });

        $http({
            method: 'POST',
            url: urlAPI + '/getCities',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token: token
            }),
        }).success(function(data, status, header, config){
            $scope.citiesData = data;
        }).error(function(data, status, header, config){
            console.log(data.message);
        });

        $http({
            method: 'POST',
            url: urlAPI + '/getCategories',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token: token
            }),
        }).success(function(data, status, header, config){
            $scope.categoriesData = data;
        }).error(function(data, status, header, config){
            console.log(data.message);
        });

        $http({
            method: 'POST',
            url: urlAPI + '/getProducts',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token : token,
                email : localStorage.getItem('emailHost')
            }),
        }).success(function(data, status, header, config){
            $scope.dataProducts = data;
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
            '                        </div>'].join('');
            $(".add-produk").append($compile(produk)($scope));
            $("#add_produk").hide();
        }
    }
]);

appController.controller('AccountController', ['$scope','$http',
    function($scope, $http){
        $http({
            method: 'POST',
            url: urlAPI + '/getProfile',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token : token,
                email : localStorage.getItem('emailHost')
            }),
        }).
        success(function(data, status, header, config){
            $scope.dataProfile = data[0];
        }).
        error(function(data, status, header, config){
            console.log(data.message);
        });

        $http({
            method: 'POST',
            url: urlAPI + '/getCities',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token: token
            }),
        }).success(function(data, status, header, config){
            $scope.citiesData = data;
        }).error(function(data, status, header, config){
            console.log(data.message);
        });
    }
]);
