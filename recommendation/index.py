import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import sigmoid_kernel

def give_rec(interactions, tags, interactions_user, tags_user):
    # Create DataFrames for the events and user data
    event_data = pd.DataFrame({'interactions': interactions, 'tags': tags})
    user_data = pd.DataFrame({'interactionsUser': interactions_user, 'tagsUser': tags_user})
    
    # Fill missing tags with empty strings
    event_data['tags'] = event_data['tags'].fillna('')
    user_data['tagsUser'] = user_data['tagsUser'].fillna('')

    # Join tags list into a single string for each event
    event_data['tags'] = event_data['tags'].apply(lambda x: ' '.join(x) if isinstance(x, list) else x)
    user_data['tagsUser'] = user_data['tagsUser'].apply(lambda x: ' '.join(x) if isinstance(x, list) else x)

    # Vectorize the event tags and user tags using TF-IDF
    tfv = TfidfVectorizer(min_df=1, max_features=None, strip_accents='unicode', 
                          analyzer='word', token_pattern=r'\w{1,}', stop_words='english', 
                          ngram_range=(1, 3))

    # Fit and transform both event tags and user tags
    tfv_event_matrix = tfv.fit_transform(event_data['tags'])
    tfv_user_matrix = tfv.transform(user_data['tagsUser'])  # Use transform instead of fit_transform for user data

    # Check the shapes of the matrices
    print(f"Event matrix shape: {tfv_event_matrix.shape}")
    print(f"User matrix shape: {tfv_user_matrix.shape}")

    # Calculate the sigmoid kernel similarity between event and user matrices
    sig = sigmoid_kernel(tfv_event_matrix, tfv_user_matrix)

    # Check the shape of the similarity matrix
    print(f"Sigmoid kernel shape: {sig.shape}")

    # Find indices of the events user interacted with
    interacted_event_ids = user_data['interactionsUser']
    interacted_indices = event_data.index[event_data['interactions'].isin(interacted_event_ids)].tolist()

    if not interacted_indices:
        return []  # Return an empty list if no interactions are found

    # Ensure all_scores array has the right dimensions
    all_scores = np.zeros(sig.shape[0])

    # Add similarity scores for each interacted event
    for idx in interacted_indices:
        if idx < sig.shape[1]:  # Ensure the index is within bounds of the similarity matrix
            all_scores += sig[:, idx]
        else:
            print(f"Index {idx} is out of bounds for the similarity matrix.")

    avg_scores = all_scores / len(interacted_indices)

    # Get the indices of top 10 recommendations, excluding the already interacted events
    recommended_indices = np.argsort(avg_scores)[::-1]  # Sort scores in descending order
    recommended_indices = [i for i in recommended_indices if i not in interacted_indices][:10]

    # Return the event._id of the recommended events
    recommended_event_ids = event_data['interactions'].iloc[recommended_indices].tolist()
    
    return recommended_event_ids
