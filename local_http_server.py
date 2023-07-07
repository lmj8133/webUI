# run websocket
import http.server
import json
import os
import sys
import threading
import shutil

# 意義為加入include path
sys.path.append(os.getcwd()+'/python-websocket-server-master')

import server

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
t = threading.Thread(target=job)
t.daemon = True

# 執行該子執行緒
t.start()
print("Http Server work on", port ,"Port")

# main 執行緒 run websocket
main_thread = threading.Thread(target=server.server_run)
main_thread.daemon = True
main_thread.start()

def exit_program():
    for dir in os.listdir(os.path.join(os.getcwd(), "temp")):
        shutil.rmtree(os.path.join(os.getcwd(), "temp", dir))
    print("\033[1;31;40mprogram exit\033[0m")
    exit()

while True:
    try:
        if main_thread.is_alive() == False or t.is_alive() == False:
            exit_program()
    except:
        exit_program()