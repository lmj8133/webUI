import os
import sys
import uuid
from json import dump, load

import aiofiles
from headerFileMaker import header_analyze, header_change
from sanic import Sanic
from sanic.request import Request
from sanic.response import HTTPResponse, file, json, redirect

# TIP
#
# This another important distinction.
# Other frameworks come with a built in development server and explicitly say that it is only intended for development use.
# The opposite is true with Sanic.
#
# The packaged server is production ready.
# ref: https://sanic.dev/zh/guide/basics/app.html#%E5%AE%9E%E4%BE%8B-instance
app = Sanic("HelloWorld")

@app.route('/')
async def default(request: Request) -> HTTPResponse:
    url = app.url_for('index', filename="configheader")
    return redirect(url)

@app.route('/<filename>')
async def index(request: Request, filename: str) -> HTTPResponse:
    if 'python.exe' in sys.executable:
        return await file('../frontend/dist/index.html')
    else:
        return await file('./frontend/index.html')

@app.route('/assets/<filename>')
async def assets(request: Request, filename: str) -> HTTPResponse:
    if 'python.exe' in sys.executable:
        return await file(os.path.join('../frontend/dist/assets', filename))
    else:
        return await file(os.path.join('./frontend/assets', filename))

@app.get('/api')
async def data(request: Request) -> HTTPResponse:
    file = request.args.get('file')

    try:
        check = request.args.get('check')
        if check:
            if (os.path.exists(os.path.join('static', 'temp', file))):
                data = {'status': 'success', 'data': {'message': 'File exists'}}
            else:
                data = {'status': 'error', 'data': {'message': 'File not found'}}
            return json(data)
    except:
        pass

    try:
        with open(os.path.join('static', file)) as f:
            data = load(f)
        data = {'status': 'success', 'data': data}
    except FileNotFoundError as e:
        data = {'status': 'error', 'data': {'message': str(e)}}
    except:
        print('Unexpected error:', sys.exc_info()[0])
        data = {'status': 'error'}
    return json(data)

@app.post('/upload')
async def upload(request: Request) -> HTTPResponse:
    # Create upload folder if doesn't exist
    if not os.path.exists(os.path.join('static', 'temp')):
        os.mkdir(os.path.join('static', 'temp'))

    # Ensure a file was sent
    upload_file = request.files['file'][0]
    file_uuid = str(uuid.uuid4())
    if not upload_file:
        return json({'status': 'error', 'data': {'message': 'File not found'}})


    file_path = os.path.join('static', 'temp', file_uuid + '.h')
    async with aiofiles.open(file_path, 'wb') as f:
        await f.write(upload_file.body)
    f.close()

    saved_data = {}
    with open(file_path) as f:
        file_data = f.read().splitlines()
        saved_data = header_analyze(file_data, os.path.join('static', 'data.json'))

    with open(file_path.replace('.h', '.json'), 'w') as f:
        dump(saved_data, f)

    return_value = {}
    for data in saved_data:
        return_value[saved_data[data]['id']] = saved_data[data]['value']

    return json({'status': 'success', 'data': {'uuid': file_uuid, 'value': return_value}})


@app.post('/download')
async def download(request: Request) -> HTTPResponse:
    file_uuid = request.json["uuid"]
    change = request.json["change"]
    file_path = os.path.join('static', 'temp', file_uuid + '.h')

    saved_data = {}
    with open(file_path.replace('.h', '.json')) as f:
        saved_data = load(f)

    change_data = header_change(saved_data, change, file_path.replace('.json', '.h'))
    with open(file_path, 'w') as f:
        for line in change_data:
            f.write(line + '\n')
    try:
        return await file(file_path)
    except:
        print('Unexpected error:', sys.exc_info()[0])
        return json({'status': 'error', 'data': {'message': 'File not found'}})

@app.post('/clear')
async def clear(request: Request) -> HTTPResponse:
    file_uuid = request.json["uuid"]
    file_path = os.path.join('static', 'temp', file_uuid + '.h')
    file_path_json = os.path.join('static', 'temp', file_uuid + '.json')

    if (os.path.exists(file_path)):
        os.remove(file_path)
    if (os.path.exists(file_path_json)):
        os.remove(file_path_json)

    return json({'status': 'success', 'data': {'message': 'File deleted'}})

# @app.get('/shutdown')
# async def shutdown(request: Request) -> HTTPResponse:
#     async def cleanup(app, _):
#         import asyncio
#         for task in asyncio.all_tasks():
#             if task.get_name().startswith("signal"):
#                 await task
#     cleanup(app, None)
#     return json({'status': 'success', 'data': {'message': 'Server shutting down'}})

if __name__ == '__main__':
    if 'python.exe' in sys.executable:
        print("\033[1;31;40myou should use sanic to run this server\033[0m")
        app.run(host='localhost', port=80, access_log=False, fast=True, debug=False)
    else:
        os.system("start \"\" http://localhost")
        app.run(host='localhost', port=80, access_log=False, debug=False, single_process=True)