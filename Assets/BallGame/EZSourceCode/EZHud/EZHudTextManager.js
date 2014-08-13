#pragma strict

import System.Collections.Generic; 
class EZHudTextManager extends MonoBehaviour{
	public var _prefab:GameObject = null;
	public var _number:GameObject = null;
	private var _time:float = 0.0f;
	
	private var busy_:boolean = false; 
	private var queue_:Queue.<Task> = Queue.<Task>();
	public var _allTime:float = 0.3f;
	public function popText(text:String, color:Color){
		var obj:GameObject = GameObject.Instantiate(_prefab);
		var hudText:EZHudText = obj.GetComponent.<EZHudText>();
		obj.SetActive(true);
		obj.transform.parent = this.transform;
		hudText.setColor(color);
		//obj.renderer.material.shader = Shader.Find("EZ/Side2");
		hudText.setText(text);
		var show:Task = hudText.showTask();
		TaskManager.PushBack(show, function(){
			GameObject.DestroyObject(obj);
		});
		var wait:EZWaitTask = new EZWaitTask();
		wait.setAllTime(_allTime);
		TaskManager.PushFront(wait, function(){
			TaskManager.Run(show);
		});
		queue_.Enqueue(wait);
	}

	public function popNumber(from:int, to:int, color:EZHudNumber.EzColor, size:EZHudNumber.Size){
		var obj:GameObject = GameObject.Instantiate(_number);
		var hudNumber:EZHudNumber = obj.GetComponent.<EZHudNumber>();
		obj.SetActive(true);
		//obj.renderer.material.shader = Shader.Find("EZ/Side2");
		obj.transform.parent = this.transform;
		hudNumber.color = color;
		hudNumber.size = size;
		hudNumber.setNumber(from, to);
		var show:Task = hudNumber.showTask();
		TaskManager.PushBack(show, function(){
			GameObject.DestroyObject(obj);
		});
		var wait:EZWaitTask = new EZWaitTask();
		wait.setAllTime(_allTime);
		TaskManager.PushFront(wait, function(){
			TaskManager.Run(show);
		});
		queue_.Enqueue(wait);
	}
	
	public function Update(){
		//update();
		if(!busy_ && queue_.Count != 0){
			var task:Task = queue_.Peek();
			queue_.Dequeue();  
			TaskManager.PushFront(task, function(){
				busy_ = true;
			});
			TaskManager.PushBack(task, function(){
				busy_ = false;
			});
			TaskManager.Run(task);
		}
	}
}
