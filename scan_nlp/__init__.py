

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

tag_map = defaultdict(lambda: wordnet.NOUN)
tag_map['J'] = wordnet.ADJ
tag_map['V'] = wordnet.VERB
tag_map['R'] = wordnet.ADV

days = [
    "sunday", "monday", "tuesday",
    "wednesday", "thursday", "friday",
    "saturday"
]

inums = [1, 2, 3, 4, 5, 6, 7, 8, 9]
nums = []

for num in inums:
    nums.append(str(num))


def Nlp(text_data):

    #Setting up stemmer and lematizer and defining eventual return object
    return_dict = {}
    stemr = PorterStemmer()
    lemr = WordNetLemmatizer()
    
    #Tokenizing Data and Removing Stop Words
    token_list = word_tokenize(text_data)
    stop_words = set(stopwords.words('english'))
    # stop_words.add('am')
    # stop_words.add('pm')
    filtered = []

    for i in range(len(token_list)):
        if token_list[i].casefold() not in stop_words:
            filtered.append(token_list[i])
    
    #Stemming Text Data and Tagging by part of speech
    stemmed = [stemr.stem(word) for word in filtered]
    tagged = nltk.pos_tag(stemmed)
    
    #Lemmatizing Text Data
    lemmatized = []

    for i in range(len(tagged)):
        lemmatized.append(lemr.lemmatize(
            tagged[i][0], tag_map[tagged[i][1][0]]))

    #Retagging Text data by part of speech to prepare for chunking
    retagged = nltk.pos_tag(lemmatized)
    
    #Esablishing grammar rules and chunking text data
    grammar = """NP: {<DT|RB><VBZ>*<CD><NN>}
                     {<VBZ><CD><NN>}
                     {<CD><NN><VBZ>}
                     {<CD><NN>*}
                     """
    parser = nltk.RegexpParser(grammar)
    tree = parser.parse(retagged)
    
    #Reformatting chunked text data to extract information
    text = str(tree).splitlines()
    rfinal = []

    for i in range(len(text)):
        if "NP" in text[i]:
            final = str(str(text[i]).split()).split("/")

    for i in range(len(final)):
        final[i] = final[i].split("'")
        for j in range(len(final[i])):
            rfinal.append(final[i][j])

    for i in range(len(rfinal)):
        if rfinal[i] in days:
            return_dict['day'] = rfinal[i].capitalize()

        elif rfinal[i][0] in nums:
            return_dict['time'] = rfinal[i] + " pm"

    return return_dict


if __name__ == "__main__":
    # Test calls
    text1 = "Meeting with John about virtual teaching and e-learning on Zoom a week from now on Friday at 12:34 PM."
    text2 = "You, me, fun time at the carnival with Bill on Monday at 4 PM focused on winning prizes and playing games"
    text3 = "We are eating pasta and having dinner at 10:27 PM on Tuesday. I am so excited for the fettucini alfredo"
    print(Nlp(text1))
    print(Nlp(text2))
    print(Nlp(text3))
