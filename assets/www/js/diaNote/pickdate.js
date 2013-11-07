/**
 * Created by L on 13-11-6.
 */
'use strict';
angular.module('jqmobile')
    .controller('pickDate', function ($scope) {
        $scope.time = "2013-12-05"

        $scope.$watch('time',function(a,b){
            console.log(a,b);
        })

        $scope.pick = function(){
            console.log($scope.time);
            if($scope.time != null){
                var t = $scope.time;
                $scope.$emit("pickDate",t);

            }
        }

    })

