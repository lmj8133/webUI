# use this app in a production deployment should be used with a WSGI server
# ref: https://flask.palletsprojects.com/en/2.0.x/deploying/wsgi-standalone/

# gunicorn --workers=<整數> --threads=<整數> <wsgi檔名>:<app名稱>
# ref: https://www.minglunwu.com/notes/2021/flask_plus_wsgi.html