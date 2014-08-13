#pragma strict

class EZHudTime extends MonoBehaviour{
	public var _text:UILabel;
	public var _time:UISprite;
	private var value_:String = "";
	
	public function show(){
		_text.enabled = true;
		_time.enabled = true;
	}
	public function hide(){
		_text.enabled = false;
		_time.enabled = false;
	}
	public function setValue(time:int){
		var val:String = ""+ time;
		if(value_  != val){
			value_ = val;
			TaskManager.Run(setTextTask(0.2, value_));
		}
	}
	public function setTextTask(time:float, text:String):Task{
		var task:Task = new Task();
		var tr:GeekTweenRotation = null;
		task.init = function(){
			tr = GeekTweenRotation.Begin(_time.gameObject, time, Quaternion.AngleAxis(180, Vector3.forward));
		};
		task.isOver = function():boolean{
			if(tr){
				return !tr.enabled;
			}
			return true;
		};
		
		task.shutdown = function(){
			_time.gameObject.transform.localRotation = Quaternion.AngleAxis(0, Vector3.forward);
			_text.text= text;
		};
		
		return task;
	}
	
}