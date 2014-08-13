#pragma strict

class QuestMainItemManager extends MonoBehaviour{
	public var _sound:EZSound = null;
	public var _prototype:QuestMainItemView;
	public var _grid:UIGrid;
	public var _draggablePanel:UIDraggablePanel;
	
	public var _inMethod:GeekTweener.Method = GeekTweener.Method.EaseOut;
	public var _outMethod:GeekTweener.Method = GeekTweener.Method.EaseOut;
	private var items_:QuestMainItemView[];
	
	public var _reset:EZPanelReset = null;
	public var _inputSwitch:EZUIInputSwitch = null;
	public function Awake(){
		if(_inputSwitch == null){
			Debug.LogError(this.gameObject.name + "switch null");
		}
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
	
	public function closeTask():Task{
		
		var tl:TaskList = new TaskList();
		
		tl.push(this.outTask());
		TaskManager.PushBack(tl, function(){
			close();
			for(var i:int = 0; i<items_.Length; ++i){
				items_[i].gameObject.transform.localPosition = items_[i].gameObject.transform.localPosition + Vector3(-800, 0 ,0);
			}
			
			_draggablePanel.ResetPosition();
		});
		TaskManager.PushFront(tl, function(){
			_sound.play();
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
			_reset.reset();
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
	
	public function close(){
		if(items_){
			for(var i:int = 0;i<items_.length;++i){
				items_[i].close();
			}
		}
	}
	
	public function setItems(itemDatas:EZQuestMainSetup.Item[]){
		create(itemDatas.length);
		for(var i:int = 0;i<items_.length;i++){
			items_[i].title = itemDatas[i].title;
			items_[i].setProgress(itemDatas[i].pass, itemDatas[i].max);
			Debug.LogWarning(itemDatas[i].list.Count);
			
			items_[i].getSub().load(itemDatas[i].subscript, itemDatas[i].list);
		}
	}
	
	private function create(num:int){
		destoryItem();
		items_ = new QuestMainItemView[num];
		for(var i:int = 0; i < num; ++i){
			
			items_[i] = createItem();
			//items_[i].open();
			items_[i].gameObject.name = "Item"+(num - i -1).ToString("D3");
		}
		_grid.repositionNow = true;
	}
	
	private function destoryItem(){
		if(items_){
			for(var i:int = 0; i< items_.length; ++i){ 
				GameObject.DestroyObject(items_[i].gameObject);
			} 
		}
		items_ = null;
	}
	
	private function createItem():QuestMainItemView{
		var obj:GameObject = GameObject.Instantiate(_prototype.gameObject);
		var item:QuestMainItemView = obj.GetComponent(QuestMainItemView) as QuestMainItemView;
		var drag:UIDragPanelContents = obj.GetComponent(UIDragPanelContents) as UIDragPanelContents;
		drag.draggablePanel = this._draggablePanel;
		obj.transform.parent = this._grid.gameObject.transform;
		obj.transform.localPosition = _prototype.gameObject.transform.localPosition;
		obj.transform.localScale = Vector3.one;
		obj.SetActive(true);
		return item;
	}
	
}