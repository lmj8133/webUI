# run websocket
import os
import shutil
import sys
import threading
import asyncio

# 加入include path
sys.path.append(os.getcwd()+'/python-server')

import server


def exit_program():
    # remove temp dir
    for dir in os.listdir(os.path.join(os.getcwd(), "temp")):
        shutil.rmtree(os.path.join(os.getcwd(), "temp", dir))
    os.rmdir(os.path.join(os.getcwd(), "temp"))

    print("\033[1;31;40mprogram exit\033[0m")
    exit()


if __name__ == "__main__":
    if sys.argv[1:]:
        port = int(sys.argv[1])
    else:
        port = 80

    # websocket server
    socket_thread = threading.Thread(
        target=server.socket_server_run,
        daemon=True
    )
    socket_thread.start()

    # http server
    # hppt_thread = threading.Thread(
    #     target=server.http_server_run,
    #     args=(port,),
    #     daemon=True
    # )
    # hppt_thread.start()
    asyncio.run(server.http_server_run(port))

    # temp dir
    if not os.path.exists(os.path.join(os.getcwd(), "temp")):
        os.makedirs(os.path.join(os.getcwd(), "temp"))

    while True:
        try:
            # if socket_thread.is_alive() and hppt_thread.is_alive():
            if socket_thread.is_alive():
                continue
            exit_program()
        except SystemExit:
            break
        except:
            exit_program()