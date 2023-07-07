import base64
import json
import os
import re
import sys
import time
import shutil
import linecache
#from titleReader import *

def title_change(save_data, data):
    new_file = []
    with open("config.h", 'r+') as f:
        new_file.append(f.readline())

    for title in data:
        line_num = save_data[title]['line']
        line_content = new_file[line_num]
        change = data[title]['value']

        if change != save_data[title]['value']:
            if type(change) != bool:
                new_file[line_num] = line_content.lstripe(' ').replace(save_data[title]['value'], data[title]['value'])
            else:
                if change == False:
                    new_file[line_num] = '//'+line_content.lstripe(' ')
                else:
                    new_file[line_num] =line_content.lstripe(' /')
        else:
            pass
    
    return new_file


        
# rx_data = dict, {'title1': {'value': 'value', 'line': 'line', 'id': 'id'}, 'title2': {'value': 'value', 'line': 'line', 'id': 'id'}, ...}
