var SmartCardApp = angular.module('SmartCardApp',[
    'ui.router',
    'ui.bootstrap',
    'oc.lazyLoad',
    'ngSanitize',
    'uiRouterStyles',
    'ngCookies',
    'ngTable'
]);
SmartCardApp.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
       
    });
}]);

SmartCardApp.config(['$controllerProvider', function ($controllerProvider) {
    // this option might be handy for migrating old apps, but please don't use it
    // in new ones!
    $controllerProvider.allowGlobals();
}]);

SmartCardApp.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
    var app = './app';
    $urlRouterProvider.otherwise('/login');
    $stateProvider
    .state("login", {
        url: "/login",
        templateUrl: app+'/login/login.view.html',
        data: {
            pageTitle: 'Login',
            css: [`./assets/css/custom.css`]
        },
        controller: "LoginCtrl",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'SmartCardApp',
                    files: [
                        app+'/login/login.controller.js',
                        app+'/login/login.service.js'
                    ]
                });
            }]
        }
    })
    .state("dashboard", {
        url: "/dashboard",
        templateUrl: app+'/dashboard/dashboard.view.html',
        data: {
            pageTitle: 'Dashboard',
            css: [`./assets/css/custom.css`]
        },
        controller: "DashboardCtrl",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'SmartCardApp',
                    files: [
                        app+'/dashboard/dashboard.controller.js',
                        app+'/dashboard/dashboard.service.js'
                    ]
                });
            }]
        }
    })
    .state("historyexit", {
        url: "/history-exit",
        templateUrl: app+'/historyexit/historyexit.view.html',
        data: {
            pageTitle: 'HistoryExit',
            css: [`./assets/css/custom.css`]
        },
        controller: "HistoryExitCtrl",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'SmartCardApp',
                    files: [
                        app+'/historyexit/historyexit.controller.js',
                        app+'/historyexit/historyexit.service.js'
                    ]
                });
            }]
        }
    })
    .state("profile", {
        url: "/profile",
        templateUrl: app+'/profile/profile.view.html',
        data: {
            pageTitle: 'Profile',
            css: [`./assets/css/custom.css`]
        },
        controller: "ProfileCtrl",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'SmartCardApp',
                    files: [
                        app+'/profile/profile.controller.js',
                        app+'/profile/profile.service.js'
                    ]
                });
            }]
        }
    });
}]);

SmartCardApp.controller('AppController', ['$scope', '$rootScope', '$location','$cookies','LoginService',
function ($scope, $rootScope, $location,$cookies,LoginService) {
    (function initController() {
        $rootScope.sh_header = true;
        $rootScope.user_name = $cookies.get("user_name");
        if($rootScope.user_name==undefined || $rootScope.user_name==null){
            $rootScope.user_name = "";
        }
        $rootScope.user_name_header = $cookies.get("user_name");


        $scope.Logout = fnLogout;
        function fnLogout(){
            $("#md_load").modal("show");
            var reqData = {};
            reqData.session = $cookies.get("session");
            LoginService.Logout(reqData,function(respData){
                $("#md_load").modal("hide");
                if(respData.code == 200){
                    $cookies.remove("session");
                    $cookies.remove("user_name");
                    $location.path("/login");
                }else{
                    toastr.error(respData.description);
                }
            });
        }
    })();

}]);

SmartCardApp.run(["$rootScope", function ($rootScope) {
    // $rootScope.hostname = "http://localhost:8080/librarymanagerapi";
    $rootScope.hostname = "https://smart-card-api.herokuapp.com";
}]);