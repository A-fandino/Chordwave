from flask import Blueprint, redirect, render_template, session, request, url_for
import functools
from werkzeug.security import check_password_hash, generate_password_hash

bp = Blueprint('auth', __name__, url_prefix='/auth')


@bp.route('/login', methods=('GET', 'POST'))
def index():
    return 'Not yet...'


@bp.route('/logout')
def logout():
    session.clear()
    return redirect('/')


def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if None is None:
            return redirect(url_for('auth.login'))
        return view(**kwargs)
    return wrapped_view
