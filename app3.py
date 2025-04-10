from flask import Flask, render_template
from flask_socketio import SocketIO, send
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = '123'  # Replace with a secure key
socketio = SocketIO(app, cors_allowed_origins="*")  # Allow all origins for development

@app.route('/')
def index():
    return render_template('index.html')  # Serve your React app

# WebSocket event handlers
@socketio.on('message')
def handle_message(message):
    print('Received message:', message)
    # Broadcast the message to all connected clients
    send(f"Hospital Professional: {message}", broadcast=True)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5001, debug=True)