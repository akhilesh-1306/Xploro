# from flask import Flask, request, jsonify
# from index import give_rec

# app = Flask(__name__)

# @app.route('/recommend', methods=['POST'])
# def recommend():
#     # data = request.get_json()  # Get data from the frontend (JSON format)
#     user_data = request.get_json()
#     recommendations = give_rec(user_data)
#     return jsonify(recommendations)

# if __name__ == '__main__':
#     app.run(debug=True)


from flask import Flask, request, jsonify
from index import give_rec

app = Flask(__name__)

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()  # Get all the data from the frontend (JSON format)
    
    interactions = data.get('interactions')
    tags = data.get('tags')
    interactions_user = data.get('interactionsUser')
    tags_user = data.get('tagsUser')
    
    # Pass the required data to the recommendation function
    recommendations = give_rec(interactions, tags, interactions_user, tags_user)
    
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True)
