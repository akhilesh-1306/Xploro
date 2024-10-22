# import pandas as pd
# import numpy as np
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics.pairwise import sigmoid_kernel

# def give_rec(input_data):
#     data = pd.DataFrame(input_data)

#     data['description'] = data['description'].fillna('')
#     data['tags'] = data['tags'].fillna('')

#     data['combined'] = data['description'] + ' ' + data['tags']

#     tfv = TfidfVectorizer(min_df=3, max_features=None, strip_accents='unicode', 
#                           analyzer='word', token_pattern=r'\w{1,}', stop_words='english', 
#                           ngram_range=(1, 3))
#     tfv_matrix = tfv.fit_transform(data['combined'])

#     sig = sigmoid_kernel(tfv_matrix, tfv_matrix)
#     indices = pd.Series(data.index, index=data['activityTitle']).drop_duplicates()
#     activity_title = data['activityTitle']
#     idx = indices[activity_title]
#     sig_scores = list(enumerate(sig[idx]))

#     sig_scores = sorted(sig_scores, key=lambda x: x[1], reverse=True)

#     sig_scores = sig_scores[1:11] 
#     activity_indices = [i[0] for i in sig_scores]
#     return data['activityTitle'].iloc[activity_indices]



import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import sigmoid_kernel

def give_rec(input_data, user_data):
    # Convert input data into DataFrame
    data = pd.DataFrame(input_data)
    
    # Fill missing descriptions and tags
    data['description'] = data['description'].fillna('')
    data['tags'] = data['tags'].fillna('')
    
    # Combine description and tags for vectorization
    data['combined'] = data['description'] + ' ' + data['tags']
    
    # Vectorize the text using TF-IDF
    tfv = TfidfVectorizer(min_df=3, max_features=None, strip_accents='unicode', 
                          analyzer='word', token_pattern=r'\w{1,}', stop_words='english', 
                          ngram_range=(1, 3))
    tfv_matrix = tfv.fit_transform(data['combined'])

    # Calculate sigmoid kernel similarity
    sig = sigmoid_kernel(tfv_matrix, tfv_matrix)
    
    # Find indices of the events user interacted with
    interacted_event_ids = user_data['interactions']
    interacted_indices = data.index[data['_id'].isin(interacted_event_ids)].tolist()

    if not interacted_indices:
        return []  # No recommendations if no valid interactions

    # Get the recommendations for each interaction (using the average score)
    all_scores = np.zeros(sig.shape[0])
    for idx in interacted_indices:
        all_scores += sig[idx]
    avg_scores = all_scores / len(interacted_indices)
    
    # Get top 10 recommendations excluding the already interacted events
    recommended_indices = np.argsort(avg_scores)[::-1]  # Sort in descending order
    recommended_indices = [i for i in recommended_indices if i not in interacted_indices][:10]
    
    # Return the event._id of the recommended events
    return data['_id'].iloc[recommended_indices].tolist()
