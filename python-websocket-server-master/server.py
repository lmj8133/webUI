import base64
import json
import os
import re
import threading
import time

from headerFileMaker import get_file
from titleReader import header_analyze
from websocket_server import WebsocketServer

# Called for every client connecting (after handshake)


def new_client(client, server):
    print("New client connected and was given id %d" % client['id'])
    server.send_message_to_all(json.dumps({"data": "Hey all, a new client has joined us"}))

# Called for every client disconnecting


def client_left(client, server):
    print("Client(%d) disconnected" % client['id'])

# Called when a client sends a message

saved_data = {}
def message_received(client, server, message):
    rx_data = 0
    # ===============================================================================================================================
    #   ___       _       _             _    _____                           _          __  ____                                __
    #  / _ \ _ __(_) __ _(_)_ __   __ _| |  | ____|_  ____ _ _ __ ___  _ __ | | ___    / / |  _ \ ___  ___  ___ _ ____   _____  \ \
    # | | | | '__| |/ _` | | '_ \ / _` | |  |  _| \ \/ / _` | '_ ` _ \| '_ \| |/ _ \  | |  | |_) / _ \/ __|/ _ \ '__\ \ / / _ \  | |
    # | |_| | |  | | (_| | | | | | (_| | |  | |___ >  < (_| | | | | | | |_) | |  __/  | |  |  _ <  __/\__ \  __/ |   \ V /  __/  | |
    #  \___/|_|  |_|\__, |_|_| |_|\__,_|_|  |_____/_/\_\__,_|_| |_| |_| .__/|_|\___|  | |  |_| \_\___||___/\___|_|    \_/ \___|  | |
    #               |___/                                             |_|              \_\                                      /_/
    # ===============================================================================================================================
    # if len(message) > 200:
    #    message = message[:200]+'..'
    # print("Client(%d) said: %s" % (client['id'], message))
    # server.send_message_to_all("Client(%d) said: %s" % (client['id'], message))

    # ==============================================================================================================
    # ____        _            ____                              _                ____  _        _   _
    # |  _ \  __ _| |_ __ _    / ___|___  _ ____   _____ _ __ ___(_) ___  _ __    / ___|| |_ __ _| |_(_) ___  _ __
    # | | | |/ _` | __/ _` |  | |   / _ \| '_ \ \ / / _ \ '__/ __| |/ _ \| '_ \   \___ \| __/ _` | __| |/ _ \| '_ \
    # | |_| | (_| | || (_| |  | |__| (_) | | | \ V /  __/ |  \__ \ | (_) | | | |   ___) | || (_| | |_| | (_) | | | |
    # |____/ \__,_|\__\__,_|   \____\___/|_| |_|\_/ \___|_|  |___/_|\___/|_| |_|  |____/ \__\__,_|\__|_|\___/|_| |_|
    #
    # ==============================================================================================================
    # print(message)
    rx_data = message.strip('\n')
    rx_data = json.loads(rx_data)

    if rx_data["cmd"] == 'comfrim':
        print(rx_data["data"])

    if rx_data["cmd"] == 'headerFile':
        decode_data = get_file(rx_data["data"][rx_data["data"].find(',')+1:])
        file_name = rx_data["name"]
        if file_name == '':
            file_name = 'headerFile.h'
        with open(file_name, 'w') as f:

            f.write('\n'.join(decode_data))

        global saved_data
        saved_data = header_analyze(decode_data)
        title_recieve = {}
        for data in saved_data:
            title_recieve[saved_data[data]['id']] = saved_data[data]['value']
        send_data = {
            "cmd": "found_title",
            "data": title_recieve
        }
        server.send_message(client, json.dumps(send_data))

    if rx_data["cmd"] == 'exit':
        pass


# ========================================================================================================
# __        __   _    ____             _        _      ____                              ___       _ _
# \ \      / /__| |__/ ___|  ___   ___| | _____| |_   / ___|  ___ _ ____   _____ _ __   |_ _|_ __ (_) |_
#  \ \ /\ / / _ \ '_ \___ \ / _ \ / __| |/ / _ \ __|  \___ \ / _ \ '__\ \ / / _ \ '__|   | || '_ \| | __|
#   \ V  V /  __/ |_) |__) | (_) | (__|   <  __/ |_    ___) |  __/ |   \ V /  __/ |      | || | | | | |_
#    \_/\_/ \___|_.__/____/ \___/ \___|_|\_\___|\__|  |____/ \___|_|    \_/ \___|_|     |___|_| |_|_|\__|
#
# ========================================================================================================
PORT = 9002
server = WebsocketServer(PORT, host='0.0.0.0')
server.set_fn_new_client(new_client)
server.set_fn_client_left(client_left)
server.set_fn_message_received(message_received)
print("Web Socket work on " + str(PORT) + " Port")
server.run_forever()
