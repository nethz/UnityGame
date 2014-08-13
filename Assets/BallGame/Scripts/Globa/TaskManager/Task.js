#pragma strict

class Task{
	function Task(){}
	var init:Function = function(){};
	var shutdown:Function = function(){};
	var update:Function = function(d:float){};
	var isOver:Function = function(){return true;};
	
};