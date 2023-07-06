import json
import os


def find_title(decode_data):
    file = open(os.getcwd()+'/js/json/ui.json', 'r')
    json_data = file.read()
    file.close()
    json_data = json.loads(json_data)

    datas = {
        'title': [x['title'] for x in json_data],
        'id': [x['id'] for x in json_data],
        'length': len(json_data)
    }
    found_data = {}
    for title_num in range(datas['length']):
        found_data[datas['title'][title_num]] = {
            'value': None,
            'line': None,
            'id': datas['id'][title_num]
        }

    for line_num in range(len(decode_data)):
        line = decode_data[line_num]
        for title_num in range(datas['length']):
            title = datas['title'][title_num]
            title_found = line.strip().find(title)
            if title_found != -1:
                args = line.strip()[title_found + len(title):].strip().split(' ')
                if args[0] and title_found == 0:
                    if line.find(title + ' ') == -1:
                        continue
                    #print(arr[0])
                    found_data[title]['value'] =  args[0]
                elif (not args[0]) and title_found != 0:
                    #print('Off')
                    found_data[title]['value'] =  False
                elif (not args[0]) and title_found == 0:
                    #print('On')
                    found_data[title]['value'] =  True
                found_data[title]['line'] =  line_num

    return found_data

"""
json_data: list of dict, dict = {'title': 'title', 'id': 'id', ...}
datas: dict, {'title': ['title1', 'title2', ...], 'id': ['id1', 'id2', ...], 'length': number}
found_data: dict, {'title1': {'value': 'value', 'line': 'line'}, 'title2': {'value': 'value', 'line': 'line'}, ...}

"""