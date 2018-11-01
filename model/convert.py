from PIL import Image
img = Image.open('/home/sid/Desktop/SE_Facial_Recognition/unknown_images/tiger.bmp')
new_img = img.resize( (256, 256) )
new_img.save( '/home/sid/Desktop/SE_Facial_Recognition/unknown_images/tiger.jpeg', 'jpeg')
