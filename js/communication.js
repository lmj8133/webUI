
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
            alert("連線已關閉...")
        };


        // command parser
        ws.onmessage = function (e) {
            var packet = JSON.parse(e.data);
            var cmd = packet.cmd;
            var data = packet.data;

            // cmd handler
            // TODO
            if (cmd == 'found_title') {
                function changeValue(id, value) {
                    if (!value) {
                        return;
                    }
                    var type = $("#" + id).attr('type');
                    if (type == 'checkbox') {
                        $("#" + id).prop('checked', value);
                    } else {
                        $("#" + id).text(value);
                    }
                    console.log("changeValue, id: " + id + ", value: " + value);
                }

                for (var data_id in data) {
                    changeValue(data_id, data[data_id]);
                }

                for (const json of global_var.ui_json) {
                    let dependency = json.dependency;
                    if (dependency) {
                        let id = "";
                        if (json.widget_type == "dropdown") {
                            id = json.result.id;
                        }
                        else if (json.widget_type == "checkbox") {
                            id = json.id;
                        }

                        if ($("#" + dependency + ":checked").val()) {
                            $("#" + id).removeAttr("disabled");
                        } else {
                            $("#" + id).attr("disabled", true);
                        }
                    }
                }
            }
            else if (cmd == 'finish') {
                Object.assign(document.createElement('a'),
                    { href: 'http://localhost/' + data['path'], download: data['filename'] }).click();
            }
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
        if (!global_var.file) {
            console.warn('global_var.file is null');
            alert("Please upload Header file")
            return false;
        }
        var packet = {
            cmd: 'comfrim',
            data: global_var.data
        };

        ws.send(JSON.stringify(packet) + '\n');
    });

    $("#exit-btn").on('click', function () {
        if (confirm("確定要關閉程式？")) {
            var packet = {
                cmd: 'exit'
            };

            ws.send(JSON.stringify(packet) + '\n');

            alert("程式已關閉");

            window.href = "about:blank";
            window.close();
        }
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

        global_var.data = {};
        var files = e.originalEvent.dataTransfer.files;
        global_var.file = files[0];
        if (!headerFileUpload(files)) {
            alert('Not a header file');
        }
    });

    // 實現選取檔案上傳
    $('#file').on('change', function () {
        global_var.data = {};
        global_var.file = this.files[0];
        headerFileUpload(this.files);
    });

});
