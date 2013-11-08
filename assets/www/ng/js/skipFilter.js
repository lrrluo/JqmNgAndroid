/**
 * Created with JetBrains WebStorm.
 * User: rliu1
 * Date: 13-11-8
 * Time: 上午10:58
 * To change this template use File | Settings | File Templates.
 */
'use strict';

angular.module('jqmobile')
    .filter('myskip', function () {
        return function(input, skip) {
            if(input != null){
            console.log('skip');
            return input.substring(skip,input.length);
            }
        };
    });

