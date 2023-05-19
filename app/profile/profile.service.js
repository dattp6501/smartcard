SmartCardApp.factory('ProfileService',['$http','$rootScope',function($http,$rootScope){
    var hostname = $rootScope.hostname;
    var service = {};
    service.GetProfile = fnGetProfile;
    function fnGetProfile(reqData, callback) {
        var req = {
            method: 'POST',
            url: hostname+'/user/profile',
            data: reqData
        }
        $http(req).then(function(respData){callback(respData.data);}, function(respData){});
    }
    return service;
}]);