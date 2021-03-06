$(function () {
    new Vue({
        el: '#app',
        data: function () {
            return {
                bizID: 2,
                bizList: [],
                hostID: "123.123.123.123",
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
                statusFilter: 'ALL',
                releaseTasks: [
                    {
                        "task_id": 27,
                        "bk_biz_id": 2,
                        "operator": "admin",
                        "bk_host_innerip": "9.146.102.136",
                        "bk_host_outerip": "123.123.123.123", 
                        "bk_cloud_id": 0,
                        "status": "FINISHED",
                        "create_time": "2020-01-14 16:53:16"
                    },
                    {
                        "task_id": 19,
                        "bk_biz_id": 2,
                        "operator": "admin",
                        "bk_host_innerip": "9.146.100.202",
                        "bk_host_outerip": "123.123.123.124", 
                        "bk_cloud_id": 0,
                        "status": "FAILED",
                        "create_time": "2020-01-12 17:11:36"
                    }
                ]
            }
        },
        methods: {
            getBizList () {
               $.ajax({
                    type: "get",
                    url: '{% url "getBizList" %}', // site_url + 'release_task/'
                    // data: JSON.stringify({
                    //     bk_biz_id: 2
                    // }),
                    contentType: "application/json",
                    dataType: "json",
                    success: function(res) {
                        this.bizList = [];
                        for (var i =0; i<res.length;i++) {
                            var obj = {
                                'bk_biz_id': res[i]['bk_biz_id'],
                                'bk_biz_name': res[i]['bk_biz_name']
                            };
                            this.bizList.push(obj)
                        }
                        console.log('bizList:');
                        console.log(this.bizList)
                    }
                })
            },
        },
        mounted () {
            alert('created');
            this.getBizList()
        },
        created () {
            alert('created');
            this.getBizList()
        }
    })
});
