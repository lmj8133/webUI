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
            //console.log("data length: "+dataReceive.length); //for debug
            var data_buf = dataReceive.trim();                 //remove '\n'
            data_buf = data_buf.split(",");                    //save to data array
            var cmd = data_buf[0];                             //get cmd

            //cmd handler
            if(cmd == 'mesh_record'){
                var td_ary = $("#grid_tbl").find($("input"));
                for(var i = 0; i<row_num*column_num; i++){
                    $(td_ary[i]).val(data_buf[i+1]);
                }
            }
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
    //從PC讀取網格值
    $("#read_mesh_from_pc_btn").on('click',function(){
        ws.send('read_mesh_from_pc\n');
    });

    //從列印機讀取網格值
    $("#read_mesh_from_marlin_btn").on('click',function(){
        ws.send('read_mesh_from_marlin\n');
    });

    //網格值歸0
    $("#clear_mesh_btn").on('click',function(){
        reset_grid_value();
        ws.send('clear_mesh\n');
    });

    //Auto Home
    $("#auto_home_btn").on('click',function(){
        ws.send('test\n');
    });

    //BedLeveling
    $("#bedleveling_btn").on('click',function(){
        ws.send('bedleveling\n');
    });

    //save網格值到marlin
    $("#save_mesh_to_marlin_btn").on('click',function(){
        //製作grid value string
        tx_str = 'save_mesh_to_marlin,';
        var td_ary = $("#grid_tbl").find($("input"));
        for(var i = 0; i<row_num*column_num; i++){
            tx_str += $(td_ary[i]).val();
            if(i < row_num*column_num - 1) tx_str += ','; 
            else                           tx_str += '\n'; 
        }
        //傳送string到websocket server
        ws.send(tx_str);
    });

    //save網格值到PC
    $("#save_mesh_to_pc_btn").on('click',function(){
        ws.send('save_mesh_to_pc\n');
    });
});
