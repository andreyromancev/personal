import os
import json
from threading import Thread
from flask import Flask, request
from flask_mail import Mail, Message


app = Flask(__name__)
app.config.update(
    MAIL_SERVER=os.environ.get('MAIL_SERVER'),
    MAIL_PORT=os.environ.get('MAIL_PORT'),
    MAIL_USERNAME=os.environ.get('MAIL_USERNAME'),
    MAIL_PASSWORD=os.environ.get('MAIL_PASSWORD'),
    MAIL_USE_SSL=True,
)

mail = Mail(app)


def send_email(app, msg):
    with app.app_context():
        mail.send(msg)


@app.route('/api/contact', methods=['POST'])
def contact():
    data = json.loads(request.data)
    msg = Message(
        'Contact Request',
        html="""
            <p>{email}</p>
            <p>{message}</p>
        """.format(
            email=data.get('email'),
            message=data.get('message'),
        ),
        sender='bot@romancev.com',
        recipients=["andrey@romancev.com"],
    )
    thr = Thread(target=send_email, args=[app, msg])
    thr.start()

    return '', 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
