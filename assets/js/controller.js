var appControllers = angular.module('appControllers', []);
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

function curDate(){
    var cur = new Date();
    var temp = cur +" ";
    var temp2 = temp.split(" ");
    return temp2[3]+"-"+temp2[2]+"-"+arrOfMonth[temp2[1]]+" "+temp2[4];
}

appControllers.controller('IndexController', ['$scope', '$http',
    function($scope, $http){
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
                window.location.reload();
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
                window.location.reload();
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

        $http({
            method: 'POST',
            url: urlAPI + '/getAccount',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token : token,
                email : localStorage.getItem('emailHost')
            }),
        }).
        success(function(data, status, header, config){
            $scope.dataAccount = data[0];
            $scope.img = data[0].img_base64;
        }).
        error(function(data, status, header, config){
            console.log(data.message);
        });
    }
]);

appControllers.controller('HomeController',['$scope','$http',
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

appControllers.controller('StartController', ['$scope', '$http',
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
                headers: {
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
                headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
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

appControllers.controller('SignUpController', ['$scope', '$http', '$window',
    function($scope, $http, $window){
        $scope.signUp = function(){
            var email = $scope.form.email;
            var pass = $scope.form.password;
            var confirm = $scope.form.confirmation;
            $http({
                method: 'POST',
                url: urlAPI + '/sign-up',
                headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                data: $.param({
                    token: token,
                    statTemp: statTemp,
                    email: email,
                    password: pass,
                    confirmation: confirm
                })
            }).success(function(data, status, header, config){
                console.log(data.message);
                $window.location.href = '#/confirm';
            }).error(function(data, status, header, config){
                console.log(data);
            });
        }
    }
]);

appControllers.controller('ConfirmationController', ['$scope', '$http', '$timeout', '$window', '$location',
    function($scope, $http, $timeout, $window, $location){
        var unique = $location.search().uq;
        $http({
            method: 'POST',
            url: urlAPI + '/confirmation',
            headers:{
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token: token,
                uniqueCode: unique
            })
        }).success(function(data){
            console.log(data);
            var redirectTimeout;
            var redirect = function() {
                $window.location.href = '#/home';
                // alert('redirect');
            }
            $timeout.cancel(redirectTimeout);
            redirectTimeout = $timeout(function() {
                var timeoutTime = 10000;
                redirectTimeout = $timeout(redirect, timeoutTime);
            });
        }).error(function(data){
            console.log(data.message);
        });
    }
]);

appControllers.controller('ConfirmController', ['$scope', '$http', '$timeout', '$window',
    function($scope, $http, $timeout, $window){
        var redirectTimeout;
        var redirect = function() {
            $window.location.href = '#/home';
            // alert('redirect');
        }
        $timeout.cancel(redirectTimeout);
        redirectTimeout = $timeout(function() {
            var timeoutTime = 10000;
            redirectTimeout = $timeout(redirect, timeoutTime);
        });
    }
]);

appControllers.controller('ProfileController', ['$scope', '$http',
    function($scope, $http){
        $http({
            method: 'POST',
            url: urlAPI + '/getAccount',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token : token,
                email : localStorage.getItem('emailHost')
            }),
        }).
        success(function(data, status, header, config){
            $scope.dataAccount = data[0];
            $scope.img = data[0].img_base64;
        }).
        error(function(data, status, header, config){
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
                console.log(data[0]);
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

        $scope.escape = function(keyCode){
            $("#freeze").css({'position': '', 'overflow-y': '', 'width': ''});
            $(".overlay-portofolio-details").hide();
        }
    }
]);

appControllers.controller('EditProfileController', ['$scope', '$http', '$compile', '$rootScope',
    function($scope, $http, $compile, $rootScope){
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
            var typeData = "data:" + $scope.myFile.filetype + ";";
            var base64Data = "base64," + $scope.myFile.base64;
            var imageBase64 = typeData + base64Data;
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
                    imgbase64 : imageBase64
                }),
            }).success(function(data, status, header, config){
                window.location.reload();
                // $(".overlay-portofolio-add").hide();
                // $(".offcanvas-portofolio").hide();
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
                        window.location.reload();
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
                $scope.img = data[0].img_base64;
                $scope.portoDetails = data[0];
                $("#freeze").css({'position': 'fixed', 'overflow-y': 'scroll', 'width': '100%'});
                $(".overlay-portofolio-edit").show();
                $(".offcanvas-portofolio").show();
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
                    title : $scope.dataProfile.title,
                    businessCategory : $("#category").val(),
                    companyDesc : $("#companyDesc").val()
                }),
            }).success(function(data, status, header, config){
                // window.location.reload();
                console.log(localStorage.getItem("session")+" "+curDate()+" "+idTipeProfile+" "+$scope.dataProfile.title+" "+$("#category").val()+" "+$("#companyDesc").val());
                // console.log('HAI');
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

        $http({
            method: 'POST',
            url: urlAPI + '/getPortofolios',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token : token,
                email : localStorage.getItem('emailHost')
            })
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
    }
]);

appControllers.controller('AccountController', ['$scope','$http',
    function($scope, $http){


        $scope.cancel = function(){
            window.location.reload();
        }

        $scope.editAccount = function(){
            var typeData = "data:" + $scope.fileUpload.filetype + ";";
            var base64Data = "base64," + $scope.fileUpload.base64;
            var imageBase64 = typeData + base64Data;
            console.log($scope.dataAccount.company_name);
            $http({
                method: 'POST',
                url: urlAPI + '/editAccount',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                data: $.param({
                    token: token,
                    sessionCode: localStorage.getItem('session'),
                    companyName: $scope.dataAccount.company_name,
                    imgbase64: imageBase64,
                    about: $("#about").val(),
                    handphone: $scope.dataAccount.handphone,
                    city: $("#region").val(),
                    address: $("#address").val()
                })
            }).success(function(data, status, header, config){
                console.log("success update account");
                window.location.reload();
            }).error(function(data, status, header, config){
                console.log(data.message);
            });
        }

        $http({
            method: 'POST',
            url: urlAPI + '/getAccount',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token : token,
                email : localStorage.getItem('emailHost')
            }),
        }).
        success(function(data, status, header, config){
            $scope.dataAccount = data[0];
            $scope.img = data[0].img_base64;
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
