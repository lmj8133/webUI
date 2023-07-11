import json
import os
import sys
import uuid
import shutil

from app import app
from app.headerFileMaker import header_analyze, header_change
from flask import jsonify, render_template, request


# @app.route('/')
# @app.route('/index')
# def index():
#     return render_template('index.html')

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

    file_path = os.path.join('app', 'static', 'temp', file_uuid + file.filename)
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

@app.route('/download', methods=['GET'])
def download():
    data = request.args.get('data')
    file_uuid = data['uuid']
    file_path = os.path.join('app', 'static', 'temp', file_uuid + '.json')

    saved_data = {}
    with open(file_path) as f:
        saved_data = json.load(f)

    change_data = header_change(saved_data, data['change'], file_path.replace('.json', '.h'))

    shutil.rmtree(file_path)
    shutil.rmtree(file_path.replace('.json', '.h'))
    

    return jsonify({
        'status': 'success',
        'data': change_data
    })
