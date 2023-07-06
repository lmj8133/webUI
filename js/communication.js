
$(function () {
    // 判斷瀏覽器支不支援 WebSocket
    if ("WebSocket" in window) {

        //web socket client init
        console.log("您的瀏覽器支援 WebSocket!");
        var ws = new WebSocket("ws://localhost:9002");
        ws.onopen = function () {
            console.log("websocket 已連線上");
        }

        ws.onclose = function () {
            console.log("連線已關閉...");
        };


        // command parser
        ws.onmessage = function (evt) {
            var dataReceive = evt.data;                        //dataReceive為字串
            var data_buf = dataReceive.trim();                 //remove '\n'
            data_buf = data_buf.split(",");                    //save to data array
            var cmd = data_buf[0];                             //get cmd

            // cmd handler
            // TODO
        };

    } else {
        // 瀏覽器不支援 WebSocket
        console.log("您的瀏覽器不支援 WebSocket!");
    }

    // ========================================================================
    // command table
    //註冊button callback func
    //cofirm btn

    $("#comfirm-btn").on('click', function () {
        var packet = {
            cmd: 'comfrim',
            data: global_var.data
        };

        ws.send(JSON.stringify(packet) + '\n');
    });

    $("#exit-btn").on('click', function () {
        var packet = {
            cmd: 'exit'
        };

        ws.send(JSON.stringify(packet) + '\n');
    });


    // 非拖曳區域圖式
    $('#wrapper').on('dragover', function (e) {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer = e.originalEvent.dataTransfer;
        e.dataTransfer.dropEffect = 'none';
    });
    // 拖曳區域圖式
    $('#content').on('dragover', function (e) {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer = e.originalEvent.dataTransfer;
        e.dataTransfer.dropEffect = 'copy';
    });

    function headerFileUpload(files) {
        var file = files[0];
        if (file.name.split('.').pop() != 'h') {
            console.warn('Not a header file');
            return false;
        }
        var reader = new FileReader();

        reader.addEventListener('load', (event) => {
            var code_load = event.target.result;
            $('#code-preview').val(code_load);

            var packet = {
                cmd: 'headerFile',
                data: code_load,
                name: file.name,
                size: file.size
            };
            ws.send(JSON.stringify(packet) + '\n');
            console.log("headerFileUpload, file: " + file.name + ", size: " + file.size);
            $('#file-label').text(file.name);
        });

        reader.readAsDataURL(file);

        return true;
    }
    // 實現拖入檔案上傳
    $('#content').on('drop', function (e) {
        e.stopPropagation();
        e.preventDefault();

        var files = e.originalEvent.dataTransfer.files;
        if (!headerFileUpload(files)) {
            alert('Not a header file');
        }
    });

    // 實現選取檔案上傳
    $('#file').on('change', function () {
        headerFileUpload(this.files);
    });

});
