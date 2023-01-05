const row_num = 11;
const column_num = 11;

function reset_grid_value(){
    var td_ary = $("#grid_tbl").find($("input"));
    for(var i = 0; i<row_num*column_num; i++){
        $(td_ary[i]).val('0.000');
    }
}

$(function(){
    /*========================================================================
      _____     _     _          ____                           _             
     |_   _|_ _| |__ | | ___    / ___| ___ _ __   ___ _ __ __ _| |_ ___  _ __ 
       | |/ _` | '_ \| |/ _ \  | |  _ / _ \ '_ \ / _ \ '__/ _` | __/ _ \| '__|
       | | (_| | |_) | |  __/  | |_| |  __/ | | |  __/ | | (_| | || (_) | |   
       |_|\__,_|_.__/|_|\___|   \____|\___|_| |_|\___|_|  \__,_|\__\___/|_|   
    
    ==========================================================================*/  
    //製作table html
    var grid_str = "<table id = 'grid_tbl'>";
    for(var i = 0; i<row_num; i++){
        grid_str +='<tr>';
       for(var j = 0; j<column_num; j++){
        grid_str+='<td>' + '<input type="text"/>' + '</td>';
       }
       grid_str +='</tr>';
    }
    grid_str += "</table>";

    //將上述table html加入至mesh div底下
    $("#mesh").append(grid_str);

    //創出DOM Node後, 編輯其CSS
    $("#grid_tbl").css({
        'border':'5px #FFAC55 solid',
        'background-color': 'coral'
    });

    $($("#grid_tbl").find($("input"))).css({
        'width':'50px',
        'height':'50px',
        'text-align':'center'
    });

    //intital table array的值(字串)
    reset_grid_value();
});



