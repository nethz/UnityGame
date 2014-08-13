#pragma strict
class PositionBind extends MonoBehaviour
{
	
	
	function getPosition(){
		return this.transform.position;
	}
	
	function relativeMoveTask(relative:Vector3, allTime:float){
		return this.moveTask(this.getPosition(), this.getPosition() + relative, allTime);
	}
	
	function moveTask(begin:Vector3, end:Vector3, allTime:float){
		var task:Task = new Task();
		var time:float;
		task.init = function(){
			time = 0;
			this.transform.position = begin;
		};
		task.update = function(d:float){
			time += d;
			var s:float = time/allTime;
			this.transform.position = begin * (1-s) + end *s;
		};
		task.shutdown = function(){
			this.transform.position = end;
		};
		task.isOver = function(){ 
			return (time >= allTime);
		};
		return task;
	}
	
}