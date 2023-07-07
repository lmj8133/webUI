import base64
import json
import os
import re
import shutil
import threading
import time

from headerFileMaker import get_file
from titlechange import title_change
from titleReader import header_analyze
from websocket_server import WebsocketServer

# Called for every client connecting (after handshake)


saved_data_dict = {}
file_name_dict = {}

def new_client(client, server):
    print("New client connected and was given id %d" % client['id'])
    server.send_message_to_all(json.dumps({"data": "Hey all, a new client has joined us"}))

# Called for every client disconnecting


def client_left(client, server):
    client_id = f"_{client['id']}"
    print("Client(%d) disconnected" % client['id'])
    if client_id in saved_data_dict:
        del saved_data_dict[client_id]
    if client_id in file_name_dict:
        try:
            shutil.rmtree(os.path.join(os.getcwd(), "temp", f"client{client_id}"))
        except:
            pass
        del file_name_dict[client_id]

# Called when a client sends a message

# save_data: dict, {'title1': {'value': 'value', 'line': 'line', 'id': 'id'}, 'title2': {'value': 'value', 'line': 'line', 'id': 'id'}, ...}
#   value: old_value
#   line: line num in .h
#   id: for send

def message_received(client, server, message):
    rx_data = 0

    # data conversion station
    rx_data = message.strip('\n')
    rx_data = json.loads(rx_data)

    client_id = f"_{client['id']}"

    global file_name_dict
    if client_id in file_name_dict:
        file_name = file_name_dict[client_id]
    else:
        file_name = ""
    global saved_data_dict
    if client_id in saved_data_dict:
        saved_data = saved_data_dict[client_id]
    else:
        saved_data = {}

    if rx_data["cmd"] == 'comfrim':
        dir_name = os.path.join(os.getcwd(), "temp", f"client{client_id}")
        new_file = title_change(saved_data, rx_data['data'], os.path.join(dir_name, file_name))
        with open(os.path.join(dir_name, file_name), 'w') as f :
            f.write('\n'.join(new_file))
        server.send_message(client, json.dumps({
            "cmd": "finish",
            "data": {
                "path": os.path.join("temp", f"client{client_id}", file_name),
                "filename": file_name}}))

    if rx_data["cmd"] == 'headerFile':
        decode_data = get_file(rx_data["data"][rx_data["data"].find(',')+1:])
        file_name = rx_data["name"]
        if file_name == '':
            file_name = 'headerFile.h'

        # prepare dir
        dir_name = os.path.join(os.getcwd(), "temp", f"client{client_id}")
        if not os.path.exists(dir_name):
            os.makedirs(dir_name)
        else:
            for file in os.listdir(dir_name):
                os.remove(os.path.join(dir_name, file))

        with open(os.path.join(dir_name, file_name), 'w') as f:
            f.write('\n'.join(decode_data))
        file_name_dict[client_id] = file_name

        saved_data = header_analyze(decode_data)
        saved_data_dict[client_id] = saved_data
        title_recieve = {}
        for data in saved_data:
            title_recieve[saved_data[data]['id']] = saved_data[data]['value']
        send_data = {
            "cmd": "found_title",
            "data": title_recieve
        }
        server.send_message(client, json.dumps(send_data))

    if rx_data["cmd"] == 'exit':
        print("receive exit cmd")
        server.send_message_to_all(json.dumps({"cmd": "exit"}))
        server.shutdown()

# WebSocketServer init
def server_run():
    PORT = 9002
    server = WebsocketServer(PORT, host='0.0.0.0')
    server.set_fn_new_client(new_client)
    server.set_fn_client_left(client_left)
    server.set_fn_message_received(message_received)
    print("Web Socket work on " + str(PORT) + " Port")
    server.run_forever()
