#pragma strict

class QuestMinorView extends MonoBehaviour{
	public var _boxs:Collider[];
	public var _top:UISprite = null;
	public var _title:UILabel = null;
	public var _progress:UILabel = null;
	public var _text:UILabel = null;
	public var _manager:QuestMinorItemManager = null;
	public var _bar:UIPanel = null;
	
	public function Awake(){
		this.close();
	}
	
	public function open(){
		_top.spriteName = "taskMinorTop";
		_title.enabled = true;
		_progress.enabled = true;
		_text.enabled = true;
		_bar.enabled = true;
		_manager.open();
		for(var i:int = 0;i<_boxs.length;++i){
			_boxs[i].enabled = true;
		}
	}
	
	public function close(){
		_title.enabled = false;
		_progress.enabled = false;
		_bar.enabled = false;
		_text.enabled = false;
		_manager.close();
		for(var i:int = 0;i<_boxs.length;++i){
			_boxs[i].enabled = false;
		}
	}
	
	public function closeTask():Task{
		var task:Task = _manager.closeTask();
		TaskManager.PushBack(task, function(){
			close();
		});
		return task;
	}
	
	
	public function foldTask():Task{
		
		return _manager.foldTask();
	}
	public function openTask():Task{
		var task:Task = _manager.openTask();
		TaskManager.PushFront(task, function(){
			open();
		});
		return task;
	}

	
	public function set title(value:String){
		_title.text = value;
	}
	
	public function set progress(value:String){
		_progress.text = value;
	}
	
	public function get manager(){
		return _manager;
	}
}