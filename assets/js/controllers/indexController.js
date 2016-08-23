angular.module("app.index",["app.service"])
       .controller('IndexController', IndexController);

IndexController.$inject = ['$scope', '$http','userService','summaryService','uiService'];

function IndexController($scope, $http,userService,summaryService,uiService){

    temp = localStorage.getItem('emailHost') + " ";
    namaUser = temp.split("@");
    $scope.namaUser = namaUser[0];

    $scope.url = "#/start-host";

    $scope.checkHost = function(){
        sessionStorage.setItem('activeTab', 1);
        if (localStorage.getItem('tipeMember') == 0) {
            $scope.url = "#/edit-profile";
        }
    }

    // logout session
    $scope.logout = function(){
      console.log("logout");
        userService.logout().success(function(data, status, header, config){
            console.log(data);
            localStorage.clear();
            sessionStorage.clear();
            //window.location.reload();
            $('#btn-hide').removeClass('hide');
            $('.dropdown').removeClass('hide');
            $('#img-acc').addClass('hide');
        }).error(function(data, status, header, config){
            console.log(data);
            console.log(data.message);
        });
    }

    //check if the session is still available
    userService.integrityCheck().success(function(data, status, header, config){
        if (data.status == "forbidden" ) {
            $('#btn-hide').removeClass('hide');//sign-up button
            $('.dropdown').removeClass('hide');//login button
            $('#img-acc').addClass('hide');//profile pict
        }else{
            $('#btn-hide').addClass('hide');
            $('.dropdown').addClass('hide');
            $('#loginBtn').addClass('hide');
            $('#img-acc').removeClass('hide');
        }
    }).error(function(data, status, header, config){
        console.log(data.message);
    });

    summaryService.isHost().success(function(data){
        localStorage.setItem('tipeMember', data.code);
        if (data.code == 1) {
            $("#startHosting").hide();
        }else{
            $("#startHosting").show();
        }
    }).error(function(data){
        console.log(data.message);
    });



    userService.getAccount().success(function(data, status, header, config){
        console.log(data);
        if(data.success){
          console.log("success");
          console.log(data[0]);
        }else{
          console.log("failed");
          console.log(data[0]);
        }
        // $scope.dataAccount = data[0];
        // $scope.img = data[0].img_base64;
    }).
    error(function(data, status, header, config){
        console.log(data);
        console.log(data.message);
    });

    $scope.settings = function () {
        uiService.showModal(size,'settings.html');
    };
};
