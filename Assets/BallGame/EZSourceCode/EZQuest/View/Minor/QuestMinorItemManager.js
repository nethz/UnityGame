#pragma strict

class QuestMinorItemManager extends MonoBehaviour{
	public var _sound:EZSound = null;
	//public var _tap:EZSound = null;
	public var _prototype:QuestMinorItemView;
	public var _table:UITable;
	public var _draggablePanel:UIDraggablePanel;
	public var _autoItemManager:EZUIAutoItemManager = null;
	private var items_:QuestMinorItemView[];
	public var _inMethod:GeekTweener.Method = GeekTweener.Method.EaseOut;
	public var _outMethod:GeekTweener.Method = GeekTweener.Method.EaseOut;
	
	public var _reset:EZPanelReset = null;
	
	public var _inputSwitch:EZUIInputSwitch = null;
	public function Awake(){
		if(_inputSwitch == null){
			Debug.LogError(this.gameObject.name + "switch null");
		}
	}
	public function setItems(subscript:EZSubscript, list:List.<JsonData.Quest>){
		create(list.Count);
		for(var i:int = 0;i<items_.length;++i){
			items_[i].title = list[i].title;
			var numPass:float = 0;
			for(var j:int = 0;j<list[i].items.length;j++){
				if(list[i].items[j].pass){
					numPass++;
				}
			}
			
			var progress:float = 0;
			if(list[i].items.length == 0){
				progress = 1;
			}else{
				var all:float = list[i].items.length;
				progress = numPass/all;
			}
			Debug.LogWarning("pass" + numPass);
			items_[i].getSub().load(subscript, "q"+list[i].id.ToString());
			items_[i].setProgress(progress);
			items_[i].setRefresh(list[i].refresh);
			items_[i].setCards(list[i].items);
			items_[i].setAward(list[i].award);
		}
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
	
	
	public function inTask():Task{
		var mt:MultiTask = new MultiTask();
		
		for(var i:int = 0; i<items_.length; ++i){
			var tl:TaskList = new TaskList();
			var wait:EZWaitTask = new EZWaitTask();
			wait.setAllTime((0.2/items_.length) *i);
			tl.push(wait);
			tl.push(inTaskOne(items_[items_.Length - i -1].gameObject));
			mt.push(tl);
		}
		
		return mt;
	}
	public function openTask():Task{
		var tl:TaskList = new TaskList();
		
		tl.push(this.inTask());
		
		TaskManager.PushFront(tl, function(){
			_sound.play();
			for(var i:int = 0; i<items_.Length; ++i){
				items_[i].gameObject.transform.localPosition = items_[i].gameObject.transform.localPosition + Vector3(800, 0 ,0);
			}
			open();
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
	
	
	public function open(){
		if(items_){
			for(var i:int = 0;i<items_.length;++i){
				items_[i].open();
			}
		}
	}
	private function outTaskOne(gameObject:GameObject):Task{
		var task:Task = new Task();
		
		var tp:GeekTweenPosition = null;
		task.init = function(){
			tp = GeekTweenPosition.Begin(gameObject, 0.2, gameObject.transform.localPosition + Vector3(800,0,0));
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
	public function outTask():Task{
		var mt:MultiTask = new MultiTask();
		for(var i:int = 0; i<items_.length; ++i){
			var tl:TaskList = new TaskList();
			var wait:EZWaitTask = new EZWaitTask();
			wait.setAllTime((0.2/items_.length) *i);
			tl.push(wait);
			tl.push(outTaskOne(items_[items_.Length - i -1].gameObject));
			mt.push(tl);
		}
		return mt;
	}
	public function foldTask():Task{
	 	var task:Task =  _autoItemManager.foldTask(); 
		
	//	TaskManager.PushFront(task, function(){
	//		_tap.play(); 
			
	//	});
		
		return task;
	}
	private function foldReposition():Task{  
		var task:Task =  _autoItemManager.foldReposition(); 
		
	//	TaskManager.PushFront(task, function(){
	//		_tap.play();
	//	});
	
		return task;
	
	} 
	
	public function closeTask():Task{
		var tl:TaskList = new TaskList();
		
		//tl.push(task);
		tl.push(outTask());
		TaskManager.PushFront(tl, function(){
			_sound.play();
		});
		
		TaskManager.PushBack(tl, function(){
			this.close();
			for(var i:int = 0; i<items_.Length; ++i){
				items_[i].gameObject.transform.localPosition = items_[i].gameObject.transform.localPosition + Vector3(-800, 0 ,0);
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
			_reset.reset();
		});
		
		return tl;
	}
	public function close(){
		if(items_){
			for(var i:int = 0;i<items_.length;++i){
				items_[i].close();
			}
		}
	}
	public function onCallback(object:GameObject){
		var task:Task = _autoItemManager.onCallbackTask(object);
		TaskManager.Run(task);
	}
	private function create(num:int){
		destoryItem();
		_autoItemManager.clear();
		
		items_ = new QuestMinorItemView[num];
		for(var i:int = 0; i < num; ++i){
			items_[i] = createItem();
			items_[i].close();
			items_[i].gameObject.name = "Item"+(num - i -1).ToString("D3");
			var autoItem:EZUIAutoItem = items_[i].gameObject.GetComponent(EZUIAutoItem) as EZUIAutoItem;
			if(autoItem){
			
				var button:EZButtonObjCallback = _autoItemManager.addAutoItem(autoItem);
				button.setup(this.onCallback);
			}
		}
		_table.repositionNow = true;
	}
	
	private function destoryItem(){
		if(items_){
			for(var i:int = 0; i< items_.length; ++i){ 
				GameObject.DestroyObject(items_[i].gameObject);
			} 
		}
		items_ = null;
	}
	
	private function createItem():QuestMinorItemView{
		var obj:GameObject = GameObject.Instantiate(_prototype.gameObject);
		var item:QuestMinorItemView = obj.GetComponent(QuestMinorItemView) as QuestMinorItemView;
		obj.transform.parent = _table.gameObject.transform;
		obj.transform.localPosition = _prototype.gameObject.transform.localPosition;
		obj.transform.localScale = Vector3.one;
		obj.SetActive(true);
		return item;
	}
}