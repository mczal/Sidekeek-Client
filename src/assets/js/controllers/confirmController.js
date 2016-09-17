angular.module("app.confirm",[])
       .controller('ConfirmController', confirmController);

confirmController.$inject = ['$scope', '$http', '$timeout', '$window'];

function confirmController($scope, $http, $timeout, $window){
    var redirectTimeout;
    var redirect = function() {
        $window.location.href = '#/home';
        $window.location.reload();
    }
    $timeout.cancel(redirectTimeout);
    redirectTimeout = $timeout(function() {
        var timeoutTime = 10000;
        redirectTimeout = $timeout(redirect, timeoutTime);
    });
};
