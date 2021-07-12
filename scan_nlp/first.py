


import nltk
# nltk.download()
from nltk import ne_chunk
from nltk import tag
from nltk.corpus.reader import tagged
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords, wordnet
from nltk.stem.porter import PorterStemmer
from collections import defaultdict
import re

tag_map = defaultdict(lambda : wordnet.NOUN)
tag_map['J'] = wordnet.ADJ
tag_map['V'] = wordnet.VERB
tag_map['R'] = wordnet.ADV

def Nlp(text_data):
    
    stemr = PorterStemmer()
    lemr = WordNetLemmatizer()
    token_list = word_tokenize(text_data)   
    stop_words = set(stopwords.words('english'))
    # stop_words.add('am')
    # stop_words.add('pm')
    filtered = []

    for i in range(len(token_list)):
        if token_list[i].casefold() not in stop_words:
            filtered.append(token_list[i])
    
    stemmed = [stemr.stem(word) for word in filtered]
    tagged = nltk.pos_tag(stemmed)
    lemmatized = []

    for i in range(len(tagged)):
        lemmatized.append(lemr.lemmatize(tagged[i][0], tag_map[tagged[i][1][0]]))
    
    retagged = nltk.pos_tag(lemmatized)
    grammar = """NP: {<DT|RB><VBZ>*<CD><NN>}
                     {<VBZ><CD><NN>}
                     {<CD><NN><VBZ>}
                     {<CD><NN>*}
                     """   
    parser = nltk.RegexpParser(grammar)
    tree = parser.parse(retagged)

    print(tree)
    tree.draw()
    # print(tree[0])

if __name__ == "__main__":

    text1 = "2 hour meeting with John about virtual teaching and e-learning on Zoom a week from now on Friday at 12:34 PM."
    text2 = "You, me, 3 hour fun time at the carnival with Bill on Monday at 4 PM focused on winning prizes and playing games"
    text3 = "We are eating pasta and having dinner at 10:27 PM on Tuesday. I am so excited for the fettucini alfredo"
    Nlp(text1)
    Nlp(text2)
    Nlp(text3)


"""
Tokenization
Stemming
POS Tags
Lemmatization
Named Entity Recognition
chunking
"""
