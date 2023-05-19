SmartCardApp.controller('LoginCtrl', ['$scope','$rootScope','$location','$cookies','LoginService',
function($scope,$rootScope,$location,$cookies,LoginService) {
    (function initController() {
        $rootScope.sh_header = false;
    })();

    $scope.Login = fnLogin;
    function fnLogin(){
        if($scope.userName==undefined || $scope.userName==null || $scope.userName==""){
            toastr.error("Vui lòng nhập tên đăng nhập");
            return;
        } 
        if($scope.passWord==undefined || $scope.passWord==null || $scope.passWord==""){
            toastr.error("Vui lòng nhập mật khẩu");
            return;
        }
        $("#md_load").modal("show");
        var reqData = {};
        reqData.user_name = $scope.userName;
        reqData.pass_word = $scope.passWord;
        LoginService.Login(reqData,function (respData){
            $("#md_load").modal("hide");
            if(respData.code == 200){
                $cookies.put("session",respData.session);
                $cookies.put("user_name",$scope.userName);
                $rootScope.user_name_header = $cookies.get("user_name");
                $location.path("/dashboard");
            }else {
                toastr.error(respData.description);
            }
        });
    }
}]);