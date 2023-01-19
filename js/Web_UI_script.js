$(function(){
    /*========================================================================
      _____     _     _          ____                           _             
     |_   _|_ _| |__ | | ___    / ___| ___ _ __   ___ _ __ __ _| |_ ___  _ __ 
       | |/ _` | '_ \| |/ _ \  | |  _ / _ \ '_ \ / _ \ '__/ _` | __/ _ \| '__|
       | | (_| | |_) | |  __/  | |_| |  __/ | | |  __/ | | (_| | || (_) | |   
       |_|\__,_|_.__/|_|\___|   \____|\___|_| |_|\___|_|  \__,_|\__\___/|_|   
    
    ==========================================================================*/  
    var container = document.getElementById('container');
    var jsonLength;
    deleteCheckbox(container);
    createInlineHtml(container, "h2", "Config.h")
    //$.getJSON('http://192.168.3.193/js/ui.json', function(data) {
    $.getJSON('http://localhost/js/ui.json', function(jsondata) {
    //do stuff with your data here
        //console.log(Object.keys(jsondata).length);
        //console.log(data.item.i2);
        //console.log(jsondata.board_no);
        //do stuff with your data here
        //var container = document.getElementById('container');
        //deleteCheckbox(container);
        jsonLength = Object.keys(jsondata.content).length;
        createInlineHtml(container, "b", jsondata.type);
        //createCheckbox(container, jsondata.content, jsonLength)
        createDropdownList(container, jsondata, jsonLength)

        //createInlineHtml(container);
        //while(container.childNodes.length) {
        //    container.childNodes[0].remove();
        //}
        //console.log(jsonLength);
        //for(var i = 0; i < jsonLength; i++) {
        //    var checkbox = document.createElement('input');
        //    checkbox.type = 'checkbox';
        //    checkbox.id = data.item[i];
        //    checkbox.name = 'interest';
        //    checkbox.value = data.item[i];
         
        //    var label = document.createElement('label')
        //    label.htmlFor = data.item[i];
        //    label.appendChild(document.createTextNode(data.item[i]));
         
        //    var br = document.createElement('br');
         
            //var container = document.getElementById('container');
        //    container.appendChild(checkbox);
        //    container.appendChild(label);
        //    container.appendChild(br);
        //}
    });
    $.getJSON('http://localhost/js/video.json', function(jsondata) {
        jsonLength = Object.keys(jsondata.content).length;
        createInlineHtml(container, "h3", jsondata.type);
        createCheckbox(container, jsondata, jsonLength)
    });
    $.getJSON('http://localhost/js/pd.json', function(jsondata) {
        jsonLength = Object.keys(jsondata.content).length;
        createInlineHtml(container, "h3", jsondata.type);
        createCheckbox(container, jsondata, jsonLength)
    });
//    $.getJSON('http://localhost/js/test.json', function(jsondata) {
//        jsonLength = Object.keys(jsondata.content).length;
//        createInlineHtml(container, jsondata.type);
//        createCheckbox(container, jsondata.content, jsonLength)
//    });
});

function deleteCheckbox(obj)
{
    while(obj.childNodes.length) {
        obj.childNodes[0].remove();
    }
}

function createCheckbox(obj, jsondata, length)
{
    for(var i = 0; i < length; i++) {
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = jsondata.content[i].value;
        checkbox.name = 'interest';
        checkbox.value = jsondata.content[i].value;
     
        var label = document.createElement('label');
        label.htmlFor = jsondata.content[i].value;
        label.appendChild(document.createTextNode(jsondata.content[i].value));
     
        var br = document.createElement('br');
     
        //var container = document.getElementById('container');
        obj.appendChild(checkbox);
        obj.appendChild(label);
        obj.appendChild(br);
    }
}

function createInlineHtml(obj, ele, text)
{
    var h2 = document.createElement(ele);
    h2.appendChild(document.createTextNode(text));
    obj.appendChild(h2);
}

function createDropdownList(obj, jsondata, length)
{
    var dropdownList = document.createElement('select');
    var dropdownContent;
    dropdownList.type = 'dropdownList';
    dropdownList.id = jsondata.type;
    //createInlineHtml(dropdownList, 'option', '---select a board no.---')
    for(var i = 0; i < length; i++) {
        //createInlineHtml(dropdownList, 'option', jsondata.content[i].value);
        //dropdownContent = jsondata.content[i].value + ' (' + jsondata.content[i].note + ')';
        dropdownContent = jsondata.content[i].value;
        createInlineHtml(dropdownList, 'option', dropdownContent);
    }
 
    var br = document.createElement('br');
 
    //var container = document.getElementById('container');
    obj.appendChild(dropdownList);
    obj.appendChild(br);

}
