#pragma strict
import System.Collections.Generic;

class MissionEventItemManager extends MonoBehaviour{
	public var _prototype:GameObject = null;
	public var _table:UITable = null;
	public var _draggablePanel:UIDraggablePanel = null;
	public var _inMethod:GeekTweener.Method = GeekTweener.Method.EaseOut;
	public var _outMethod:GeekTweener.Method = GeekTweener.Method.EaseOut;
	public var _debug:boolean = false;
	private var items_:EventItemView[] = null;
	public var itemName:String ="Item";
	public var _sound:EZSound = null;
	public var _autoItemManager:EZUIAutoItemManager = null;
	public var _reset:EZPanelReset = null;
	public var _inputSwitch:EZUIInputSwitch = null;
	public function Awake(){
		if(_inputSwitch == null){
			Debug.LogError(this.gameObject.name + "switch null");
		}
	}
	public function foldTask():Task{
	 	var task:Task =  _autoItemManager.foldTask(); 
		return task;
	}
	private function foldReposition():Task{  
		var task:Task =  _autoItemManager.foldReposition(); 
		
		TaskManager.PushFront(task, function(){
			_sound.play();
		});
	
		return task;
	
	} 
	
	
	public function Start(){
		
		this.close();
	}
	
	public function open(){
		if(this.items_){
			for(var i:int = 0;i<this.items_.length;++i){
				this.items_[i].open();
			}
		}
	}
	
	public function close(){
		if(this.items_){
			for(var i:int = 0;i<this.items_.length;++i){
				this.items_[i].close();
			}
		}
	}
	
	public function repositionNow(){
		_table.repositionNow = true;
	}
	
	// Create items
	public function get items(){
		return items_;
	}
	/*public function setup(list:List.<EZMissionMenuData>){
		list_ = list;
		create(list_.Count);
		for(var i:int = 0; i <list_.Count; ++i){
			this.items_[i].setup(list_[i]);
		}
	}*/
	
	
	public function onCallback(object:GameObject){
		var task:Task = _autoItemManager.onCallbackTask(object);
		TaskManager.Run(task);
	}
	public function create(num:int){
		destoryItem();
		_autoItemManager.clear();
		
		this.items_ = new EventItemView[num];
		for(var i:int = 0; i < num; ++i){
			
			this.items_[i] = createItem();
			this.items_[i].gameObject.name = itemName+ (num-i).ToString("D3");
			
			var autoItem:EZUIAutoItem = items_[i].gameObject.GetComponent(EZUIAutoItem) as EZUIAutoItem;
			if(autoItem){
			
				var button:EZButtonObjCallback = _autoItemManager.addAutoItem(autoItem);
				button.setup(this.onCallback);
			}
			
		}
		
		repositionNow();
	}
	
	public function destoryItem(){
		if(this.items_){
			for(var i:int = 0; i< this.items_.length; ++i){ 
				GameObject.DestroyObject(this.items_[i].gameObject);
			} 
		}
		this.items_ = null;
	}
	
	private function createItem():EventItemView{
		var obj:GameObject = GameObject.Instantiate(_prototype);
		var item:EventItemView = obj.GetComponent(EventItemView) as EventItemView;
		var drag:UIDragPanelContents = obj.GetComponent(UIDragPanelContents) as UIDragPanelContents;
		drag.draggablePanel = _draggablePanel;
		obj.transform.parent = _table.gameObject.transform;
		obj.transform.localPosition = _prototype.transform.localPosition;
		obj.transform.localScale = Vector3.one;
		obj.SetActive(true);
		return item;
	}
	
	//Fly in and out
	public function openTask():Task{
		
		var tl:TaskList = new TaskList();
		var wait:EZWaitTask = new EZWaitTask();
		wait.setAllTime(0.1f);
		tl.push(wait);
		tl.push(this.inTask());
		TaskManager.PushBack(wait, function(){
			_table.Reposition();
			if(items_){
				for(var i:int = 0; i<this.items_.Length; ++i){
					this.items_[i].gameObject.transform.localPosition = this.items_[i].gameObject.transform.localPosition + Vector3(800, 0 ,0);
				}
			}
			open();
		});
		TaskManager.PushFront(tl, function(){
			//if(EZUIInputSwitch.GetInstance()){
			_inputSwitch.close();
			//}
			_sound.play();
			
		});
		TaskManager.PushBack(tl, function(){
			//if(EZUIInputSwitch.GetInstance()){
			//	EZUIInputSwitch.GetInstance().open();
			//}
			_inputSwitch.open();
		});
		return tl;
	}
	
	public function closeTask():Task{ 
		var task:Task = new Task();
		var isOver:boolean = false;
		task.init = function(){ 
			isOver = false;
			var tl:TaskList = new TaskList();
		
			tl.push(foldReposition()); 
			tl.push(this.outTask());
			TaskManager.PushBack(tl, function(){
				close();
				if(items_){
					for(var i:int = 0; i<this.items_.Length; ++i){
						this.items_[i].gameObject.transform.localPosition = this.items_[i].gameObject.transform.localPosition + Vector3(-800, 0 ,0);
					}
				}
				_draggablePanel.ResetPosition();
			});
			
			TaskManager.PushFront(tl, function(){
				//if(EZUIInputSwitch.GetInstance()){
				//	EZUIInputSwitch.GetInstance().close();
				//}
				_inputSwitch.close(); 
				_sound.play();
				
			});
			TaskManager.PushBack(tl, function(){
				//if(EZUIInputSwitch.GetInstance()){
				//	EZUIInputSwitch.GetInstance().open();
				//}
				
				_inputSwitch.open(); 
				_reset.reset();
			});
			TaskManager.PushBack(tl, function(){
				isOver = true;
			}); 
			TaskManager.Run(tl);
		};
	 	task.isOver = function():boolean{
	 		return isOver;
	 	
	 	};
		return task;
	}

	public function inTask():Task{
		var mt:MultiTask = new MultiTask();
		if(items_){
			for(var i:int = 0; i<this.items_.length; ++i){
				var tl:TaskList = new TaskList();
				var wait:EZWaitTask = new EZWaitTask();
				wait.setAllTime((0.2/this.items_.length) *i);
				tl.push(wait);
				tl.push(inTaskOne(this.items_[this.items_.length - 1- i].gameObject));
				mt.push(tl);
			}
		}
	
		return mt;
	}
	
	private function inTaskOne(object:GameObject):Task{
		var task:Task = new Task();
		var tp:GeekTweenPosition = null;
		task.init = function(){
			tp = GeekTweenPosition.Begin(object, 0.2, object.transform.localPosition - Vector3(800, 0 ,0));
			tp.method = _inMethod;
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
		if(items_){
			for(var i:int = 0; i<this.items_.length; ++i){
				var tl:TaskList = new TaskList();
				var wait:EZWaitTask = new EZWaitTask();
				wait.setAllTime((0.2/this.items_.length) *i);
				tl.push(wait);
				tl.push(outTaskOne(this.items_[this.items_.length - 1- i].gameObject));
				mt.push(tl);
			}
		}
		return mt;
	}

	private function outTaskOne(object:GameObject):Task{
		var task:Task = new Task();
		
		var tp:GeekTweenPosition = null;
		task.init = function(){
			tp = GeekTweenPosition.Begin(object, 0.3, object.transform.localPosition + Vector3(800,0,0));
			tp.method = _outMethod;
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