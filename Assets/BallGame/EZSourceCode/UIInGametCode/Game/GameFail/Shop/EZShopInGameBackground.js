#pragma strict

class EZShopInGameBackground extends MonoBehaviour{
	public var _box:BoxCollider = null;
	
	public function Awake(){
		this.close();
	}
	public function openTask():Task{
		var task:Task = new Task();
		var isOver:boolean = false;
		task.init = function(){
			_box.enabled = true;
			isOver = true;
		};
		task.isOver = function():boolean{
			return isOver;
		};
		return task;
	}
	public function close(){
		_box.enabled = false;
	}

}