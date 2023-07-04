var global_var = {
    ui_json: undefined,
    board_no: undefined,
};

function create_dropdown_widget(para) {
    var id = para.id;
    var title = para.title;
    var result = para.result;
    var item_num = para.content.length;
    var content = para.content;

    var dropdown_widget_html_str =
        '<div class="btn-group dropright">' +
        '<button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
        'Options' +
        '</button>' +
        '<div class="dropdown-menu" aria-labelledby="dropdownMenuLink">';

    for (var i = 0; i < item_num; i++) {
        var tip_str =
            "Board Type: " + content[i].type_board + '\r\n' +
            "IC Type: " + content[i].type_ic + '\r\n' +
            "Note: " + content[i].note;
        dropdown_widget_html_str += '<a class="dropdown-item"}" id="' + content[i].id + '" data-toggle="tooltip" title="' + tip_str + '">' + content[i].value + '</a>';
    }

    dropdown_widget_html_str +=
        '</div>' +
        '</div>';

    var dropdowm_widget_html_str =
        '<div id=' + id + '" class="card shadow mb-4">' +
        '<div class="card-header py-3">' +
        '<h5 class="m-0 font-weight-bold text-primary">' + title + '</h5>' +
        '</div>' +

        '<div class="card-body">' +
        '<p id="' + result.id + '">' + result.default_text + '<p>' +
        dropdown_widget_html_str +
        '</div>' +
        '</div>';

    return dropdowm_widget_html_str;
}

$(function () {

    $.getJSON("../js/json/ui.json", function (json) {
        global_var.ui_json = json;  // pointer to json

        // draw ui
        $("#pd_section").append(create_dropdown_widget(json));

        // 
        for (var i = 0; i < json.content.length; i++) {
            $("#" + json.content[i].id).on("click", function () {
                for (var j = 0; j < json.content.length; j++) {
                    if (this.id == json.content[j].id) {
                        $("#" + json.result.id).text(json.content[j].value);
                    }
                }

                global_var.board_no = this.id;
                alert(global_var.board_no);
            });
        }
    });

});