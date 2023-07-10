import json
import os

from app import app
from flask import render_template, request


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
    except:
        data = {'cmd': 'error'}
    return json.dumps(data)