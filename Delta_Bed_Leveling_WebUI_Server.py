# run websocket
import os
import sys
import http.server
import threading

# 意義為加入include path
sys.path.append(os.getcwd()+'/python-websocket-server-master')

if sys.argv[1:]:
  port = int(sys.argv[1])
else:
  port = 80
#server_address = ('192.168.3.193', port)
server_address = ('0.0.0.0', port)

httpd = http.server.HTTPServer(server_address, http.server.SimpleHTTPRequestHandler)

# 子執行緒的工作函數
def job():
    httpd.serve_forever()

# 建立一個子執行緒
t = threading.Thread(target = job)

# 執行該子執行緒
t.start()    
print("Http Server work on", port ,"Port")

# 主執行緒run websocket
import server
