'use strict';
angular.module('jqmobile')
    .controller('recordShow', function ($scope,$filter,recordCtrl) {
        var nowday = new Date();  //use for today 's time still
        var today = new Date(); // use for min or plus day

        var now = $scope.today = $filter('date')(today, 'yyyy-MM-dd');
        //now :use for today's yyyy.mm.dd sitll the scope.today use for min plus day
        console.log($scope.today)
        $scope.nowInfo = recordCtrl.query($scope.today);
        console.log($scope.nowInfo);

        $scope.send = function(){
           console.log($scope.msg);
            recordCtrl.add(now,$scope.msg);
            $scope.msg = "";
            $scope.today = now;
            console.log(today);
            today.setDate(nowday.getDate());
            console.log(today);
            $scope.nowInfo = recordCtrl.query($scope.today);
        }

        $scope.pre = function(){
            today.setDate(today.getDate()-1);
            $scope.today = $filter('date')(today, 'yyyy-MM-dd');
            $scope.nowInfo = recordCtrl.query($scope.today);
        }
        $scope.next = function(){
            today.setDate(today.getDate()+1);
            $scope.today = $filter('date')(today, 'yyyy-MM-dd');
            $scope.nowInfo = recordCtrl.query($scope.today);
        }

        $scope.$on("date",function(e,time){
            $scope.today = time;
            today.setDate(new Date(time));
            $scope.today = $filter('date')(today, 'yyyy-MM-dd');
            $scope.nowInfo = recordCtrl.query($scope.today);
            console.log(time);
        })
});

