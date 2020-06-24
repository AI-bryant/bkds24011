# SaaS开发机试说明文档

## 1. 关于考试业务

- 平台为每位考生分配了独立的业务，业务名称为**考生号的后5位**。考生仅允许对该业务下的主机进行标准运维任务创建、执行等操作。
- 考试业务一共有3台主机，包含1台真实主机和2台假主机。只有真实主机才能成功执行标准运维任务。

## 2. 静态页面可参考或直接使用`frontend`中的文件

前端代码示例中使用了 MagicBox Vue 组件库，使用方式参考：

https://magicbox.bk.tencent.com/components_vue/2.0/example/index.html#/


## 3. Vue 与 Django Template 变量语法冲突的问题

由于 Vue 与 Django Template 的变量都使用了 `{{ var }}` 的格式，因此像以下混用时，会导致渲染异常

```html
<a href="{{ django_var }}">
	{{ vue_var }}
</a>
```

解决方法：使用 Django Template 提供的忽略渲染语法，如下

```html
<a href="{{ django_var }}">
	{% verbatim %}
	{{ vue_var }}
	{% endverbatim %}
</a>
```



## 4. 相关组件接口文档链接

请注意，以下为接口文档说明地址，而非实际接口调用地址

- 业务查询：https://paas.exam.bktencent.com/esb/api_docs/system/CC/search_business/
- 主机查询：https://paas.exam.bktencent.com/esb/api_docs/system/CC/search_host/
- 根据模板ID创建任务：https://paas.exam.bktencent.com/esb/api_docs/system/SOPS/create_task/
- 开始执行任务：https://paas.exam.bktencent.com/esb/api_docs/system/SOPS/start_task/
- 查询任务状态：https://paas.exam.bktencent.com/esb/api_docs/system/SOPS/get_task_status/



## 5. 标准运维任务详情URL格式

请将 `${bk_biz_id}` 和 `${task_id}` 替换为实际值

```
https://paas.exam.bktencent.com/o/bk_sops/taskflow/execute/${bk_biz_id}/?instance_id=${task_id}
```



## 6. WebServer 数据获取URL格式

```
http://${server_ip}:${server_port}/metrics
```

1. 请求HTTP方法为 `GET`
2. 请将 `${server_ip}` 和 `${server_port}` 替换为实际值
3. 注意 URL 末尾**不要带斜杠 "/"**
4. 返回的 `Content-Type` 为 `text/plain`



## 7. Ajax请求注意事项

因为测试环境和正式环境的app访问地址携带了`/[t|o]/bk_app_id/`前缀，故需要在ajax请求地址前固定添加以上前缀，所以若你使用的是开发框架
自带的模板渲染，需要在`index.html`的`head`部分增加以下内容（`index.html`中已经提前放好，直接去掉注释即可）：

```javascript
<script type="text/javascript">
  var app_code = "{{ APP_CODE }}";			// 在蓝鲸系统里面注册的"应用编码"
  var site_url = "{{ SITE_URL }}";			// app的url前缀,在ajax调用的时候，应该加上该前缀
  var remote_static_url = "{{ REMOTE_STATIC_URL }}";   //远程资源链接，403页面需要，不要删除
  var debug_mode = JSON.parse("{{ DEBUG }}");	// 是否调试模式
</script>
```

并且在发起ajax请求时，固定添加前缀`site_url`，比如：

```javascript
<script type="text/javascript">
$.ajax({
    url: site_url + 'business/',
    type: 'GET',
    data: {},
    success: function (res) {

    }
});
</script>
```



## 8. POST请求出现403(csrf验证失败)的解决方法

在页面中引入开发框架目录下的：`static/js/csrftoken.js`，且确保在`jquery`后面引入

```html
<script src="{{ STATIC_URL }}js/csrftoken.js" type="text/javascript"></script>
```



## 9. 开发框架开启 Celery 功能

本次考试会使用到 Celery，请按以下步骤进行配置

1. 打开文件  `config/default.py`，修改配置 `IS_USE_CELERY = True`
2. 打开文件 `config/dev.py` ，修改配置 `BROKER_URL = 'amqp://guest:guest@localhost:5672//'`