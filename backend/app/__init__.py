from flask import Flask

app = Flask(__name__,
            template_folder="../../frontend/dist",
            static_folder="../../frontend/dist/assets")

from app import routes

from app import socket

import asyncio

asyncio.run(socket.main())