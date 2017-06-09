(function(angular){
	'use strict';
	var myController=angular.module('controller.main',['ngRoute']);
	myController.controller('MainController',
		['$scope','$routeParams','$route','MainService',
		function($scope,$routeParams,$route,MainService){
		
		//文本框需要一个模型
		$scope.text='';
		//任务列表也需要一个
		//每一个任务的结构{id:1,text:'学习',completed:true}
		$scope.todos=MainService.get();
		$scope.add=function(){
			if($scope.text!=''){
				MainService.add($scope.text)
			}
			console.log("qqq")
			$scope.text='';
		}
		$scope.remove=function(id){
			
			MainService.remove(id)
		}
		//清空已完成
		$scope.clear=function(){
			var newTodos=MainService.clear();
			//删除
			$scope.todos=newTodos;
		}
		//是否有已经完成的
		$scope.existcompleted=MainService.existcompleted;
		//编辑那个元素
		$scope.currentEdit=-1
		$scope.editing=function(id){
			$scope.currentEdit=id
		};
		$scope.save=function(id){
			$scope.currentEdit=-1
		};
		//选取全部切换
		//var now=true;
		$scope.toggleAll=function(){
			MainService.toggleAll();
		}
		//
		$scope.toggle=function(){
			MainService.save();
		}
		//s帅选状态
		$scope.selector={};//{}{completed:true} {completed:false}
		//1、

		var status=$routeParams.status;
		//路由匹配出来的
		switch (status){
			case 'active':
					$scope.selector={completed:false};
					break;
			case 'completed':
					$scope.selector={completed:true};
					break;
			default:
					$route.updateParams({status:''})
					$scope.selector={};
					break;
		}
		
		$scope.equalCompare=function(source,target){
			console.log(source);
			console.log(target)
			return source===target
		}
	}])
})(angular)