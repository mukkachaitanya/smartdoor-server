import os
import face_recognition
#os.chdir("/home/sid/Desktop/SE_Facial_Recognition/known_images")

f = open("/home/sid/Desktop/SE_Facial_Recognition/true_encodings.txt","a+")

import os
for file in os.listdir("/home/sid/Desktop/SE_Facial_Recognition/known_images"):
    if file.endswith(".jpg"):
        known_image = face_recognition.load_image_file("/home/sid/Desktop/SE_Facial_Recognition/known_images/"+file)
        known_encoding = face_recognition.face_encodings(known_image)[0]
        #print(known_encoding)
        f.write(str(known_encoding)+"\n")

#for img in glob.glob(".jpg"):
#    known_image = face_recognition.load_image_file(img)
#    known_encoding = face_recognition.face_encodings(known_image)[0]
#    f.write(known_encoding)

f.close()
