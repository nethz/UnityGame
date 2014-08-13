#pragma strict

class QuestMainView extends MonoBehaviour{
	public var _boxs:Collider[];
	public var _top:UISprite = null;
	public var _title:UILabel = null;
	public var _progress:UILabel = null;
	public var _manager:QuestMainItemManager = null;
	public var _bar:UIPanel = null;
	
	public function Awake(){
		this.close();
	}
	public function openTask():Task{
		var task:Task = _manager.openTask();
		TaskManager.PushFront(task, function(){
			setEnabled(true);
			_top.spriteName = "taskMainTop";
		});
		return task;
	}
	
	public function closeTask():Task{
		var task:Task = _manager.closeTask();
		TaskManager.PushBack(task, function(){
			setEnabled(false);
		});
		return task;
	}
	public function open(){
		_top.spriteName = "taskMainTop";
		setEnabled(true);
		_manager.open();
	}
	
	public function close(){
		setEnabled(false);
		_manager.close();
	}
	
	private function setEnabled(enabled:boolean){
		_title.enabled = enabled;
		_progress.enabled = enabled;
		_bar.enabled = enabled;
		for(var i:int = 0;i<_boxs.length;++i){
			_boxs[i].enabled = enabled;
		}
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