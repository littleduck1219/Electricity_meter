import datetime
import os
import argparse
import io

import numpy as np
import pandas as pd

import cv2
from PIL import Image, ImageFont, ImageDraw
import seaborn as sns
import torch
import torch.nn as nn
import torch.nn.functional as F
from torch.autograd import Variable
import torchvision
from torchvision import models
from torchvision import transforms
# import albumentations as A
# from albumentations.pytorch.transforms import ToTensorV2



from flask import Flask, render_template, Response, request, url_for, redirect, send_from_directory

# Device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Labels
Labels = {0: "one",
          1: "two",
          2: "three",
          3: "four",
          4: "five",
          5: "six",
          6: "seven",
          7: "eight",
          8: "nine",
          9: "zero",
          10: "meter",
          11: "dot"
          }

app = Flask(__name__, static_folder='templates')


@app.route('/')  # 127.0.0.1
def index():
    return render_template('index.html')


camera = cv2.VideoCapture(0)
camera.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
camera.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

# def preprocess(image):
#     image = Image.fromarray(image)  # Webcam frames are numpy array format
#     # Therefore transform back to PIL 05.image
#     image = data_transforms(image)
#     image = image.float()
#     # 05.image = Variable(05.image, requires_autograd=True)
#     image = image.cpu()
#     image = image.unsqueeze(0)  # I don't know for sure but Resnet-50 model seems to only
#     # accpets 4-D Vector Tensor so we need to squeeze another
#     return image  # dimension out of our 3-D vector Tensor

# Let's start the real-time classification process!

show_score = 0
show_res = 'Nothing'
sequence = 0


def generate_frames():
    while True:
        ref, frame = camera.read()  # 현재 영상을 받아옴
        if not ref:
            break
        else:
            ref, buffer = cv2.imencode('.jpg', frame)  # 현재 영상을 그림파일형태로 바꿈
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')  # 그림파일들을 쌓아두고 호출을 기다림
                # image = frame[200: 550, 250:670]
                # # 05.image = cv2.normalize(05.image, None, 80, 220, cv2.NORM_MINMAX)
                # image_data = preprocess(image)
                # prediction = model(image_data)
                #
                # softmax_result = F.softmax(prediction)
                # result, score = torch.topk(softmax_result, 1)
                # acc = ": " + str(round(result.item() * 100, 3)) + "%"

                # if float(round(result.item() * 100, 3)) > 50:
                #     # if score > 1.7:
                #     # show_res = Labels[score.item()]
                #     show_score = acc
                #     # show_res = result
                #     # show_score = score
                # else:
                #     show_res = "Nothing"
                #     show_score = acc

                # cv2.rectangle(frame, (240, 120), (600, 400), (0, 255, 0), 2)
                # cv2.imshow("ASL SIGN DETECTER", frame)

        # ref, buffer = cv2.imencode('.png', frame)
        # frame = buffer.tobytes()

        # if capture_btn:  # is_capture가 참이면
        #     capture_btn = False  # is_capture를 거짓으로 만들고
        #     cv2.imwrite("capture " + nowDatetime_path + ".png", frame1)  # 이미지로 영상을 캡쳐하여 그림파일로 저장
        #
        # yield (b'--frame\r\n'
        #        b'Content-Type: image/png\r\n\r\n' + frame + b'\r\n')


# cam load.
@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


models = {}

DETECTION_URL = "/v1/object-detection/<model>"


@app.route(DETECTION_URL, methods=["POST"])
def predict(model):
    if request.method != "POST":
        return

    if request.files.get("image"):
        # Method 1
        # with request.files["image"] as f:
        #     im = Image.open(io.BytesIO(f.read()))

        # Method 2
        im_file = request.files["image"]
        im_bytes = im_file.read()
        im = Image.open(io.BytesIO(im_bytes))

        if model in models:
            results = models[model](im, size=640)  # reduce size=320 for faster inference
            return results.pandas().xyxy[0].to_json(orient="records")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Flask API exposing YOLOv5 model")
    parser.add_argument("--port", default=8000, type=int, help="port number")
    parser.add_argument('--model', nargs='+', default=['yolov5x'], help='model(s) to run, i.e. --model yolov5n yolov5s')
    opt = parser.parse_args()

    for m in opt.model:
    # models[m] = torch.hub.load("ultralytics/yolov5", 'custom', 'best.pt', force_reload=True, skip_validation=True)
        models[m] = torch.hub.load("ultralytics/yolov5", 'custom', './best(acc_0.44).pt', force_reload=True, skip_validation=True)
    app.run(host="0.0.0.0", port=opt.port)  # debug=True causes Restarting with stat