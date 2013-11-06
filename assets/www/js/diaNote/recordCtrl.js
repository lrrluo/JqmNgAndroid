'use strict';

angular.module('jqmobile')
    .service('recordCtrl', [function() {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var records = {};
        var data = [
            {time:"2013-11-01",records:[]},
            {time:"2013-11-02",records:[]},
            {time:"2013-11-03",records:["Here is the test","second test"]},
            {time:"2013-11-04",records:[]},
            {time:"2013-11-05",records:[]},
            {time:"2013-11-06",records:[]}
        ];
        records.query = function(whichDay){
            var ret = null;
            angular.forEach(data,function(val,key){
                if(data[key].time == whichDay){
                    ret = data[key].records;
                    return false;
                }
            })

            return ret
        };

        records.add = function(whichDay,rec){
            angular.forEach(data,function(val,key){
                if(data[key].time == whichDay){
                    data[key].records.push(rec);
                    return false;
                }
            })

        }

        return records;
    }]);

