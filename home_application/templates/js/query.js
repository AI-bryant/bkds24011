function createEStandLineChart(conf){
    var myChart = echarts.init(document.getElementById(conf.selector));

    var series = [];
    var eachSeries = [];
    for (var i in conf.series) {
        var date = new Date(conf.series[i][0] * 1000);
        eachSeries.push([date, conf.series[i][1]])
    }

    series.push({
        name: "sys_mem_usage",
        type: 'line',
        data: eachSeries,
    });

    myChart.setOption({
        tooltip : {
            trigger: 'axis',
            formatter: function (datas) {
                var date = datas[2][0];
                var timeStr = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('/')
                               + ' ' +[date.getHours(), date.getMinutes()].join(':');
                return datas[0] + "<br>" + timeStr + ": " + datas[2][1];
            }
        },
        calculable: true,
        xAxis: [
            {
                type : 'time',
            }
        ],
        yAxis: [
            {
                type : 'value',
                splitArea : {show : true}
            }
        ],
        series: series
    });
}


$(function () {
    new Vue({
        el: '#app',
        data: function () {
            var now = new Date();
            var oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
            return {
                bizID: 2,
                bizList: [
                    {
                        "bk_biz_id": 2,
                        "bk_biz_name": "蓝鲸"
                    },
                    {
                        "bk_biz_id": 3,
                        "bk_biz_name": "测试业务"
                    }
                ],
                hostID: "123.123.123.124",
                hostList: [
                    {
                        "bk_host_innerip": "10.0.0.1",
                        "bk_host_outerip": "123.123.123.123", 
                        "bk_cloud_id": 1
                    },
                    {
                        "bk_host_innerip": "10.0.0.2",
                        "bk_host_outerip": "123.123.123.124", 
                        "bk_cloud_id": 0
                    }
                ],
                queryDatetimeRange: [oneHourAgo, now],
                realtimeData: [
                    {
                        "metric_name": "sys_disk_size",
                        "metric_value": 4.811827465891838,
                        "dimensions": "mountpoint=\"/data\""
                    },
                    {
                        "metric_name": "sys_disk_size",
                        "metric_value": 9.31935161352,
                        "dimensions": "mountpoint=\"/\""
                    },
                    {
                        "metric_name": "sys_mem_usage",
                        "metric_value": 52.0225341295366,
                        "dimensions": ""
                    }
                ],
                timeSeries: [
                    [1578399180, 0.1],
                    [1578399240, 0.3],
                    [1578399300, 0.4],
                    [1578399360, 0.6],
                    [1578399420, 0.2]
               ]
            }
        },
        mounted: function () {
            createEStandLineChart({
                selector: 'chart3_demo', // 图表容器
                series: this.timeSeries, // 图表数据
            });
        }
    })
});

