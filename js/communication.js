$(function(){
    // 判斷瀏覽器支不支援 WebSocket
    if ("WebSocket" in window){

        /*====================================================================
        __        __   _    ____             _        _       ____ _ _            _      ___       _ _   
        \ \      / /__| |__/ ___|  ___   ___| | _____| |_    / ___| (_) ___ _ __ | |_   |_ _|_ __ (_) |_ 
         \ \ /\ / / _ \ '_ \___ \ / _ \ / __| |/ / _ \ __|  | |   | | |/ _ \ '_ \| __|   | || '_ \| | __|
          \ V  V /  __/ |_) |__) | (_) | (__|   <  __/ |_   | |___| | |  __/ | | | |_    | || | | | | |_ 
           \_/\_/ \___|_.__/____/ \___/ \___|_|\_\___|\__|   \____|_|_|\___|_| |_|\__|  |___|_| |_|_|\__|
                                                                                                  
         ====================================================================*/
        console.log("您的瀏覽器支援 WebSocket!");
        //var ws = new WebSocket("ws://49.158.75.36:9002");
        //var ws = new WebSocket("ws://192.168.3.193:9002");
        var ws = new WebSocket("ws://localhost:9002");
        ws.onopen = function(){
            console.log("websocket 已連線上");
        }

        ws.onclose = function() {
            console.log("連線已關閉...");
        };
        

        /*===================================================
          ____ __  __ ____     ____                          
         / ___|  \/  |  _ \   |  _ \ __ _ _ __ ___  ___ _ __ 
        | |   | |\/| | | | |  | |_) / _` | '__/ __|/ _ \ '__|
        | |___| |  | | |_| |  |  __/ (_| | |  \__ \  __/ |   
         \____|_|  |_|____/   |_|   \__,_|_|  |___/\___|_|         

        ===================================================*/
        ws.onmessage = function (evt) {
            var dataReceive = evt.data;                        //dataReceive為字串
            //consol.log(dataReceive);                         //for debug
            //console.log("data length: "+dataReceive.length); //for debug
            var data_buf = dataReceive.trim();                 //remove '\n'
            data_buf = data_buf.split(",");                    //save to data array
            var cmd = data_buf[0];                             //get cmd

            // cmd handler
            // TODO
        };

    }else{
        // 瀏覽器不支援 WebSocket
        console.log("您的瀏覽器不支援 WebSocket!");
    }


    /*===================================================
      ____ __  __ ____     _____     _     _      
     / ___|  \/  |  _ \   |_   _|_ _| |__ | | ___ 
    | |   | |\/| | | | |    | |/ _` | '_ \| |/ _ \
    | |___| |  | | |_| |    | | (_| | |_) | |  __/
     \____|_|  |_|____/     |_|\__,_|_.__/|_|\___|
                                                  
    ===================================================*/
    //註冊button callback func
    //cofirm btn
    $("#comfirm_btn").on('click',function(){
        var packet = {
            cmd: 'comfrim',
            data: global_var.board_no
        };
        
        ws.send(JSON.stringify(packet) + '\n');
    });

});
