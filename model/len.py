import pickle
import os

abs_path = os.path.dirname(os.path.realpath(__file__))
f = open(str(abs_path) + "/true_encodings.csv","a+")

dict = pickle.load(f)
print(len(dict))
for key, value in dict.iteritems():
    print(key)

f.close()
