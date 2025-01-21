from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
app = Flask(__name__)
CORS(app)
@app.route('/api/data', methods=['GET'])
def get_csv_data():
    df = pd.read_csv('water_flow_data.csv')
    data = df.to_dict(orient='records')
    return jsonify(data)
if __name__ == '__main__':
    app.run(debug=True)