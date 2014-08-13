#pragma strict

/*
class EZDuplicateCtrl  extends MonoBehaviour{
	public var _view:EZDuplicateView;
	public var _model:EZDuplicateModel;
	public var _pve:UIImageButton;
	public var _pvp:UIImageButton;
	public var _event:UIImageButton;
	public var _inputSwitch:EZUIInputSwitch;
	public var _draggable:UIDraggableCamera;
	public var _itemManager:EZDuplicateItemManager;
	private var levels_:EZDuplicateListModel = null;
	private var level_:EZDuplicateLevelData = null;
	function Start(){
	
	}
	function flyPvpTask(callback:Function):Task{
		Debug.LogWarning("w++++"+_model.pvp.length);
		return _itemManager.flyTask(_model.pvp, callback);
	}
	function flyPveTask(callback:Function):Task{
		return _itemManager.flyTask(_model.pve, callback);
	}
	function flyOut():Task{
		return _itemManager.flyOut();
	}
	function flyEventTask(callback:Function):Task{
		return _itemManager.flyTask(_model.event, callback);
	}
	
	function flyTask(callback:Function):Task{
		return _itemManager.flyTask(levels_._levels, callback);
	}
	
	function inputClose(){
		_inputSwitch.close();
		_draggable.ConstrainToBounds(true);
		_draggable.momentumAmount = 0f;
		_draggable.enabled = false;
	}

	function inputOpen(){
		_inputSwitch.open();
		_draggable.momentumAmount = 35f;
		_draggable.enabled = true;
	}
	public function Update(){
		if(_model.refresh){
			this.refresh();
			_model.refresh = false;
		}
	}
	public function showBackground(){
		_view.background.show();
	}
	public function hideBackground(){
		_view.background.hide();
	}
	public function refresh(){
		 _view.apText = Mathf.FloorToInt(_model.ap) + "/" + Mathf.FloorToInt(_model.allAp);
		 if(_model.allAp <=0 ){
			_view.ap = 1;
		}else {
			var apValue:float = _model.ap/_model.allAp;
			if(apValue > 1){
				apValue = 1;
			}
			_view.ap = apValue;
		}
	}

	public function set pve(value:boolean){
		_pve.isEnabled = value;
	}

	public function set pvp(value:boolean){
		_pvp.isEnabled = value;
	}

	public function set event(value:boolean){
		_event.isEnabled = value;
	}
	
	public function select(levels:EZDuplicateListModel){
		levels_ = levels;
	}
	
	
	public function select(level:EZDuplicateLevelData){
		level_ = level;
	}
	public function gotoTask():Task{
	
		var ret:Task = new Task();
		var isOver:boolean = false;
		ret.init = function(){
			isOver = false;
			var task:Task = this.flyOut();
			TaskManager.PushBack(task, function(){
				GameLevelInfo.getInstance().levelName = level_._level;
				var load:Task = GameLevelInfo.getInstance().loadTask();
				TaskManager.PushBack(load, function(){
					isOver = true;
				});
				TaskManager.Run(load);
			});
			TaskManager.Run(task);
		};
		
		ret.isOver = function(){
			return isOver;
		};
		ret.shutdown = function(){
			var target:GameObject = GameObject.FindGameObjectWithTag("GoubalCtrl");
			if(target){
				Debug.LogWarning("aaaaaaaaaaa");
				target.SendMessage("OnAction", "play", SendMessageOptions.DontRequireReceiver);
			}
		};
	
		
		
		
		/*
		tl.push(task);
		
		
		tl.push(load);
		*/
		
		
		
		/*
		TaskManager.PushBack(ret, function(){
			var target:GameObject = GameObject.FindGameObjectWithTag("GoubalCtrl");
			if(target){
				target.SendMessage("OnAction", "play", SendMessageOptions.DontRequireReceiver);
			}
					
		});
		return ret;
			
	}
	
	
	
}*/