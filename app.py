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
from flask import Flask, render_template, Response, request, url_for, redirect, send_from_directory

app = Flask(__name__, static_folder='templates')

# Device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Labels
# Labels = {0: "one",
#           1: "two",
#           2: "three",
#           3: "four",
#           4: "five",
#           5: "six",
#           6: "seven",
#           7: "eight",
#           8: "nine",
#           9: "zero",
#           10: "meter",
#           11: "dot"
#           }


@app.route('/')  # 127.0.0.1
def index():
    return render_template('index.html')


camera = cv2.VideoCapture(0)
camera.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
camera.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)


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


if __name__ == '__main__':
    app.run(host="localhost", port=8000, debug=True)
