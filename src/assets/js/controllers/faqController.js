angular.module("app.faq",[])
.controller("FAQController",faqController);

faqController.$inject = ["$scope","$http","$sce"];

function faqController($scope, $http, $sce){
    $scope.head = "Basic Question";
    $scope.sub = "Sidekeek 101";
    $http.get('assets/js/JSON/faq-101.json').success(function(data){
        $scope.dataFAQ = data;
    });

    $scope.changeView = function(x){
        if (x == "basic") {
            $scope.head = "Basic Question";
            $scope.sub = "Sidekeek 101";
            $http.get('assets/js/JSON/faq-101.json').success(function(data){
                $scope.dataFAQ = data;
            });
        } else if (x == "seekr"){
            $scope.head = "Seekr Question";
            $scope.sub = "General";
            $http.get('assets/js/JSON/faq-seekr.json').success(function(data){
                $scope.dataFAQ = data;
            });
        } else if (x == "host-start"){
            $scope.head = "Host Question";
            $scope.sub = "Start Hosting";
            $http.get('assets/js/JSON/faq-host-start.json').success(function(data){
                $scope.dataFAQ = data;
            });
        } else{
            $scope.head = "Host Question";
            $scope.sub = "profile settings";
            $http.get('assets/js/JSON/faq-host-profile.json').success(function(data){
                $scope.dataFAQ = data;
            });
        }
    }
}
