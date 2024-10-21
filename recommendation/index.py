import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import sigmoid_kernel

def give_rec(input_data):
    data = pd.DataFrame(input_data)

    data['description'] = data['description'].fillna('')
    data['tags'] = data['tags'].fillna('')

    data['combined'] = data['description'] + ' ' + data['tags']

    tfv = TfidfVectorizer(min_df=3, max_features=None, strip_accents='unicode', 
                          analyzer='word', token_pattern=r'\w{1,}', stop_words='english', 
                          ngram_range=(1, 3))
    tfv_matrix = tfv.fit_transform(data['combined'])

    sig = sigmoid_kernel(tfv_matrix, tfv_matrix)
    indices = pd.Series(data.index, index=data['activityTitle']).drop_duplicates()
    activity_title = data['activityTitle']
    idx = indices[activity_title]
    sig_scores = list(enumerate(sig[idx]))

    sig_scores = sorted(sig_scores, key=lambda x: x[1], reverse=True)

    sig_scores = sig_scores[1:11] 
    activity_indices = [i[0] for i in sig_scores]
    return data['activityTitle'].iloc[activity_indices]