# 接口文档



**重要说明：请认真阅读以下规范，功能实现但不符合规范的接口将酌情扣分**



## 接口规范

### 1. 接口请求规范

- 必须严格按照接口文档规定的请求方法 (GET/POST) 进行接口请求

- GET 请求，请使用 **查询字符串** 进行传参，如 `http://test.bk.com/host/?bk_biz_id=2&host_id=3`

- POST 请求，`content-type` 请统一设置为 `application/json`。请使用 **JSON** 格式进行传参，以下是使用 jquery 发起 post ajax 请求的例子

  ```js
  $.ajax({
      type: "post",
      url: site_url + 'release_task/',
      data: JSON.stringify({
          bk_biz_id: 2
      }),
      contentType: "application/json",
      dataType: "json",
      success: function(result) {}
  })
  ```

### 2. 接口返回规范

- 必须使用 **JSON** 格式返回数据
- 接口返回状态码必须为 **200**
- 返回格式，包括数据类型、数据结构等，必须与接口文档保持一致



## [API-01] 获取业务列表

- 请求方法及URL

```
GET /business/
```

- 请求参数

  无

- 返回结果示例

```json
{
    "result": true,
    "code": 0,
    "data": [
        {
            "bk_biz_id": 2,
            "bk_biz_name": "蓝鲸"
        },
        {
            "bk_biz_id": 3,
            "bk_biz_name": "test"
        }
    ],
    "message": "OK"
}
```

- 返回结果参数说明

| 字段    | 类型   | 描述                              |
| ------- | ------ | --------------------------------- |
| result  | bool   | 返回结果，true为成功，false为失败 |
| code    | int    | 返回码，0表示成功，其他值表示失败 |
| message | string | 错误信息                          |
| data    | list   | 结果                              |

data

| 字段        | 类型   | 描述     |
| ----------- | ------ | -------- |
| bk_biz_id   | int    | 业务ID   |
| bk_biz_name | string | 业务名称 |



## [API-02] 获取主机列表

- 请求方法及URL

```
GET /host/
```

- 请求参数示例

```json
?bk_biz_id=2
```

- 请求参数说明

| 字段      | 类型 | 必选 | 描述   |
| :-------- | ---- | ---- | ------ |
| bk_biz_id | int  | 是   | 业务id |

- 返回结果示例

```json
{
    "message": "OK",
    "code": 0,
    "data": [
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
    "result": true
}
```

- 返回结果参数说明

| 字段    | 类型   | 描述                              |
| ------- | ------ | --------------------------------- |
| result  | bool   | 返回结果，true为成功，false为失败 |
| code    | int    | 返回码，0表示成功，其他值表示失败 |
| message | string | 错误信息                          |
| data    | list   | 结果                              |

data

| 字段            | 类型   | 描述         |
| --------------- | ------ | ------------ |
| bk_host_innerip | string | 主机内网IP   |
| bk_host_outerip | string | 主机外网IP   |
| bk_cloud_id     | int    | 主机云区域ID |



## [API-03] 执行发布任务

- 请求方法及URL

```
POST /release_task/
```

- 请求参数示例

```json
{
    "bk_biz_id": 2,
    "bk_host_innerip": "10.0.0.1",
    "bk_host_outerip": "123.123.123.123",
    "bk_cloud_id": 1
}
```

- 请求参数说明

| 字段            | 类型   | 必选 | 描述                   |
| :-------------- | ------ | ---- | ---------------------- |
| bk_biz_id       | int    | 是   | 执行发布的主机业务ID   |
| bk_host_innerip | string | 是   | 执行发布的主机内网IP   |
| bk_host_outerip | string | 是   | 执行发布的主机外网IP   |
| bk_cloud_id     | int    | 是   | 执行发布的主机云区域ID |

- 返回结果示例

正常返回

```json
{
    "message": "OK",
    "code": "0",
    "data": {
        "task_id": 1
    },
    "result": true
}
```

- 返回结果参数说明

| 字段    | 类型   | 描述                              |
| ------- | ------ | --------------------------------- |
| result  | bool   | 返回结果，true为成功，false为失败 |
| code    | int    | 返回码，0表示成功，其他值表示失败 |
| message | string | 错误信息                          |
| data    | list   | 结果                              |

data

| 字段    | 类型 | 描述             |
| ------- | ---- | ---------------- |
| task_id | int  | 标准运维的任务ID |

另外，若当前主机存在正在执行的任务，即标准运维任务状态 state 处于 `CREATED`, `RUNNING`, `SUSPENDED` 这三种任务状态的其中一种时。则直接返回报错，不重复执行任务。注意，主机的唯一性由 `ip` 和 `bk_cloud_id` 两个字段共同确定

```json
{
    "message": "创建发布任务失败：当前主机存在未完成的任务",
    "code": 5501001,
    "data": null,
    "result": false
}
```



## [API-04] 查询发布任务列表

- 请求方法及URL

```
GET /release_task/
```

- 请求参数

```
?status=FINISHED
```

- 请求参数说明

| 字段   | 类型   | 必选 | 描述                                                 |
| :----- | ------ | ---- | ---------------------------------------------------- |
| status | string | 否   | 按给出的任务状态，对列表进行过滤。不传此参数则不过滤 |

- 返回结果示例

  返回数据请默认以创建时间倒序排列

```json
{
    "result": true,
    "code": 0,
    "data": [
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
    ],
    "message":"OK"
}
```

- 返回结果参数说明

| 字段    | 类型   | 描述                              |
| ------- | ------ | --------------------------------- |
| result  | bool   | 返回结果，true为成功，false为失败 |
| code    | int    | 返回码，0表示成功，其他值表示失败 |
| message | string | 错误信息                          |
| data    | list   | 结果                              |

data

| 字段            | 类型   | 描述                                                         |
| --------------- | ------ | ------------------------------------------------------------ |
| bk_host_innerip | string | 主机内网IP                                                   |
| bk_host_outerip | string | 主机外网IP                                                   |
| bk_cloud_id     | int    | 主机云区域ID                                                 |
| bk_biz_id       | int    | 主机业务ID                                                   |
| operator        | string | 操作人                                                       |
| task_id         | int    | 任务标识符                                                   |
| status          | string | 任务状态，取值与标准运维任务结果保持一致，即 CREATED, RUNNING, FAILED, SUSPENDED, REVOKED, FINISHED |
| create_time     | string | 任务创建时间，格式：`%Y-%m-%d %H:%M:%S`                      |



## [API-05] 查询主机实时数据

- 请求方法及URL

```
GET /realtime_data/
```

- 请求参数示例

```
?bk_host_outerip=123.123.123.123
```

- 请求参数说明

| 字段            | 类型   | 必选 | 描述             |
| :-------------- | ------ | ---- | ---------------- |
| bk_host_outerip | string | 是   | 查询的主机外网IP |

- 返回结果示例

```json
      
{
    "result":true,
    "code":0,
    "data":[
        {
            "metric_name":"sys_disk_size",
            "metric_value":9.319351613521576,
            "dimensions":"mountpoint=\"/\""
        },
        {
            "metric_name":"sys_disk_size",
            "metric_value":4.811827465891838,
            "dimensions":"mountpoint=\"/data\""
        },
        {
            "metric_name":"sys_mem_usage",
            "metric_value":52.0225341295366,
            "dimensions":""
        }
    ],
    "message":"OK"
}
```

- 返回结果参数说明

| 字段    | 类型   | 描述                              |
| ------- | ------ | --------------------------------- |
| result  | bool   | 返回结果，true为成功，false为失败 |
| code    | int    | 返回码，0表示成功，其他值表示失败 |
| message | string | 错误信息                          |
| data    | list   | 结果                              |

data

| 字段         | 类型   | 描述       |
| ------------ | ------ | ---------- |
| metric_name  | string | 指标名称   |
| metric_value | float  | 指标数值   |
| dimensions   | string | 维度字符串 |

若目标主机在该系统中没有发布成功的记录，请返回以下报错

```json
{
    "result": false,
    "code": 5501002,
    "data":null,
    "message":"查询失败，该主机尚未发布服务"
}
```



## [API-06] 查询主机时序数据

- 请求方法及URL

```
GET /time_series/
```

- 请求参数示例

```json
?bk_host_outerip=123.123.123.123&start_timestamp=1578969361&end_timestamp=1578972961
```

- 请求参数说明

| 字段            | 类型   | 必选 | 描述                             |
| :-------------- | ------ | ---- | -------------------------------- |
| bk_host_outerip | string | 是   | 查询的主机外网IP                 |
| start_timestamp | int    | 是   | 数据上报开始时间戳，单位：**秒** |
| end_timestamp   | int    | 是   | 数据上报结束时间戳，单位：**秒** |

- 返回结果示例

```json
{
    "message": "OK",
    "code": 0,
    "data": [
      [1578399180, 0.1],
      [1578399240, 0.3],
      [1578399300, 0.4],
      [1578399360, 0.6],
      [1578399420, 0.2]
    ]
    "result": true
}
```

- 返回结果参数说明

| 字段    | 类型   | 描述                                                         |
| ------- | ------ | ------------------------------------------------------------ |
| result  | bool   | 返回结果，true为成功，false为失败                            |
| code    | int    | 返回码，0表示成功，其他值表示失败                            |
| message | string | 错误信息                                                     |
| data    | list   | 时序数据，列表中每个元素都是长度为2的列表。例如，在 `[1578399180, 0.1]` 中，`1578399180` 代表数据上报时间戳，单位为**秒**，`0.1` 代表指标值，即 **当前时间的内存使用率** |

