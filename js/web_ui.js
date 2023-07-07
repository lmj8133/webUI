var global_var = {
    ui_json: undefined,
    file: undefined,
    data: undefined,
};

function create_dropdown_widget(para) {
    var id = para.id;
    var title = para.title;
    var result = para.result;
    var item_num = para.content.length;
    var content = para.content;
    var dependency = para.dependency;

    var dropdown_widget_html_str =
        '<div class="input-group mb-3 justify-content-between">' +
        '<div class="input-group-prepend flex-grow-1">' +
        '<label class="input-group-text w-100" id="inputGroup-sizing-default" for="' + id +
        '"> ' + title + '</label> ' +
        '</div>' +
        '<div class="input-group-append dropright">' +
        '<button class="btn btn-outline-secondary dropdown-toggle" id="' +
        id +
        '" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"' +
        (dependency ? 'disabled' : '') + '>' +
        result.default_text +
        '</button>' +
        '<div class="dropdown-menu">';

    for (var i = 0; i < item_num; i++) {
        var tip_str = "";
        for (var tip in content[i]) {
            if (tip == 'id' || tip == 'value')
                continue;
            if (tip == 'note') {
                tip_str += content[i][tip] + "\r\n";
                continue;
            }
            tip_str += tip + ": " + content[i][tip] + "\r\n";
        }
        if (dependency != "") {
            tip_str += "Dependency: " + dependency + "\r\n";
        }
        dropdown_widget_html_str += '<a class="dropdown-item" id="' + content[i].id + '" data-toggle="tooltip" title="' + tip_str + '">' + content[i].value + '</a>';
    }

    dropdown_widget_html_str +=
        '</div>' +
        '</div>' +
        '</div>';

    return dropdown_widget_html_str;
}

function create_checkbox_widget(para) {
    var id = para.id;
    var title = para.title;
    var content = para.content;
    var dependency = para.dependency;

    var checkbox_widget_html_str =
        '<div class="input-group mb-3 justify-content-between">' +
        '<div class="input-group-prepend flex-grow-1">' +
        '<label class="input-group-text w-100" id="inputGroup-sizing-default" for="' + id + '" >' +
        title + '</label>' +
        '</div>' +
        '<div class="input-group-append">' +
        '<div class="input-group-text">' +
        '<input type="checkbox" id="' +
        id +
        '" data-toggle="tooltip" title="';

    var tip_str = "";
    for (var tip in content) {
        if (tip == 'id' || tip == 'value')
            continue;
        if (tip == 'note') {
            tip_str += content[tip] + "\r\n";
            continue;
        }
        tip_str += tip + ": " + content[tip] + "\r\n";
    }
    if (dependency != "") {
        tip_str += "Dependency: " + dependency + "\r\n";
    }

    checkbox_widget_html_str += tip_str + '"';

    if (dependency != "") {
        checkbox_widget_html_str += ' disabled';
    }

    checkbox_widget_html_str +=
        '>' +
        '</div>' +
        '</div>' +
        '</div>';

    return checkbox_widget_html_str;
}

$(function () {
    $.getJSON("../js/json/ui.json", function (jsons) {
        global_var.ui_json = jsons;  // pointer to json
        global_var.data = {} // init data

        // draw ui
        for (const json of jsons) {
            // if type is dropdown
            if (json.widget_type == "dropdown") {
                $("#pd_section").append(create_dropdown_widget(json));

                for (var i = 0; i < json.content.length; i++) {
                    $("#" + json.content[i].id).on("click", function () {
                        for (var j = 0; j < json.content.length; j++) {
                            if (this.id == json.content[j].id) {
                                $("#" + json.result.id).text(json.content[j].value);
                            }
                        }

                        global_var.data[json.title] = this.id;
                        console.log(global_var.data); // degug
                    });
                }
            }
            // if type is checkbox
            else if (json.widget_type == "checkbox") {
                $("#pd_section").append(create_checkbox_widget(json));

                $("#" + json.id).on("change", function () {
                    global_var.data[json.title] = this.checked;
                    console.log(global_var.data); // degug
                });
            }

            if (json.dependency != "") {
                let id = "";
                if (json.widget_type == "dropdown") {
                    id = json.result.id;
                }
                else if (json.widget_type == "checkbox") {
                    id = json.id;
                }

                $("#" + json.dependency).on("change", function () {
                    if (this.checked) {
                        $("#" + id).removeAttr("disabled");
                    } else {
                        $("#" + id).attr("disabled", true);
                    }
                });
            }
        }
    });

});