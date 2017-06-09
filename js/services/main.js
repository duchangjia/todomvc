(function(angular){
	'use strict';
	//注册一个新模块
	angular.module('app.services.main',[])
		.service('MainService',['$window',function($window){
			var storage=$window.localStorage;
			var todos=[]//storage.getItem('my_todo_list')?JSON.parse(storage['my_todo_list']):[];
			function getId(){
				var id=Math.random();
				for(var i=0;i<todos.length;i++){
					if(todos[i].id===id){
						id=getId()
						break;
					}
				}
				return id;
			};
			this.save=function(){
				storage.setItem('my_todo_list',JSON.stringify(todos))
				//console.log("gg")
			}
			//控制私有字段的
			this.get=function(){
				return todos;
			}
			//业务逻辑都必须出现在服务中(专门定义业务逻辑)
			this.add=function(text){
				todos.push({
					id:getId(),
					text:text,
					completed:false,
				});
				this.save();
			}
			this.remove=function(id){
				//删除
				for(var i=0;i<todos.length;i++){
					if(todos[i].id===id){
						todos.splice(i,1)
						break;
					}
				}
				this.save();
			}
			//清空已完成
			this.clear=function(){
				var result=[];
				for(var i=0;i<todos.length;i++){
					if(todos[i].completed===false){
						result.push(todos[i])
					}
				}
				todos=result;
				this.save()
				//此时我们将todos指向了一个地址
				return todos;
			}
			//是否有已经完成的
			this.existcompleted=function(){
				for(var i=0;i<todos.length;i++){
					if(todos[i].completed===true){
						return true;
					}
				}
				return false;
			}
			//更新
			this.update=function(id,target){
				this.save()
			}
			//选取全部切换
			var now=true;
			this.toggleAll=function(){
				for(var i=0;i<todos.length;i++){
					todos[i].completed=now;
				}
				now=!now;
				this.save()
			}
		}])
})(angular)