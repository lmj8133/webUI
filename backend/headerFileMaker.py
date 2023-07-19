import base64
import json
import os


# def get_file(file):
#     decode_file = base64.decodebytes(file.encode('utf-8'))
#     decode_file = decode_file.decode('utf-8')
#     decode_file = decode_file.splitlines()
#     return decode_file


def header_analyze(file_data: 'list[str]', json_path):
    with open(json_path, 'r') as json_file:
        json_data = json.loads(json_file.read())

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

    for line_num in range(len(file_data)):
        line = file_data[line_num]
        for title_num in range(datas['length']):
            title = datas['title'][title_num]
            title_found = line.strip().find(title)
            if title_found != -1:
                args = line.strip()[title_found + len(title):].strip().split(' ')
                if args[0] and title_found == 0:
                    if line.find(title + ' ') == -1:
                        continue
                    found_data[title]['value'] =  args[0]
                elif (not args[0]) and title_found != 0:
                    found_data[title]['value'] =  False
                elif (not args[0]) and title_found == 0:
                    found_data[title]['value'] =  True
                else:
                    continue
                found_data[title]['line'] =  line_num

    return found_data


def header_change(save_data: 'dict', data: 'dict', file_path):
    new_file = []
    with open(file_path, 'r+') as f:
        new_file = f.read().splitlines()

    for title in data:
        line_num = save_data[title]['line']
        line_content = new_file[line_num]
        new_value = data[title]

        if new_value != save_data[title]['value']:
            if type(new_value) != bool:
                new_file[line_num] = line_content.lstrip(' ').replace(save_data[title]['value'], data[title])
            else:
                if new_value:
                    new_file[line_num] = line_content.lstrip(' /')
                else:
                    new_file[line_num] = '//' + line_content.lstrip(' ')
        else:
            pass

    return new_file