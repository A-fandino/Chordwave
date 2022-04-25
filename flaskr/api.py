from flask import Blueprint
bp = Blueprint('api', __name__, url_prefix='/api')


@bp.route('/upload', methods=['POST'])
def index():
    return 'Uploaded'
