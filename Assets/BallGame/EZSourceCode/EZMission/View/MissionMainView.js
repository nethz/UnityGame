#pragma strict

class MissionMainView extends MonoBehaviour{

	public var _scrollBar:UIScrollBar = null;
	public var _outLine:Collider = null;
	public var _manager:MissionItemManager = null;
	private var list_:List.<EZMissionMenuData> = null;
	
	public function Awake(){
		this.close();
	}
	public function open(){
		_outLine.enabled = true;
		_scrollBar.gameObject.GetComponent(UIPanel).enabled = true;
		_manager.open();
	}
	
	public function close(){
		_outLine.enabled = false;
		_scrollBar.gameObject.GetComponent(UIPanel).enabled = false;
		_manager.close();
	}
	
	public function openTask():Task{
		var task:Task = _manager.openTask();
		TaskManager.PushFront(task, function(){
			_outLine.enabled = true;
			_scrollBar.gameObject.GetComponent(UIPanel).enabled = true;
		});
		return task;
	}
	public function closeTask():Task{
		var task:Task = _manager.closeTask();
		TaskManager.PushBack(task, function(){
			_outLine.enabled = false;
			_scrollBar.gameObject.GetComponent(UIPanel).enabled = false;
		});
		return task;
	}
	public function setup(subscript:EZSubscript, setup:EZMissionMenuSetup){
		list_ = setup.list;
		_manager.create(list_.Count);
		var items:MissionItemView[] = _manager.items;
		for(var i:int = 0; i < list_.Count; ++i){
			var item:PVEMainItemView = items[i].gameObject.GetComponent.<PVEMainItemView>();
			item.setup(subscript, list_[i]);
		}
	}

}