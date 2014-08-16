#pragma strict
class EZWeixinUI extends MonoBehaviour{
	static private var instance_:EZWeixinUI = null;
	public var _window:EZWindow;
	
	
	public function get window():EZWindow{
		return _window;
	}
	
	public function Awake(){ 
		instance_ = this;
		TaskManager.registerTask("weixin.ui.window", this.windowTask);
		ActionManager.registerFunction("weixin.ui.close", function(){_window.close();});
	
		
	}
	public function OnDestroy(){
		TaskManager.unregisterTask("weixin.ui.window");
		//TaskManager.unregisterTask("weixin.ui.warning");
		ActionManager.unregisterFunction("weixin.ui.close");
	}

	

	/*
	public function warningTask():Task{
		var task:EZWarningTask = new EZWarningTask();
		
		var isOver:boolean = false;
		var n:int = 0;
		task.init = function(){
			isOver = false;
			_window.touchNext(task.m[n].ToString(), 
				function(){
					if(n < task.texts.length -1){
						++n;
						_window.touchText = task.texts[n].ToString();
					}else{
						isOver = true;
					}
				}
			);
		};
		task.isOver = function():boolean{
			return isOver;
		};
		task.shutdown = function(){
			_window.close();
		};
		return task;
		
		
	} */
	public function windowTask():Task{
		var task:EZWindowTask = new EZWindowTask();
		var isOver:boolean = false;
		
		task.init = function(){
			Debug.Log("AA");
			isOver = false;
			_window.okCancel(task.text, task.message, 
				function(){
					Debug.Log("BB");
					task.okOrCancel = true;
					isOver = true;
				},
				function(){
					Debug.Log("CC");
					task.okOrCancel = false;
					isOver = true;
				},
				task.ok,
				task.cancel
			);
		};
		task.isOver = function():boolean{
			return isOver;
		};
		task.shutdown = function(){
			_window.close();
		};
		return task;
	}
	
	
	
	
	
	
	public static function GetInstance():EZWeixinUI	{
		return instance_;
	}
	
}