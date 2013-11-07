'use strict';
angular.module('jqmobile')
    .controller('recordShow', function ($scope,$filter,$element,recordCtrl) {
        var nowday = new Date();  //use for today 's time still
        var today = new Date(); // use for min or plus day
        $element.children(1).eq(1).css('background','red')


        var now = $scope.today = $filter('date')(today, 'yyyy-MM-dd');
        //now :use for today's yyyy.mm.dd sitll the scope.today use for min plus day
        console.log($scope.today)
        recordCtrl.query($scope.today,queryCallback);


        function queryCallback(records){
            $scope.nowInfo = records;
            $scope.$apply(function(){
                $("textarea").css('background','green');
            });
            console.log($scope.nowInfo);
        }

        $scope.send = function(){
           console.log($scope.msg);
            recordCtrl.add($scope.msg,function(sign){
                console.log(sign)
                if(sign){
                   $scope.nowInfo.push($scope.msg);
                   $scope.msg = "";
                   $scope.today = now;
                   today.setDate(nowday.getDate());
                    //$scope.$apply();
                    //$scope.nowInfo = recordCtrl.query($scope.today);
                }
                else{
                    console.log('insert the data wrong');
                }
            });
        }

        $scope.pre = function(){
            today.setDate(today.getDate()-1);
            $scope.today = $filter('date')(today, 'yyyy-MM-dd');
            recordCtrl.query($scope.today,queryCallback);
        }
        $scope.next = function(){
            today.setDate(today.getDate()+1);
            $scope.today = $filter('date')(today, 'yyyy-MM-dd');
            recordCtrl.query($scope.today,queryCallback);
        }

        $scope.$on("date",function(e,time){
            $scope.today = time;
            today = new Date(time);
            //today.setDate(tem.getDate());
            console.log(today);
            $scope.today = $filter('date')(today, 'yyyy-MM-dd');
            recordCtrl.query($scope.today,queryCallback);
        })
});

