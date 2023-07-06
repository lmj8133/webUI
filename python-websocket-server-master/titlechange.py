import base64
import json
import os
import re
import sys
import time
import shutil
#from titleReader import *

json_file = 'js\json\ui.json'
new_json = 'js\json\new.json'
shutil.copy(json_file, new_json)

def title_change(decode_data):
    file = open('js\json\new.json','r')
    data = file.read()
    file.close()

    for title in dictionary['title']:
        dictionary['title','address']
