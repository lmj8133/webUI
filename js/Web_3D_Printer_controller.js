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

    //Auto Home
    $("#auto_home_btn").on('click',function(){
        ws.send('test\n');
    });

    $("#open_file").change(function(){
        ws.send('open\n');
    });
    
    $("#create_cb").on('click',function(){
        console.log("create cb");
        ws.send('create_cb\n');
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'car';
        checkbox.name = 'interest';
        checkbox.value = 'car';
     
        var label = document.createElement('label')
        label.htmlFor = 'car';
        label.appendChild(document.createTextNode('Car'));
     
        var br = document.createElement('br');
     
        var container = document.getElementById('container');
        container.appendChild(checkbox);
        container.appendChild(label);
        container.appendChild(br);
    });

    $("#create_cb_batch").on('click',function(){
        ws.send('create_cb\n');
        $.getJSON('http://localhost/js/ui.json', function(data) {
            //do stuff with your data here
            var jsonLength = Object.keys(data.item).length;
            var container = document.getElementById('container');
            while(container.childNodes.length) {
                container.childNodes[0].remove();
            }
            console.log(jsonLength);
            for(var i = 0; i < jsonLength; i++) {
                var checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = data.item[i];
                checkbox.name = 'interest';
                checkbox.value = data.item[i];
             
                var label = document.createElement('label')
                label.htmlFor = data.item[i];
                label.appendChild(document.createTextNode(data.item[i]));
             
                var br = document.createElement('br');
             
                //var container = document.getElementById('container');
                container.appendChild(checkbox);
                container.appendChild(label);
                container.appendChild(br);
            }
        });
    });

    $("#clear_cb").on('click',function(){
        var container = document.getElementById('container');
        //console.log(container.childElementCount);
        deleteCheckbox(container);
        //while(container.childNodes.length) {
        //    container.childNodes[0].remove();
        //}
    });

    $("#save").on('click', function(){
        ws.send('save\n');
        ws.send(dropdownListSelected('#define BOARD_NO'));
        //var dropdownList = document.getElementById("#define BOARD_NO");
        //var index = dropdownList.selectedIndex;
        //console.log(dropdownList.options[index].text);
        //ws.send(dropdownList.options[index].text + '\n');
        ws.send('end\n');
    });
});

function dropdownListSelected(id)
{
    var dropdownList = document.getElementById(id);
    var index = dropdownList.selectedIndex;
    console.log(dropdownList.options[index].text);
    return dropdownList.options[index].text + '\n';
}
