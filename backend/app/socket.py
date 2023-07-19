import asyncio
import sys

from websockets.server import serve


async def echo(websocket):
    async for message in websocket:
        # process message here
        #
        # await websocket.send(message + " from server")
        # print(message)
        pass

async def main():
    argv = sys.argv[1:]
    if "--host" in argv:
        HOST = argv[argv.index("--host") + 1]
    else:
        HOST = "localhost"

    stop = asyncio.Future()

    server = await serve(echo, HOST, 8765)
    await stop
    await server.close()