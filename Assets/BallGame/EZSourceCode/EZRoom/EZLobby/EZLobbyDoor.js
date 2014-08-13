#pragma strict


class EZLobbyDoor extends MonoBehaviour{
	public var _open:UITexture = null;
	public var _close:EZLobbyDoorClose = null;
	public var _light:UITexture = null;
	public var _color1:Color;
	public var _color:Color;
	public var _sound:EZSound = null;
	private var isTouch_:boolean = false;
	function Start(){
		this.close();
		_open.enabled = true;
		isTouch_ = false;
	}
	public function colorTask(touch:boolean):Task{
		var task:Task = new Task();
		var tc:TweenColor = null;
		task.init = function(){
			_light.color = _color1;
			tc = TweenColor.Begin(_light.gameObject, 0.5f, _color);
		};
		task.isOver = function():boolean{
			if( (!isTouch_) || (touch)){
				return true;
			}
			if(tc && tc.enabled){
				return false;
			}
			return true;
		};
		
		return task;
	}
	public function outTask(touch:boolean):Task{
		var task:Task = new Task();
		task.isOver = function(){
			return (!isTouch_) || (touch);
		};
		task.shutdown = function(){ 
			if(touch){
				 var target:GameObject = GameObject.FindGameObjectWithTag("Ctrl");
				if(target){
					target.SendMessage("OnAction", "mission", SendMessageOptions.DontRequireReceiver);
				}
			 }else{
			  	this.close();
			 }
			
		};
		return task;
	
	} 
	
	public function openTask(touch:boolean){
		var tl:TaskList = new TaskList();
		var task:EZWaitTask = new  EZWaitTask();
		task.setAllTime(0.1f);
		TaskManager.PushFront(task, function(){
			_sound.play();
		//	_open.enabled = true;
		});
		TaskManager.PushBack(task, function(){
			_close.doDisable();// = false;
			
		});
		tl.push(task);
		tl.push(colorTask(touch));
		tl.push(outTask(touch));
		return tl;
	}
	
	public function close(){
		_close.doEnable();// = true;
		_light.color = Color.black;
	}
	public function OnClick(){
		  var target:GameObject = GameObject.FindGameObjectWithTag("Ctrl");
			if(target){
				target.SendMessage("OnAction", "mission", SendMessageOptions.DontRequireReceiver);
			}
	}
	public function OnPress(state:boolean){
		if(state){
			isTouch_ = true;
			TaskManager.Run(openTask(false));
		}else{
			isTouch_ = false;
		}
	}
	
}