开发框架2.0使用说明：https://docs.bk.tencent.com/blueapps/USAGE.html
python manage.py makemigrations(创建修改model后执行)
python manage.py migrate         优先跑（不创建新表时）
python manage.py createcachetable
python manage.py celery worker -l info 主线程
python manage.py celery beat -l info   定时任务
python manage.py runserver


python manage.py makemigrations home_application（新建库之后跑）