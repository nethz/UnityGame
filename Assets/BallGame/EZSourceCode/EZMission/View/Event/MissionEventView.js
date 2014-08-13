#pragma strict

class MissionEventView extends MonoBehaviour{

	public var _scrollBar:UIScrollBar = null;
	public var _outLine:Collider = null;
	public var _manager:MissionEventItemManager = null;
	public var _keys:MissionKeysView = null;
	private var theList_:List.<EZMissionEvtMenuData> = null;
	public function Awake(){
		this.close();
	}
	public function foldTask():Task{
		return _manager.foldTask();
	}
	public function open(){
		
		_outLine.enabled = true;
		_scrollBar.gameObject.GetComponent(UIPanel).enabled = true;
		_keys.open();
		_manager.open();
	}
	
	public function close(){
	
		_outLine.enabled = false;
		_keys.close();
		_scrollBar.gameObject.GetComponent(UIPanel).enabled = false;
		_manager.close();
	}
	
	public function openTask():Task{
		var task:Task = _manager.openTask();
		TaskManager.PushFront(task,
			function(){
				_outLine.enabled = true;
				_scrollBar.gameObject.GetComponent(UIPanel).enabled = true;
				_keys.open();
			}
		);
		return task;
		
	}
	public function closeTask():Task{
		var task:Task = _manager.closeTask();
		TaskManager.PushFront(task,
			function(){
				_outLine.enabled = false;
			}
		);
		
		TaskManager.PushBack(task,
			function(){
				_scrollBar.gameObject.GetComponent(UIPanel).enabled = false;
				_keys.close();
			}
		);
		return task;
	}


	public function setup(subscript:EZSubscript, setup:EZMissionEvtMenuSetup){
		theList_ = setup.list;
		_keys.setup(setup.gold, setup.silver, setup.cuprum);
		_keys.setup(setup);
		_manager.create(theList_.Count);
		
		var items:EventItemView[] = _manager.items;
		for(var i:int = 0; i < theList_.Count; ++i){
			var item:EventItemView = items[i];
			
			item.setup(subscript, theList_[i]);
		}
		
	}

}