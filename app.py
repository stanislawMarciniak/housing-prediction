import pickle
from flask import Flask, request, jsonify, render_template, send_from_directory
import numpy as np
import pandas as pd

app = Flask(__name__, static_folder='static')

# Load the model
regmodel = pickle.load(open('regmodel.pkl', 'rb'))
scalar = pickle.load(open('scaling.pkl', 'rb'))

# Load training data
try:
    training_data = pd.read_csv('boston_training_data.csv')
    print(f"Loaded {len(training_data)} rows of training data")
except Exception as e:
    print(f"Error loading training data: {e}")
    training_data = pd.DataFrame()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get_training_data')
def get_training_data():
    if training_data.empty:
        return jsonify([])
    return jsonify(training_data.to_dict(orient='records'))

@app.route('/predict_api', methods=['POST'])
def predict_api():
    data = request.json['data']
    print(data)
    new_data = scalar.transform(np.array(list(data.values())).reshape(1,-1))
    output = regmodel.predict(new_data)
    print(f"Prediction: {output[0]}")
    return jsonify(float(output[0]))

@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)

if __name__ == "__main__":
    app.run(debug=True)