
var clock = moment();
var pageClock = moment();
var foucsTimer;
$(document).on('pageinit', '#root', function(){
    //init the page root here:

    console.log("init")

    //clock init:
    $("#time").children(0).children(".ui-btn-text").html(clock.format("MM-DD h:mm:ss a"));
    $("h1[role='heading']").html(pageClock.format(("dddd, MMMM Do YYYY")))
    var timer = setInterval(function(){
        clock.add('seconds', 1);
        $("#time").children(0).children(".ui-btn-text").html(clock.format("MM-DD h:mm:ss a"));
        $("#detailTime").html(clock.format("dddd, MMMM Do YYYY, h:mm:ss a"));
    },1000);


    //Msg init:
    var nowday = new Date();  //use for today 's time still
    var today = new Date(); // use for min or plus day
    initMsgBoard();
    $( "#root" ).on( "swipeleft", nextPage );
    $( "#root" ).on( "swiperight", prePage );
    $("#back").on('click',backToday);
    $("#sendBtn").on('click',sendMsg);
    $("#msg").on('focus',focus);//启动计时器来enable disable sendbtn
    $("#msg").on('blur',blurs);//关闭计时器。


})


function focus(){
    console.log('focus');
    foucsTimer = setInterval(function(){
        if($("#msg").val() == "" || $("#msg").val() == null){
            $("#sendBtn").button('disable');
            console.log('no value');
        }
        else{
            console.log('has value');
            $("#sendBtn").button('enable');
        }
    },1000);
}

function blurs(){
    clearInterval(foucsTimer);
    console.log('blurs');
}


function sendMsg(e){
    console.log("send msg");
    e.preventDefault();
    dbAdd($("#msg").val(),clock.format("YYYY-MM-DD HH:mm:ss"),function(sign){
        console.log(sign);
        if(sign){
            if(pageClock.diff(clock,'days') == 0){
                console.log(clock.format("YYYY-MM-DD h:mm:ss a"));
                var html = templeAppend($("#msg").val(),clock.format("HH:mm:ss"));
                $("#msgBoard").children(0).append(html);
            }
            else{
               /* today.setDate(nowday.getDate());
                $scope.today = $filter('date')(today, 'yyyy-MM-dd');
                recordCtrl.query($scope.today,queryCallback);*/
            }
           /* $scope.msg = "";
            $scope.today = now;
            $scope.$apply();*/
            //$scope.nowInfo = recordCtrl.query($scope.today);
        }
        else{
            console.log('insert the data wrong');
        }
    });
}

function backToday(e){
    e.preventDefault();
    switchPage(0);
}

function nextPage(){
    console.log("next page");
    switchPage(1);

}

function prePage(){
    console.log("pre page");
    switchPage(-1);
}

function switchPage(days){
    $("#msgBoard").children(0).remove();
    $.mobile.loading( 'show', {
        text: 'loading',
        textVisible: true,
        theme: 'e'
    });
    if(days == 0){
        delete  pageClock;
        pageClock = moment();
    }
    else{
        pageClock.add("days",days);
    }


    $("h1[role='heading']").html(pageClock.format(("dddd, MMMM Do YYYY")))
    dbQuery(pageClock.format("YYYY-MM-DD"),queryCallback);

}

function initMsgBoard(){
    dbQuery(clock.format("YYYY-MM-DD"),queryCallback);
}

function templeAppend(msg,time){
    var html = '<h4 style="color: #fadb4e">'+time+'</h4>'
        +'<div class="ui-overlay-shadow ui-corner-all ui-body-b" style="background: #5e87b0;word-break:break-all;color: #ffffff">'
        +'<p style="margin: 0.5em 7px;font-size: 16px;">'
        +msg
        +'</p></div>';
    return html;
}

function queryCallback(records){
    console.log(records);
    var board = $("#msgBoard");
    var outter = $("<div></div>") ;

    for(var i=0;i<records.length;i++){
        var temp = records[i].time.substring(11,records[i].time.length);
        var html = templeAppend(records[i].info,temp)
        console.log(html)
        outter.append(html)
    }

    /*    var aa = setInterval(function(){
     outter.appendTo(board);
     $.mobile.loading( 'hide');
     clearInterval(aa);
     },3000);*/
    outter.appendTo(board);
    $.mobile.loading( 'hide');

}
//db.transaction(insertDB, errorCB, successCB);
//db.transaction(SelectDB, errorCB, successCB);

function insertDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS record (time datetime,info text)');
}

// Transaction error callback
//
function errorCB(tx, err) {
    console.log("Error processing SQL: "+err);
}

// Transaction success callback
//
function successCB() {
    console.log("success!");
}

var dbQuery =  function(whichDay,callback){
    console.log(whichDay);
    var db = window.openDatabase("diaNote", "1.0", "The note of every day", 1000000);
    var ret = [];
    db.transaction(function(tx){
        tx.executeSql('CREATE TABLE IF NOT EXISTS record (time datetime,info text)');
        tx.executeSql('SELECT * FROM record WHERE time like "%'+whichDay+'%" ORDER BY time asc',[],function(tx,res){
            if(res.rows.length == 0){
                callback(ret);
                return false;
            }

            for(var i = 0;i<res.rows.length;i++){
                //var t =$filter('date')(a,"HH:mm:ss");
                //console.log(t);

                ret.push(res.rows.item(i));
            }
            callback(ret);
        });
    }, errorCB, successCB);

};

var dbAdd = function(record,whichDay,callback){
    var db = window.openDatabase("diaNote", "1.0", "The note of every day", 1000000);
    console.log("add!");
    db.transaction(function(tx){
        tx.executeSql('CREATE TABLE IF NOT EXISTS record (time datetime,info text)');
        tx.executeSql('INSERT INTO record (time, info) VALUES ("'+whichDay+'", "'+record+'")',[],function(tx,res){
            if(res.insertId == null){
                callback(false);
                console.log("add false!");
            }
            else{
                callback(true);
                console.log("add tre!");
            }

        });
    }, errorCB, successCB);

}

