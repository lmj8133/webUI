import base64
import json
import os
import re
import sys
import time


def get_file(file):
    decode_file = base64.decodebytes(file.encode('utf-8'))
    decode_file = decode_file.decode('utf-8')
    decode_file = decode_file.splitlines()
    return decode_file


def header_analyze(header_file_path, json_file_path=os.getcwd()+'/../js/json/ui.json'):
    json_file = open(json_file_path, 'r')
    json_data = json.load(json_file)
    json_file.close()

    header_file = open(header_file_path, 'r')
    header_data = header_file.read()
    header_file.close()

    # TODO: read json file and return a dict about the header file
    #       e.g., { "board_define": "BOARD5", "Crystal_Mode": True, ...}
