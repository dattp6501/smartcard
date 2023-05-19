SmartCardApp.factory('DashboardService',['$http','$rootScope',function($http,$rootScope){
    var hostname = $rootScope.hostname;
    var service = {};
    // service.Login = fnLogin;
    // function fnLogin(reqData, callback) {
    //     var req = {
    //         method: 'POST',
    //         url: hostname+'/user/login',
    //         data: reqData
    //     }
    //     $http(req).then(function(respData){callback(respData.data);}, function(respData){});
    // }

    return service;
}]);