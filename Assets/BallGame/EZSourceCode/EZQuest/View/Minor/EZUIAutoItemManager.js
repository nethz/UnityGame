#pragma strict
import System.Collections.Generic;

class EZUIAutoItemManager extends MonoBehaviour{
	
	//public var _inputSwitch:EZUIInputSwitch;
	public var _uiTable:UITable = null;
	
	public var _isReposition:boolean = false;
	public var _draggablePanel:UIDraggablePanel;
	public var _repositionTime:float = 0.1f;
	
	private var items_ : List.<EZUIAutoItem> = new List.<EZUIAutoItem>();
	private var oldPanelPositionY_:float = 0f;
	
	public function reposition(){
		if(_uiTable)
			_uiTable.Reposition();
			
	}
	
	public var _inputSwitch:EZUIInputSwitch = null;
	public function Awake(){
		if(_inputSwitch == null){
			Debug.LogError(this.gameObject.name + "switch null");
		}
		oldPanelPositionY_ = _draggablePanel.transform.localPosition.y;
	}
	
	public function set isReposition(value:boolean){
		_isReposition = value;
	}
	public function Update(){
		if(_isReposition){
			reposition();
		}
	}
	
	
	
	public function addAutoItem(item:EZUIAutoItem):EZButtonObjCallback{
		
		items_.Add(item);
		
		var button:EZButtonObjCallback  = item.gameObject.GetComponent.<EZButtonObjCallback>();
		
		if(!button){
			button = item.gameObject.AddComponent(EZButtonObjCallback) as EZButtonObjCallback;
		}
		return button;
		
		//button.setup(this.onCallback);
	
	}
	public function onCallbackTask(obj:GameObject):Task{
		var auto:EZUIAutoItem = obj.GetComponent.<EZUIAutoItem>();
		var mt:MultiTask = new MultiTask();
		var target:GameObject = GameObject.FindGameObjectWithTag("Ctrl");
		if(auto.isFold)
		{
			var fold:Task = this.foldOthers();
			mt.push(fold);
		
			var unfold:Task = auto.unfoldTask();
			mt.push(unfold); 
			
			if(target){
				target.SendMessage("unfold",  SendMessageOptions.DontRequireReceiver);
			}
			
		}else{ 
		 	if(target){
				target.SendMessage("fold",  SendMessageOptions.DontRequireReceiver);
			}
			mt.push(auto.foldTask());
			
		}
		
		
		TaskManager.PushFront(mt, function(){
			_inputSwitch.close();
			_isReposition = true;
		});
		
		TaskManager.PushBack(mt, function(){
			_inputSwitch.open();
			_draggablePanel.RestrictWithinBounds(false);
			_isReposition = false;
		});
		return mt;
	}
	public function clear(){
		items_.Clear();
	}


	public function foldOthers():Task{
	
		var mt:MultiTask = new MultiTask();
		for(var i:int = 0;i<items_.Count;++i){
			if(!items_[i].isFold){
				mt.push(items_[i].foldTask());
			}
		}
		return mt;
	}
	public function foldTask():Task{
	 	var task:Task =  this.foldReposition(); 
		
		TaskManager.PushFront(task, function(){
			 
			//if(EZUIInputSwitch.GetInstance()){
			//	EZUIInputSwitch.GetInstance().close();
			//}
			_inputSwitch.close();
		});
		TaskManager.PushBack(task, function(){ 
			
			//if(EZUIInputSwitch.GetInstance()){
			//	EZUIInputSwitch.GetInstance().open();
			//}
			
			_inputSwitch.open();
		});
		
		return task;
	}
	public function foldReposition():Task{
		Debug.Log("<---------------------foldReposition------------------------------>");  
		var tl:TaskList = new TaskList();
		var task:Task =  this.foldOthers(); 
		TaskManager.PushFront(task, function(){
			this.isReposition = true;
		});
		TaskManager.PushBack(task, function(){
			this.isReposition = false;
		});
		tl.push(task);
		var wait:EZWaitTask = new EZWaitTask();
		var timeScale:float = (_draggablePanel.transform.localPosition.y - oldPanelPositionY_)/1000f;
		if(timeScale < 0) timeScale = 0;
		wait.setAllTime(_repositionTime * timeScale);
		TaskManager.PushFront(wait,function(){
			_draggablePanel.RestrictWithinBounds(false);
		});
		tl.push(wait);
		return tl;
	
	} 
}