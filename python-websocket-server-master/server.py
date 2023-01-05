from websocket_server import WebsocketServer

import threading
import serial  # 引用pySerial模組
import time

row_num = 11;
column_num = 11;

#creat a ram buf for mesh 
mesh_ram = []  
for i in range(row_num*column_num):
    mesh_ram.append('0.000')


COM_PORT = 'COM14'    # 指定通訊埠名稱
BAUD_RATES = 115200    # 設定傳輸速率

try:
    ser = serial.Serial(COM_PORT, BAUD_RATES)   # 初始化序列通訊埠
except Exception as e:
    print("請先接上3D印表機")
    exit()

# Called for every client connecting (after handshake)
def new_client(client, server):
    print("New client connected and was given id %d" % client['id'])
    server.send_message_to_all("Hey all, a new client has joined us")


# Called for every client disconnecting
def client_left(client, server):
    print("Client(%d) disconnected" % client['id'])

# Called when a client sends a message
def message_received(client, server, message):
    global t
    global mesh_ram
    #===============================================================================================================================
    #   ___       _       _             _    _____                           _          __  ____                                __  
    #  / _ \ _ __(_) __ _(_)_ __   __ _| |  | ____|_  ____ _ _ __ ___  _ __ | | ___    / / |  _ \ ___  ___  ___ _ ____   _____  \ \ 
    # | | | | '__| |/ _` | | '_ \ / _` | |  |  _| \ \/ / _` | '_ ` _ \| '_ \| |/ _ \  | |  | |_) / _ \/ __|/ _ \ '__\ \ / / _ \  | |
    # | |_| | |  | | (_| | | | | | (_| | |  | |___ >  < (_| | | | | | | |_) | |  __/  | |  |  _ <  __/\__ \  __/ |   \ V /  __/  | |
    #  \___/|_|  |_|\__, |_|_| |_|\__,_|_|  |_____/_/\_\__,_|_| |_| |_| .__/|_|\___|  | |  |_| \_\___||___/\___|_|    \_/ \___|  | |
    #               |___/                                             |_|              \_\                                      /_/ 
    #===============================================================================================================================
    #if len(message) > 200:
    #    message = message[:200]+'..'
    #print("Client(%d) said: %s" % (client['id'], message))
    #server.send_message_to_all("Client(%d) said: %s" % (client['id'], message))


    #==============================================================================================================
    # ____        _            ____                              _                ____  _        _   _             
    #|  _ \  __ _| |_ __ _    / ___|___  _ ____   _____ _ __ ___(_) ___  _ __    / ___|| |_ __ _| |_(_) ___  _ __  
    #| | | |/ _` | __/ _` |  | |   / _ \| '_ \ \ / / _ \ '__/ __| |/ _ \| '_ \   \___ \| __/ _` | __| |/ _ \| '_ \ 
    #| |_| | (_| | || (_| |  | |__| (_) | | | \ V /  __/ |  \__ \ | (_) | | | |   ___) | || (_| | |_| | (_) | | | |
    #|____/ \__,_|\__\__,_|   \____\___/|_| |_|\_/ \___|_|  |___/_|\___/|_| |_|  |____/ \__\__,_|\__|_|\___/|_| |_|
    #                                                                                                        
    #==============================================================================================================
    #print(message)
    message = message.strip('\n')
    data_buf = message.split(',')
    

    if len(data_buf) == 1:
        cmd = data_buf[0]
        data = None
    else:    
        #data_buf的len>1代表才有資料
        cmd = data_buf[0]
        data = data_buf[1:]

    #=============================================================
    #  ____       _      _____        __  __            _ _       
    # / ___|  ___| |_   |_   _|__    |  \/  | __ _ _ __| (_)_ __  
    # \___ \ / _ \ __|    | |/ _ \   | |\/| |/ _` | '__| | | '_ \ 
    #  ___) |  __/ |_     | | (_) |  | |  | | (_| | |  | | | | | |
    # |____/ \___|\__|    |_|\___/   |_|  |_|\__,_|_|  |_|_|_| |_|
    #
    #=============================================================
    if cmd == 'auto_home': 
        print(message)
        ser.write('G28\n'.encode())  

    elif cmd == 'bedleveling': 
        print(message)
        ser.write('G29\n'.encode())  

    elif cmd == 'save_mesh_to_marlin':
        print(message)
        for i in range(len(data)):
            row = i // row_num
            column = i % column_num
            tx_str = 'M421 '
            tx_str += 'I' + str(column) + ' '
            tx_str += 'J' + str(row) + ' '
            tx_str += 'Z' + data[i] + '\n'
            ser.write(tx_str.encode())
            time.sleep(0.1)              #給marlin點時間喘息
        ser.write('M420 V1\n'.encode())  #顯示所設定的網格值

    #===================================================================================
    # ____                _    _____                       __  __            _ _       
    # |  _ \ ___  __ _  __| |  |  ___| __ ___  _ __ ___    |  \/  | __ _ _ __| (_)_ __  
    # | |_) / _ \/ _` |/ _` |  | |_ | '__/ _ \| '_ ` _ \   | |\/| |/ _` | '__| | | '_ \ 
    # |  _ <  __/ (_| | (_| |  |  _|| | | (_) | | | | | |  | |  | | (_| | |  | | | | | |
    # |_| \_\___|\__,_|\__,_|  |_|  |_|  \___/|_| |_| |_|  |_|  |_|\__,_|_|  |_|_|_| |_|
    #
    #===================================================================================                                                                                  
    elif cmd == 'read_mesh_from_marlin':
        print(message)
        t.do_run = False
        time.sleep(0.001)  #先讓CPU使用權給子thread讓他可以順利關掉, 因為這裡要取得Rx的使用權
        ser.write('M420 V1\n'.encode())  #顯示所設定的網格值
        j = 0
        while True:
            if ser.in_waiting: #buffer有東西才需要進入readline的動作
                rx_data = ser.readline() 
                print(rx_data)
                if rx_data != "ok\n".encode("utf-8") :
                    analyze_data_buf = rx_data.decode("utf-8").strip('\n').strip().split() #轉完字串後去頭尾空白與\n並且透過空白來分割字串, 存成list
                    if len(analyze_data_buf) == 12:
                        for i in range(column_num):
                            mesh_ram[j*row_num+i] = analyze_data_buf[i+1].strip().strip('+') #拿掉正號
                        j+=1
                else :
                    print(mesh_ram)
                    server.send_message_to_all("%s" % 'mesh_record,' + ','.join(mesh_ram))
                    t.do_run = True
                    time.sleep(0.001)  #先讓CPU使用權給子thread讓他可以順利開啟, 歸還Rx使用權給子thread
                    break

    #============================
    #   ___  _   _               
    #  / _ \| |_| |__   ___ _ __ 
    # | | | | __| '_ \ / _ \ '__|
    # | |_| | |_| | | |  __/ |   
    #  \___/ \__|_| |_|\___|_|   
    #
    #============================   
    elif cmd == 'clear_mesh': 
        print(message)
        for i in range(row_num*column_num):
            mesh_ram[i] = '0.000'
        print(mesh_ram)

    elif cmd == 'save_mesh_to_pc': 
        print(message)
        f = open("mesh_record.txt", mode="w", encoding='utf-8')
        f.write(','.join(mesh_ram))
        f.close()

    elif cmd == 'read_mesh_from_pc': 
        print(message)
        try:
            f = open("mesh_record.txt", mode='r', encoding='utf-8')
            temp_list = f.read().split(',')
            for i in range(row_num*column_num):
                mesh_ram[i] = temp_list[i]
            print(mesh_ram)
            server.send_message_to_all("%s" % 'mesh_record,' + ','.join(mesh_ram))
        finally:
            f.close()
    
#======================================================================
#  ____        _   _____ _                        _    ___       _ _   
# / ___| _   _| |_|_   _| |__  _ __ ___  __ _  __| |  |_ _|_ __ (_) |_ 
# \___ \| | | | '_ \| | | '_ \| '__/ _ \/ _` |/ _` |   | || '_ \| | __|
#  ___) | |_| | |_) | | | | | | | |  __/ (_| | (_| |   | || | | | | |_ 
# |____/ \__,_|_.__/|_| |_| |_|_|  \___|\__,_|\__,_|  |___|_| |_|_|\__|
#
#======================================================================                                                                    
# 子執行緒的工作函數
def job():
    t = threading.currentThread()
    while True:
        if getattr(t, "do_run", True):
            if ser.in_waiting:  #buffer有東西才需要進入readline的動作
                rx_data = ser.readline()  
                print(rx_data)
        else:
            #print("Stopping as you wish.")
            time.sleep(0.1)  #讓出CPU使用權, 否則若只有pass會卡main thread

# 建立一個子執行緒
t = threading.Thread(target = job)

# 執行該子執行緒
t.start()    


#========================================================================================================
# __        __   _    ____             _        _      ____                              ___       _ _   
# \ \      / /__| |__/ ___|  ___   ___| | _____| |_   / ___|  ___ _ ____   _____ _ __   |_ _|_ __ (_) |_ 
#  \ \ /\ / / _ \ '_ \___ \ / _ \ / __| |/ / _ \ __|  \___ \ / _ \ '__\ \ / / _ \ '__|   | || '_ \| | __|
#   \ V  V /  __/ |_) |__) | (_) | (__|   <  __/ |_    ___) |  __/ |   \ V /  __/ |      | || | | | | |_ 
#    \_/\_/ \___|_.__/____/ \___/ \___|_|\_\___|\__|  |____/ \___|_|    \_/ \___|_|     |___|_| |_|_|\__|
#
#========================================================================================================
PORT=9002
server = WebsocketServer(PORT , host='0.0.0.0')
server.set_fn_new_client(new_client)
server.set_fn_client_left(client_left)
server.set_fn_message_received(message_received)
print("Web Socket work on "+ str(PORT) + " Port")
server.run_forever()
