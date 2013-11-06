/**
 * Created by L on 13-11-6.
 */
'use strict';
angular.module('jqmobile')
    .controller('pickDate', function ($scope) {
        $scope.msg = "test";

        $scope.pick = function(){
            console.log($scope.pickTime);
            if($scope.pickTime != null){
                $scope.$emit("pickDate",$scope.pickTime);

            }
        }

    })

