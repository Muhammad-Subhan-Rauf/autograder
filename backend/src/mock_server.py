from flask import Flask, request, jsonify
import random
from flask_cors import CORS

app = Flask(__name__)

# Allow requests only from the frontend's origin
CORS(app)

@app.route('/submit', methods=['POST'])
def submit_code():
    data = request.get_json()
    code = data.get('code', '')
    
    # Randomly decide Accepted or Rejected
    status = random.choice(['Accepted', 'Rejected'])
    
    response = {
        'status': status,
        'message': 'Your code was ' + status.lower() + '.'
    }
    return jsonify(response), 200

if __name__ == '__main__':
    app.run(port=5000)
