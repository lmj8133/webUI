from websocket_server import WebsocketServer

import threading
import time
import os
import re

row_num = 11;
column_num = 11;

#creat a ram buf for mesh 
mesh_ram = []  
for i in range(row_num*column_num):
    mesh_ram.append('0.000')



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
    global indata
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
        #data_buf???len>1??????????????????
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
    if cmd == 'test': 
        print(message)

    elif cmd == 'create_cb': 
        print(message)
        #f = open("/mnt/hgfs/vm_share/codingstyle/Inc/config.h", "r")
        f = open(os.getcwd() + "/config.h", "r")
        print(f.read())
        print(os.getcwd())

    elif cmd == 'save':
        print(message)
        indata = 1
        print("dataSts: ", indata)
    elif cmd == 'end':
        print(message)
        indata = 0
        print("dataSts: ", indata)
    else:
        print(message)
        print("dataSts: ", indata)
        if(re.search('BOARD', message) != 'None'):
            with open(os.getcwd() + "/config.h", 'r') as fr:
                lines = fr.readlines()
         
                with open(os.getcwd() + "/config.h", 'w') as fw:
                    for line in lines:
                       
                        # find() returns -1
                        # if no match found
                        if line.find('#define BOARD_NO') == -1:
                            fw.write(line)
                        else:
                            fw.write(line.replace(line.split()[2], message))
#======================================================================
#  ____        _   _____ _                        _    ___       _ _   
# / ___| _   _| |_|_   _| |__  _ __ ___  __ _  __| |  |_ _|_ __ (_) |_ 
# \___ \| | | | '_ \| | | '_ \| '__/ _ \/ _` |/ _` |   | || '_ \| | __|
#  ___) | |_| | |_) | | | | | | | |  __/ (_| | (_| |   | || | | | | |_ 
# |____/ \__,_|_.__/|_| |_| |_|_|  \___|\__,_|\__,_|  |___|_| |_|_|\__|
#
#======================================================================                                                                    


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
