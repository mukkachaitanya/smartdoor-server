import face_recognition
import sys
import numpy as np
import re
import os

#f = open("/home/sid/Desktop/SE_Facial_Recognition/true_encodings.txt","a+")

unknown_image = face_recognition.load_image_file(sys.argv[1])
unknown_encoding = face_recognition.face_encodings(unknown_image)[0]
#print(unknown_encoding)

abs_path = os.path.dirname(os.path.realpath(__file__))

with open(str(abs_path)+'/true_encodings.txt', 'r') as myfile:
    data = myfile.read().replace('\n','')

x = data.split('][')
result = False
x[0] = x[0][1:]
x[-1] =x[-1][:-1]
#print(x)
for i in x:
    t = re.split('  | ',i)
    #print(t)
    list = []
    for num in t:
        if(not num==''):
            list.append(float(num))
    test = np.asarray(list)
    #print(test.size)
    #print(type(test))
    #print(type(unknown_encoding))
    #dist = face_recognition.face_distance([test],unknown_encoding)
    #print(dist)
    bool = face_recognition.compare_faces([test],unknown_encoding,tolerance=0.45)
    #print(bool[0])
    result = result or bool[0]
print(result)
