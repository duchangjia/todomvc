(function (angular) {
	'use strict';
	var myApp=angular.module('MyTodoMvc',[])
	//路由配置
	//注册一个主要的控制器
	myApp.controller('MainController',['$scope','$location',function($scope,$location){
		function getId(){
			var id=Math.random();
			for(var i=0;i<$scope.todos.length;i++){
				if($scope.todos[i].id===id){
					id=getId()
					break;
				}
			}
			return id;
		};
		//文本框需要一个模型
		$scope.text='';
		//任务列表也需要一个
		//每一个任务的结构{id:1,text:'学习',completed:true}
		$scope.todos=[
			{id:1,text:'学习',completed:true},
			{id:2,text:'树胶',completed:false},
		];
		$scope.add=function(){
			if($scope.text!=''){
				$scope.todos.push({
				id:getId(),
				text:$scope.text,
				completed:false,
			})
			}
			$scope.text='';
		}
		$scope.remove=function(id){
			//删除
			for(var i=0;i<$scope.todos.length;i++){
				if($scope.todos[i].id===id){
					$scope.todos.splice(i,1)
				}
			}
		}
		//清空已完成
		$scope.clear=function(){
			var result=[];
			for(var i=0;i<$scope.todos.length;i++){
				if($scope.todos[i].completed===false){
					result.push($scope.todos[i])
				}
			}
			$scope.todos=result;
		}
		//是否有已经完成的
		$scope.existcompleted=function(){
			for(var i=0;i<$scope.todos.length;i++){
				if($scope.todos[i].completed===true){
					return true;
				}
			}
			return false;
		}
		//编辑那个元素
		$scope.currentEdit=-1
		$scope.editing=function(id){
			$scope.currentEdit=id
		};
		$scope.save=function(id){
			$scope.currentEdit=-1
		};
		//选取全部切换
		var now=true;
		$scope.toggleAll=function(){
			for(var i=0;i<$scope.todos.length;i++){
				$scope.todos[i].completed=now;
			}
			now=!now;
		}
		//s帅选状态
		$scope.selector={};//{}{completed:true} {completed:false}
		//1、

		$scope.$location=$location;
		console.log($location)
		//watch只能监视$scope的成员
		$scope.$watch('$location.hash()',function(now,old){
			switch(now){
				case '/active':
					$scope.selector={completed:false}
					break;
				case '/completed':
					$scope.selector={completed:true}
					break;
				default:
					$scope.selector={};
					break;
			}
		})
		
		$scope.equalCompare=function(source,target){
			console.log(source);
			console.log(target)
			return source===target
		}
	}])
})(angular);
