'use strict';

angular.module('jqmobile')
    .service('recordCtrl', ["$filter",function($filter) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var records = {};
        var sqlMsg ;
        var sqltime;

        var db = window.openDatabase("diaNote", "1.0", "The note of every day", 1000000);
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

        records.query = function(whichDay,callback){
            console.log(whichDay);
            var ret = [];
            db.transaction(function(tx){
                tx.executeSql('CREATE TABLE IF NOT EXISTS record (time datetime,info text)');
                tx.executeSql('SELECT * FROM record WHERE time like "%'+whichDay+'%" ORDER BY time asc',[],function(tx,res){
                    if(res.rows.length == 0){
                        callback(ret);
                        return false;
                    }
                    console.log(res.rows.item(0).time);
                    console.log(res.rows.item(1).time);

                    for(var i = 0;i<res.rows.length;i++){
                       ret.push(res.rows.item(i).info);
                    }
                    callback(ret);
                });
            }, errorCB, successCB);

        };

        records.add = function(record,callback){
            db.transaction(function(tx){
                tx.executeSql('CREATE TABLE IF NOT EXISTS record (time datetime,info text)');
                var t = new Date();
                var t = $filter('date')(t, 'yyyy-MM-dd HH:mm:ss');
                tx.executeSql('INSERT INTO record (time, info) VALUES ("'+t+'", "'+record+'")',[],function(tx,res){
                    if(res.insertId == null){
                        callback(false);
                    }
                    callback(true);
                });
            }, errorCB, successCB);

        }

        return records;
    }]);

