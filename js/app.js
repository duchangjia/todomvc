(function (angular) {
	'use strict';
	var myApp=angular.module('MyTodoMvc',['ngRoute','controller.main','app.services.main'])
	//路由配置
	myApp.config(['$routeProvider',function($routeProvider){
		$routeProvider
				.when('/:status?',{
					controller:'MainController',
					templateUrl:'main_temp',
				})
				.otherwise({redirectTo:'/'})
	}])
	//注册一个主要的控制器
})(angular);
