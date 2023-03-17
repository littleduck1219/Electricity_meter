from io import BytesIO

import os
import sys

sys.path.append('/Users/gyeongdeokpark/Desktop/YOLOv5-Flask-1-master/yolov5')
import random
import numpy as np
import cv2
import torch
from flask import Flask, render_template, Response, request, send_file
from PIL import Image
from yolov5.models.experimental import attempt_load
from yolov5.utils.general import check_img_size, non_max_suppression
from yolov5.utils.torch_utils import select_device, time_sync
from yolov5.utils.downloads import attempt_download

app = Flask(__name__, static_folder='templates')

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = attempt_load('best.pt', device)  # 여기에서 모델 경로를 수정해 주세요.
stride = int(model.stride.max())
img_size = 640
names = model.module.names if hasattr(model, 'module') else model.names

label_mapping = {
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9",
    "zero": "0",
    "dot": ".",
    "meter": ""
}


@app.route('/')
def index():
    return render_template('index.html')


camera = cv2.VideoCapture(0)
camera.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
camera.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)


def letterbox(img, new_shape=(640, 640), color=(114, 114, 114), auto=True, scale_fill=False, scaleup=True):
    # Resize image to a 32-pixel-multiple rectangle https://github.com/ultralytics/yolov3/issues/232
    shape = img.shape[:2]  # current shape [height, width]
    if isinstance(new_shape, int):
        new_shape = (new_shape, new_shape)

    # Scale ratio (new / old)
    r = min(new_shape[0] / shape[0], new_shape[1] / shape[1])
    if not scaleup:  # only scale down, do not scale up (for better test mAP)
        r = min(r, 1.0)

    # Compute padding
    ratio = r, r  # width, height ratios
    new_unpad = int(round(shape[1] * r)), int(round(shape[0] * r))
    dw, dh = new_shape[1] - new_unpad[0], new_shape[0] - new_unpad[1]  # wh padding
    if auto:  # minimum rectangle
        dw, dh = np.mod(dw, 32), np.mod(dh, 32)  # wh padding
    elif scale_fill:  # stretch
        dw, dh = 0.0, 0.0
        new_unpad = (new_shape[1], new_shape[0])
        ratio = new_shape[1] / shape[1], new_shape[0] / shape[0]  # width, height ratios

    dw /= 2  # divide padding into 2 sides
    dh /= 2

    if shape[::-1] != new_unpad:  # resize
        img = cv2.resize(img, new_unpad, interpolation=cv2.INTER_LINEAR)
    top, bottom = int(round(dh - 0.1)), int(round(dh + 0.1))
    left, right = int(round(dw - 0.1)), int(round(dw + 0.1))
    img = cv2.copyMakeBorder(img, top, bottom, left, right, cv2.BORDER_CONSTANT, value=color)  # add border
    return img, ratio, (dw, dh)


def scale_coords(img1_shape, coords, img0_shape, ratio_pad=None):
    # Rescale coords (xyxy) from img1_shape to img0_shape
    if ratio_pad is None:  # calculate from img0_shape
        gain = max(img1_shape) / max(img0_shape)  # gain  = old / new
        pad = (img1_shape[1] - img0_shape[1] * gain) / 2, (img1_shape[0] - img0_shape[0] * gain) / 2  # wh padding
    else:
        gain = ratio_pad[0][0] / ratio_pad[1][0]  # width gain
        pad = ratio_pad[1]  # wh padding

    coords[:, [0, 2]] -= pad[0]  # x padding
    coords[:, [1, 3]] -= pad[1]  # y padding
    coords[:, :4] /= gain
    clip_coords(coords, img0_shape)
    return coords


def sort_boxes_by_x_position(boxes):
    return sorted(boxes, key=lambda x: x[0])


def plot_one_box(x, img, color=None, label=None, line_thickness=None, position=None):
    tl = line_thickness or round(0.002 * (img.shape[0] + img.shape[1]) / 2) + 1  # line/font thickness
    color = color or [random.randint(0, 255) for _ in range(3)]
    c1, c2 = (int(x[0]), int(x[1])), (int(x[2]), int(x[3]))
    cv2.rectangle(img, c1, c2, color, thickness=tl, lineType=cv2.LINE_AA)

    if label:
        tf = max(tl - 1, 1)  # font thickness
        t_size = cv2.getTextSize(label, 0, fontScale=2 * tl / 3, thickness=tf)[0]
        if position:
            text_origin = (position[0], position[1])
        else:
            text_origin = (c1[0], c1[1] - 2)

        cv2.putText(img, label, text_origin, 0, 2 * tl / 3, [225, 255, 255], thickness=tf, lineType=cv2.LINE_AA)

    return img


def clip_coords(boxes, img_shape):
    # Clip bounding xyxy bounding boxes to image shape (height, width)
    boxes[:, 0].clamp_(0, img_shape[1])  # x1
    boxes[:, 1].clamp_(0, img_shape[0])  # y1
    boxes[:, 2].clamp_(0, img_shape[1])  # x2
    boxes[:, 3].clamp_(0, img_shape[0])  # y2


def detect_on_uploaded_image(image):
    img = np.array(image)
    result_img = detect_on_frame(img)
    result_img = Image.fromarray(cv2.cvtColor(result_img, cv2.COLOR_BGR2RGB))
    return result_img


def fix_image_rotation(image):
    try:
        exif = image._getexif()
    except (AttributeError, IndexError, KeyError, TypeError):
        exif = None

    if exif and 274 in exif:
        orientation = exif[274]
        if orientation == 3:
            image = image.rotate(180, expand=True)
        elif orientation == 6:
            image = image.rotate(270, expand=True)
        elif orientation == 8:
            image = image.rotate(90, expand=True)
    return image


@app.route('/detect_image', methods=['POST'])
def detect_image():
    if request.method == 'POST':
        file = request.files['image']
        if file:
            image = Image.open(file.stream)
            image = fix_image_rotation(image)  # Add this line to fix the rotation
            result_img = detect_on_uploaded_image(image)
            img_io = BytesIO()
            result_img.save(img_io, 'JPEG', quality=70)
            img_io.seek(0)
            return send_file(img_io, mimetype='image/jpeg')


def detect_on_frame(img):
    imgsz = check_img_size(img_size, s=stride)
    img_in, _, _ = letterbox(img, new_shape=imgsz, auto=True, scale_fill=False, scaleup=True)
    img_in = img_in[:, :, ::-1].transpose(2, 0, 1)  # BGR to RGB, to 3x416x416
    img_in = np.ascontiguousarray(img_in)
    img_in = torch.from_numpy(img_in).to(device)
    img_in = img_in.float()
    img_in /= 255.0
    if img_in.ndimension() == 3:
        img_in = img_in.unsqueeze(0)

    pred = model(img_in, augment=False)[0]
    pred = non_max_suppression(pred, 0.4, 0.5, None, False, max_det=1000)

    det_list = []
    confidence_threshold = 0.75  # 원하는 쓰레쉬홀드 값을 설정하세요.

    for i, det in enumerate(pred):
        if len(det):
            det[:, :4] = scale_coords(img_in.shape[2:], det[:, :4], img.shape).round()

            for *xyxy, conf, cls in det:
                if conf > confidence_threshold:  # 쓰레쉬홀드 값보다 높은 경우에만 인식된 객체를 고정
                    original_label = names[int(cls)]
                    new_label = label_mapping.get(original_label, original_label)
                    if new_label != '':
                        det_list.append((xyxy, new_label))

    sorted_det_list = sorted(det_list, key=lambda x: x[0][0])
    label_str = ""

    for xyxy, new_label in sorted_det_list:
        if new_label == 'meter':
            plot_one_box(xyxy, img, label=new_label, color=None, line_thickness=None)
        else:
            position = (int(xyxy[0]), int(img.shape[0]) - 30)
            plot_one_box(xyxy, img, label=new_label, color=None, line_thickness=None, position=position)
            label_str += new_label

    if label_str:
        label_float = float(label_str.lstrip('0'))
    else:
        label_float = 0
    print(label_float)
    return img


def generate_frames():
    while True:
        ref, frame = camera.read()
        if not ref:
            break
        else:
            frame = detect_on_frame(frame)
            ref, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__ == '__main__':
    os.environ['FLASK_RUN_PORT'] = '8000'
    app.run(host="localhost", port=8000, debug=True)
