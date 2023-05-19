SmartCardApp.controller('DashboardCtrl', ['$scope','$rootScope','$location','$cookies','DashboardService',
function($scope,$rootScope,$location,$cookies,DashboardService){
    (function initController(){
        $rootScope.sh_header = true;
        var session = $cookies.get("session");
        if(session==undefined || session==null || session==""){
            toastr.error("Chưa đăng nhập");
            $location.path("/login");
        }
        var data1 = [{
            name: 'ra vào bãi đỗ xe',
            data: [43934, 48656, 65165, 81827, 112143, 142383,
                171533, 165174, 155157, 161454, 154610]
        }, {
            name: 'Mục 2',
            data: [24916, 37941, 29742, 29851, 32490, 30282,
                38121, 36885, 33726, 34243, 31050]
        }, {
            name: 'Mục 3',
            data: [11744, 30000, 16005, 19771, 20185, 24377,
                32147, 30912, 29243, 29213, 25663]
        }, {
            name: 'Mục 4',
            data: [null, null, null, null, null, null, null,
                null, 11164, 11218, 10077]
        }];
        var xdata1 = {
            "title": "Thời gian",
            "list": ['01/2022','02/2022','03/2022','04/2022','05/2022','06/2022','07/2022','08/2022','09/2022','10/2022','11/2022']
        }
        var yData1 = {
            "title": "Số lượt",
            "list": []
        }
        initLineChart(data1,"line-stats-user-chart1",'Biểu đồ thống kê theo từng tháng',xdata1,yData1);
        //
        var data2 = [{
            name: 'Điểm',
            data: [43934, 48656, 65165, 81827, 112143, 142383,
                171533, 165174, 155157, 161454, 154610]
        }];
        var xdata2 = {
            "title": "Thời gian",
            "list": ['01/2022','02/2022','03/2022','04/2022','05/2022','06/2022','07/2022','08/2022','09/2022','10/2022','11/2022']
        }
        var yData2 = {
            "title": "Điểm",
            "list": []
        }
        initLineChart(data2,"line-stats-user-chart2",'Biểu đồ thống kê điểm theo từng tháng',xdata2,yData2);
    })();


    function initLineChart(data,id,title,xData,yData){
        Highcharts.chart(id, {
            chart:{
                backgroundColor: '#ece5e5',
                type: 'line'
            },
            title: {
                text: title
            },
            subtitle: {
                text: ''
            },
        
            yAxis: {
                title: {
                    text: yData.title
                }
            },
            xAxis: {
                categories: xData.list,
                title:{
                    text: xData.title
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            series: data,
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            },
            credits: {// an logo highchart.com
                enabled: false
            },
            accessibility:{
                enabled: false
            },
            exporting: {
                enabled: false
            }
        });
    }
}]);