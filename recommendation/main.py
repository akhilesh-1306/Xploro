from flask import Flask, request, jsonify
from index import give_rec

app = Flask(__name__)

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()  # Get data from the frontend (JSON format)
    user_data = request.get_json()
    recommendations = give_rec(data, user_data)
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True)