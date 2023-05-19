SmartCardApp.factory('HistoryExitService',['$http','$rootScope',function($http,$rootScope){
    var hostname = $rootScope.hostname;
    var service = {};
    service.GetHistoryExit = fnGetHistoryExit;
    function fnGetHistoryExit(reqData, callback) {
        var req = {
            method: 'POST',
            url: hostname+'/user/get_history_exit',
            data: reqData
        }
        $http(req).then(function(respData){callback(respData.data);}, function(respData){});
    }
    return service;
}]);