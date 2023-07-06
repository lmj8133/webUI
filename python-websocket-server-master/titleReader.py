import base64
import json
import os
import re
import sys
import time

def find_title(decode_data):
    file = open('js\json\ui.json','r')
    data = file.read()
    file.close()

    titles = []          
    title_recieved = {}
    for i in data:
        titles.append(i['title'])

    #config = "#define BOARD_NO                            BOARD31"

    for line_num in range(len(decode_data)):
        line = decode_data[line_num]
        for title in titles:
            if line.strip().find(title) != -1:
                arr = line[line.strip().find(title) + len(title):].split(' ')
                
                if arr != []:
                    #print(arr[0])
                    reslut = arr[0]
                    title_recieved[title] =  reslut         
                elif arr == [] and line.strip().find(title) != 0:
                    #print('Off')
                    reslut = 'Off'
                    title_recieved[title] =  reslut
                elif arr == [] and line.strip().find(title) == 0:
                    #print('On')
                    reslut = 'On'
                    title_recieved[title] =  reslut
            # else:
            #     #print('title NOT found.')
            #     reslut = 'title NOT found.'
    return reslut




 




        




    
    