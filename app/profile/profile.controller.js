SmartCardApp.controller('ProfileCtrl', ['$scope','$rootScope','$location','$cookies','ProfileService',
function($scope,$rootScope,$location,$cookies,ProfileService){
    (function initController(){
        $rootScope.sh_header = true;
        var session = $cookies.get("session");
        if(session==undefined || session==null || session==""){
            toastr.error("Chưa đăng nhập");
            $location.path("/login");
        }

        fnGetProfile();
    })();

    function fnGetProfile(){
        $("#md_load").modal("show");
        var reqData = {};
        reqData.session = $cookies.get("session");
        ProfileService.GetProfile(reqData,function(respData){
            $("#md_load").modal("hide");
            if(respData.code == 200){
                $scope.user = respData.result;
                $scope.user.image = '';
            }else if(respData.code == 700){
                $cookies.remove("session");
                $cookies.remove("user_name");
                $location.path("/login");
            }
        });
    }

    $scope.ShowUpdateProfile = fnShowUpdateProfile;
    function fnShowUpdateProfile(){
        $("#modal-user-detail").modal("show");
    }

    $scope.UpdateProfile = fnUpdateProfile;
    function fnUpdateProfile(){
        if($scope.user.full_name==undefined || $scope.user.full_name==''){
            toastr.error("Vui lòng nhập tên người dùng");
            return;
        }
        if($scope.user.address==undefined || $scope.user.address==null){
            $scope.user.address = '';
        }
    }
}]);