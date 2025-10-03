from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app) 
DB_FILE = 'db.json'

def read_db():
    if os.path.exists(DB_FILE):
        with open(DB_FILE, 'r') as f:
            return json.load(f)
    return {"tasks": []}

def write_db(data):
    with open(DB_FILE, 'w') as f:
        json.dump(data, f, indent=2)

@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Task Manager Backend API', 'endpoints': ['GET /tasks', 'POST /tasks', 'PUT /tasks/<id>', 'DELETE /tasks/<id>', 'POST /login']})

@app.route('/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        return '', 200
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # usernames for testing only
    if username == 'tebogo' and password == 'tebogo':
        return jsonify({'success': True})
    else:
        return jsonify({'success': False, 'message': 'Invalid username or password'}), 401

@app.route('/tasks', methods=['GET'])
def get_tasks():
    db = read_db()
    return jsonify(db.get('tasks', []))

@app.route('/tasks', methods=['POST'])
def add_task():
    db = read_db()
    tasks = db.get('tasks', [])
    new_task = request.json
    max_id = max([t['id'] for t in tasks], default=0)
    new_task['id'] = max_id + 1
    tasks.append(new_task)
    db['tasks'] = tasks
    write_db(db)
    return jsonify(new_task), 201

@app.route('/tasks/<int:task_id>', methods=['GET'])
def get_task(task_id):
    db = read_db()
    tasks = db.get('tasks', [])
    task = next((t for t in tasks if t['id'] == task_id), None)
    if not task:
        return jsonify({'error': 'Task not found'}), 404
    return jsonify(task)

@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    db = read_db()
    tasks = db.get('tasks', [])
    task = next((t for t in tasks if t['id'] == task_id), None)
    if not task:
        return jsonify({'error': 'Task not found'}), 404
    task.update(request.json)
    write_db(db)
    return jsonify(task)

@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    db = read_db()
    tasks = db.get('tasks', [])
    tasks = [t for t in tasks if t['id'] != task_id]
    db['tasks'] = tasks
    write_db(db)
    return '', 204

if __name__ == '__main__':
    app.run(debug=False, port=5000)
