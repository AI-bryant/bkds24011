# -*- coding: utf-8 -*-
"""
Tencent is pleased to support the open source community by making 蓝鲸智云PaaS平台社区版 (BlueKing PaaS Community
Edition) available.
Copyright (C) 2017-2020 THL A29 Limited, a Tencent company. All rights reserved.
Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
You may obtain a copy of the License at
http://opensource.org/licenses/MIT
Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
specific language governing permissions and limitations under the License.
"""
import json
from django.shortcuts import render
from blueking.component.shortcuts import get_client_by_request, get_client_by_user
from django.http import JsonResponse, HttpResponse

# 开发框架中通过中间件默认是需要登录态的，如有不需要登录的，可添加装饰器login_exempt
# 装饰器引入 from blueapps.account.decorators import login_exempt
def home(request):
    """
    首页
    """
    return render(request, 'index.html')

def query(request):
    """
    首页
    """
    return render(request, 'query.html')


def dev_guide(request):
    """
    开发指引
    """
    return render(request, 'home_application/dev_guide.html')


def contact(request):
    """
    联系页
    """
    return render(request, 'home_application/contact.html')


# 获取业务列表
def getBizList(request):
    client = get_client_by_request(request)
    business_list = client.cc.search_business()
    data = business_list['data']['info']
    item = data
    return HttpResponse(json.dumps(item))


# 根据条件查询主机
def getHost(request):
    bk_biz_id = request.GET.get('bk_biz_id')
    client = get_client_by_request(request)
    business_list = client.cc.search_host({'bk_biz_id': bk_biz_id, 'bk_supplier_account': 0})
    data = business_list['data']['info']
    items = data
    return HttpResponse(json.dumps(items))

# 标准运维下发
def startTask(request):
    bk_biz_id = request.GET.get('bk_biz_id')
    bk_inner_ip = request.GET.get('bk_inner_ip')
    bk_cloud_id = request.GET.get('bk_cloud_id')
    client = get_client_by_request(request)
    reqData = {
        'bk_biz_id': bk_biz_id,
        'template_id': '10001',
        'template_source': 'common',
        'name': 'exam',
        'constants': {
            '${server_ip}': bk_inner_ip,
            '${server_port}': 10000,
            '${bk_cloud_id}': bk_cloud_id
        }
    }
    resq = client.sops.create_task(reqData)
    task_id = resq['data']['task_id']
    return HttpResponse(json.dumps(task_id))