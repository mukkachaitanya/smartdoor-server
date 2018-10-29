import os
import sys
import face_recognition
import pickle

abs_path = os.path.dirname(os.path.realpath(__file__))

name = sys.argv[1]
unknown_image = face_recognition.load_image_file(sys.argv[2])
try:
    unknown_encoding = face_recognition.face_encodings(unknown_image)[0]

    if os.path.getsize(str(abs_path) +"/true_encodings.csv") == 0:
        dict={}
        dict[name] = unknown_encoding
        with open(str(abs_path) + "/true_encodings.csv","wb") as f:
            pickle.dump(dict,f)

    else:
        with open(str(abs_path) + "/true_encodings.csv", "rb") as f:
            dict = pickle.load(f)

        dict[name] = unknown_encoding

        with open(str(abs_path) +  "/true_encodings.csv","wb") as f:
            pickle.dump(dict,f)

except:
    print("No face detected, try other image")

