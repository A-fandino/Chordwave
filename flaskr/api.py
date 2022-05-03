from random import choice
import os
from flask import Blueprint, redirect, request
from string import ascii_letters, digits
bp = Blueprint('api', __name__, url_prefix='/api')


@bp.route('/upload', methods=['POST'])
def index():
    file = request.files['file']
    file.stream.seek(0)
    ext = file.filename.split(".")[-1]

    path = './flaskr/uploads/music'
    if (not os.path.exists(path)):
        os.makedirs(path)
    file.save(f'{path}/{randomName()}.{ext}')
    return redirect('http://localhost/')


def randomName():
    LENGTH = 20
    name = ''
    for _ in range(20):
        name += choice(ascii_letters + digits)
    return name
