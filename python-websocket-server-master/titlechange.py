import base64
import json
import os
import re
import sys
import time
import shutil
import linecache
#from titleReader import *

def title_change(save_data, data, file_name):
    new_file = []
    with open(file_name, 'r+') as f:
        new_file = f.read().splitlines()

    for title in data:
        line_num = save_data[title]['line']
        line_content = new_file[line_num]
        new_value = data[title]

        if new_value != save_data[title]['value']:
            if type(new_value) != bool:
                new_file[line_num] = line_content.lstrip(' ').replace(save_data[title]['value'], data[title])
                save_data[title]['value'] = data[title]
            else:
                if new_value:
                    new_file[line_num] = line_content.lstrip(' /')
                else:
                    new_file[line_num] = '//' + line_content.lstrip(' ')
                save_data[title]['value'] = data[title]
        else:
            pass
    
    return new_file


        
# rx_data = dict, {'title1': {'value': 'value', 'line': 'line', 'id': 'id'}, 'title2': {'value': 'value', 'line': 'line', 'id': 'id'}, ...}
