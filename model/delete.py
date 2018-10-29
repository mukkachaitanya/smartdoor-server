import sys
import pickle
import os

abs_path = os.path.dirname(os.path.realpath(__file__))
f = open(str(abs_path) + "/true_encodings.csv","a+")

dict = pickle.load(f)

name = sys.argv[1]
if name in dict:
    del dict[name]
    with open(str(abs_path) + "/true_encodings.csv","wb") as f:
        pickle.dump(dict,f)
    print("Deleted successfully")
else:
    print("No such name in the database")

f.close()
