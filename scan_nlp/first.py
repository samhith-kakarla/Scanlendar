


import nltk
nltk.download()
from nltk import ne_chunk
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.stem import wordnet, WordNetLemmatizer
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
import re

def Nlp(text_data):
    
    token_list = word_tokenize(text_data)   
    pos_list = nltk.pos_tag(token_list)
    ner_list = ne_chunk(pos_list)

        
    print(list(ner_list))

if __name__ == "__main__":

    text = "2 hour meeting with John about virtual teaching and e-learning on Zoom a week from today at noon. Be there or be square."
    Nlp(text)


"""
Tokenization
Stemming
POS Tags
Lemmatization
Named Entity Recognition
chunking
"""
