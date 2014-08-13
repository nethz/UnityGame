#pragma strict

class SettingItemFly extends MonoBehaviour{
	public var _items:GameObject[];
	public var _method:GeekTweener.Method = GeekTweener.Method.EaseOut;
	public var _draggablePanel:UIDraggablePanel = null;
		
	public var _inputSwitch:EZUIInputSwitch = null;
	public function Awake(){
		if(_inputSwitch == null){
			Debug.LogError(this.gameObject.name + "switch null");
		}
	}
	public function openTask():Task{
		var tl:TaskList = new TaskList();
		tl.push(this.inTask());
		TaskManager.PushFront(tl, function(){
			for(var i:int = 0; i<this._items.Length; ++i){
				this._items[i].gameObject.transform.localPosition = this._items[i].gameObject.transform.localPosition + Vector3(800, 0 ,0);
			}
		});
		
		TaskManager.PushFront(tl, function(){
			//if(EZUIInputSwitch.GetInstance()){
			//	EZUIInputSwitch.GetInstance().close();
			//}
			
			_inputSwitch.close();
			
		});
		TaskManager.PushBack(tl, function(){
		//	if(EZUIInputSwitch.GetInstance()){
		//		EZUIInputSwitch.GetInstance().open();
		//	}
			
			_inputSwitch.open();
		});
		return tl;
	}
	
	public function closeTask():Task{
		var tl:TaskList = new TaskList();
		tl.push(this.outTask());
		TaskManager.PushBack(tl, function(){
			for(var i:int = 0; i<this._items.Length; ++i){
				this._items[i].gameObject.transform.localPosition = this._items[i].gameObject.transform.localPosition + Vector3(-800, 0 ,0);
			}
			_draggablePanel.ResetPosition();
		});
		
		TaskManager.PushFront(tl, function(){
			//if(EZUIInputSwitch.GetInstance()){
			//	EZUIInputSwitch.GetInstance().close();
			//}
			
			_inputSwitch.close();
			
			
		});
		TaskManager.PushBack(tl, function(){
			//if(EZUIInputSwitch.GetInstance()){
			//	EZUIInputSwitch.GetInstance().open();
			//}
			
			_inputSwitch.open();
		});
		
		return tl;
	}

	public function inTask():Task{
		var mt:MultiTask = new MultiTask();
		for(var i:int = 0; i<this._items.length; ++i){
			var tl:TaskList = new TaskList();
			var wait:EZWaitTask = new EZWaitTask();
			wait.setAllTime((0.2/this._items.length) *i);
			tl.push(wait);
			tl.push(inTaskOne(this._items[i].gameObject));
			mt.push(tl);
		}
		return mt;
	}
	
	private function inTaskOne(object:GameObject):Task{
		var task:Task = new Task();
		var tp:GeekTweenPosition = null;
		task.init = function(){
			tp = GeekTweenPosition.Begin(object, 0.2, object.transform.localPosition - Vector3(800, 0 ,0));
			tp.method = _method;
		};
		task.isOver = function():boolean{
			if(tp && tp.enabled){
				return false;
			}
			return true;
		};
		return task;
	}
	
	public function outTask():Task{
		var mt:MultiTask = new MultiTask();
		for(var i:int = 0; i<this._items.length; ++i){
			var tl:TaskList = new TaskList();
			var wait:EZWaitTask = new EZWaitTask();
			wait.setAllTime((0.2/this._items.length) *i);
			tl.push(wait);
			tl.push(outTaskOne(this._items[i].gameObject));
			mt.push(tl);
		}
		return mt;
	}

	private function outTaskOne(object:GameObject):Task{
		var task:Task = new Task();
		
		var tp:GeekTweenPosition = null;
		task.init = function(){
			tp = GeekTweenPosition.Begin(object, 0.3, object.transform.localPosition + Vector3(800,0,0));
			tp.method = _method;
		};
		task.isOver = function():boolean {
			if(tp && tp.enabled){
				return false;
			}
			return true;
		};
		return task;
	}
}