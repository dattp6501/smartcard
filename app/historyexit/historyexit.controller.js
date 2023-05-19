SmartCardApp.controller('HistoryExitCtrl', ['$scope','$rootScope','$location','$cookies','HistoryExitService','$filter','NgTableParams',
function($scope,$rootScope,$location,$cookies,HistoryExitService,$filter,NgTableParams){
    (function initController(){
        $rootScope.sh_header = true;
        var session = $cookies.get("session");
        if(session==undefined || session==null || session==""){
            toastr.error("Chưa đăng nhập");
            $location.path("/login");
        }
        fnGetHistoryExit();
    })();

    function fnGetHistoryExit(){
        var reqData = {};
        reqData.session = $cookies.get("session");
        $("#md_load").modal("show");
        HistoryExitService.GetHistoryExit(reqData,function(respData){
            $("#md_load").modal("hide");
            if(respData.code == 200){
                $scope.tableDataHistoryExit = respData.result.list;
                $scope.tableParamsHistoryExit.reload();
                $scope.tableParamsHistoryExit.page(1)
            }else if(respData.code == 700){
                alert("Phiên đăng nhập củad bạn đã hết hạn");
                $location.path("/login");
            }else{
                toastr.error(respData.description);
            }
        });
    }

    $scope.tableDataHistoryExit = [];
    $scope.tableDisplayHistoryExit = [];
    $scope.tableParamsHistoryExit = new NgTableParams({
        page: 1, // show first page
        count: 10, // count per page
        sorting: {},
        filter: {}
    }, {
        total: $scope.tableDataHistoryExit.length, // length of data
        getData: function($defer, params) {
            if ($scope.tableDataHistoryExit != true) {
                var filteredData = params.filter() ?
                    $filter('filter')(($scope.tableDataHistoryExit), params.filter()) :
                    $scope.tableDataHistoryExit;
                var orderedData = params.sorting() ?
                    $filter('orderBy')(filteredData, params.orderBy()) :
                    $scope.tableDataHistoryExit;
                params.total(orderedData.length); // set total for recalc pagination
                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                $scope.tableDisplayHistoryExit = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
            }
        }
    });

    $scope.ShowDetailHistoryExit = fnShowDetailHistoryExit;
    function fnShowDetailHistoryExit(historyExit){
        $scope.HESelected = historyExit;
        console.log($scope.HESelected);
        $("#modal-he-detail").modal("show");
    }
}]);