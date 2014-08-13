#pragma strict

class EZGuidePuzzle extends MonoBehaviour{
	public var _panel:UIPanel = null;
	public var _manager:EZBallsManager = null;
	public var _boxes:BoxCollider[] = null;
	
	private var isOpen_:boolean = false;
	public function Awake(){			
		this.close();
	}
	public function openTask():Task{
		var task:Task = new Task();
		var ta:TweenAlpha = null; 
		task.init = function(){
			_panel.alpha = 0;
			_panel.enabled = true;
			ta = TweenAlpha.Begin(_panel.gameObject, 0.5, 1);
			
		};
		task.isOver = function():boolean{
			if(ta && ta.enabled){
				return false;
			}
			return true;
		};
		task.shutdown = function(){
			this.open();
		};
		
		return task;
	}
	
	public function closeTask():Task{
		var task:Task = new Task();
		var ta:TweenAlpha = null; 
		task.init = function(){
			_panel.alpha = 1;
			_panel.enabled = true;
			ta = TweenAlpha.Begin(_panel.gameObject, 0.5, 0);
			
		};
		task.isOver = function():boolean{
			if(ta && ta.enabled){
				return false;
			}
			return true;
		};
		task.shutdown = function(){
			this.close();
		};
		
		return task;
	}
	
	public function activeManager(){
		_manager.gameObject.active = true;
	}
	
	public function playTask():Task{
		var task:Task = new Task();
		task.init = function(){
			_manager.loaded();
		};
		task.isOver = function():boolean{
			return _manager.gameOver();
		};
		return task;
	}
	public function close(){
		isOpen_ = false;
		for(var i:int = 0; i< _boxes.Length; ++i){
			_boxes[i].enabled = false;
		}
		_panel.enabled = false;
	}
	public function open(){
	
		isOpen_ = true;
		for(var i:int = 0; i< _boxes.Length; ++i){
			_boxes[i].enabled = true;
		}
		_panel.enabled = true;
	
	}
	
	
}