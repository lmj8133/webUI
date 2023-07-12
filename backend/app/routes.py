import json
import os
import sys
import uuid

from app import app
from app.headerFileMaker import header_analyze, header_change
from flask import jsonify, render_template, request, send_from_directory


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/api', methods=['GET'])
def data():
    file = request.args.get('file')
    try:
        with open(os.path.join('app', 'static', file)) as f:
            data = json.load(f)
        data = {'status': 'success', 'data': data}
    except FileNotFoundError as e:
        data = {'status': 'error', 'data': {'message': str(e)}}
    except:
        print('Unexpected error:', sys.exc_info()[0])
        data = {'status': 'error'}
    return jsonify(data)

@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['file']
    file_uuid = str(uuid.uuid4())

    # prepare dir
    if (not os.path.exists(os.path.join('app', 'static', 'temp'))):
        os.mkdir(os.path.join('app', 'static', 'temp'))

    file_path = os.path.join('app', 'static', 'temp', file_uuid + '.h')
    file.save(file_path)

    saved_data = {}
    with open(file_path) as f:
        file_data = f.read().splitlines()
        saved_data = header_analyze(file_data, os.path.join('app', 'static', 'data.json'))

    with open(file_path.replace('.h', '.json'), 'w') as f:
        json.dump(saved_data, f)

    return_value = {}
    for data in saved_data:
        return_value[saved_data[data]['id']] = saved_data[data]['value']

    return jsonify({
        'status': 'success',
        'data': {
            'uuid': file_uuid,
            'value': return_value
        }
    })

@app.route('/download', methods=['POST'])
def download():
    data = request.get_json()
    file_uuid = data['uuid']
    file_path = os.path.join('app', 'static', 'temp', file_uuid + '.h')

    saved_data = {}
    with open(file_path.replace('.h', '.json')) as f:
        saved_data = json.load(f)

    response = send_from_directory('', 'static/temp/' + file_uuid + '.h')
    change_data = header_change(saved_data, data['change'], file_path.replace('.json', '.h'))
    with open(file_path, 'w') as f:
        for line in change_data:
            f.write(line + '\n')
    try:
        response = send_from_directory('', os.path.join('static', 'temp', file_uuid + '.h'))
        print(response)
    except:
        print('Unexpected error:', sys.exc_info()[0])

    # os.remove(file_path)
    os.remove(file_path.replace('.h', '.json'))

    return response