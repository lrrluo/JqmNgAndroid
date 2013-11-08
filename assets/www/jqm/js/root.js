
var clock = moment();
$(document).on('pageinit', '#root', function(){
    //init the page root here:

    console.log("init")

    //clock init:
    $("#time").children(0).children(".ui-btn-text").html(clock.format("h:mm:ss a"));
    var timer = setInterval(function(){
        clock.add('seconds', 1);
        $("#time").children(0).children(".ui-btn-text").html(clock.format("h:mm:ss a"));
        $("#detailTime").html(clock.format("dddd, MMMM Do YYYY, h:mm:ss a"));
    },1000);


    //Msg init:
    var nowday = new Date();  //use for today 's time still
    var today = new Date(); // use for min or plus day

    initMsgBoard();


})

function initMsgBoard(){
    dbQuery(clock.format("YYYY-MM-DD"),queryCallback);
}

function queryCallback(records){
    console.log(records);
    var board = $("#msgBoard");

    for(var i=0;i<records.length;i++){
        var temp = records[i].time.substring(11,records[i].time.length);
        var html = '<h4 style="color: #fadb4e">'+temp+'</h4>'
            +'<div class="ui-overlay-shadow ui-corner-all ui-body-b" style="background: #5e87b0;word-break:break-all;color: #ffffff">'
            +'<p style="margin: 0.5em 7px;font-size: 16px;">'
            +records[i].info
            +'</p></div>'
        console.log(html)
        board.append(html)
    }

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
    db.transaction(function(tx){
        tx.executeSql('CREATE TABLE IF NOT EXISTS record (time datetime,info text)');
        tx.executeSql('INSERT INTO record (time, info) VALUES ("'+whichDay+'", "'+record+'")',[],function(tx,res){
            if(res.insertId == null){
                callback(false);
            }
            callback(true);
        });
    }, errorCB, successCB);

}

