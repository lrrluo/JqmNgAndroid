/**
 * Created by L on 13-11-6.
 */
'use strict';
angular.module('jqmobile')
    .controller('root', function ($scope) {
        $scope.$on("pickDate",function(e,time){
            e.stopPropagation();
            console.log(time);
            $scope.$broadcast("date",time);
        })
    })