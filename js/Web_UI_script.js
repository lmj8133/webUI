$(function(){
    /*========================================================================
      _____     _     _          ____                           _             
     |_   _|_ _| |__ | | ___    / ___| ___ _ __   ___ _ __ __ _| |_ ___  _ __ 
       | |/ _` | '_ \| |/ _ \  | |  _ / _ \ '_ \ / _ \ '__/ _` | __/ _ \| '__|
       | | (_| | |_) | |  __/  | |_| |  __/ | | |  __/ | | (_| | || (_) | |   
       |_|\__,_|_.__/|_|\___|   \____|\___|_| |_|\___|_|  \__,_|\__\___/|_|   
    
    ==========================================================================*/  
    $.getJSON('http://192.168.3.138/js/ui.json', function(data) {
    //do stuff with your data here
        console.log(data.id);
});
});



