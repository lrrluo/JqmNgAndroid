'use strict';
angular.module('jqmobile')
    .controller('recordShow', function ($scope,$filter,$element,recordCtrl) {
        var nowday = new Date();  //use for today 's time still
        var today = new Date(); // use for min or plus day
        $scope.canSend = false;


        var now = $scope.today = $filter('date')(today, 'yyyy-MM-dd');
        //now :use for today's yyyy.mm.dd sitll the scope.today use for min plus day
        console.log($scope.today)
        recordCtrl.query($scope.today,queryCallback);

        /*    $scope.$watch('msg',function(){
                if($scope.msg != "" && $scope.msg != null){
                    $element.find('a').eq(3).addClass("ui-diabled")

                }
                else{
                    $element.find('a').eq(3).css("background",'green');
                }
              //  $element("#sendBtn").button("refresh");
            });           */


        function queryCallback(records){
            var a =new Date(records.time);

            $scope.nowInfo = records;
            $scope.$apply(function(){
                //$("textarea").css('background','green');
                //$element.children(1).eq(1).css('background','red')
            });
            console.log($scope.nowInfo);
        }

        $scope.send = function(){
           console.log($scope.msg+" send");

            if($scope.msg != "" && $scope.msg != null){
                var tmp = new Date();
                var time = $filter('date')(tmp, 'yyyy-MM-dd HH:mm:ss');
                recordCtrl.add($scope.msg,time,function(sign){
                    console.log(sign)
                    if(sign){
                        if(today.getDay() == tmp.getDay()){
                            $scope.nowInfo.push({info:$scope.msg,time:time});
                            console.log('the same',nowday.getDay(),tmp.getDay())
                        }
                        else{
                            today.setDate(nowday.getDate());
                            $scope.today = $filter('date')(today, 'yyyy-MM-dd');
                            recordCtrl.query($scope.today,queryCallback);
                        }
                       $scope.msg = "";
                       $scope.today = now;
                        $scope.$apply();
                        //$scope.nowInfo = recordCtrl.query($scope.today);
                    }
                    else{
                        console.log('insert the data wrong');
                    }
                });
            }
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

