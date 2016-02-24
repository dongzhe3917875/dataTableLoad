$(document).ready(function(){
    var head = Handlebars.compile($("#cloud-head-template").html())({
        hehe: "dongzhe"
    });
    console.log($(head));
    $(".wrapper").append($(head));

    var select = Handlebars.compile($("#cloud-select-template").html())({
        options:["上海-BGP1区","上海-BGP2区","上海-BGP3区","北京到上海再到广州-BGP3区","上海到北京再到广州-BGP3区"]
    });
    $(".select-area").append($(select));
    $(".select-area").chooseSelect();
})
