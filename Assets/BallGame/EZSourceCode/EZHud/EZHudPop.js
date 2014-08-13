#pragma strict

class EZHudPop extends EZScreen{
	
	
	public var _panel:UIPanel = null;
	public var _offset:GameObject = null;
	public var _pop:EZPop = null;
	public var _bg:GameObject = null;
	public var _onClick:boolean = false;
	public var _debug:boolean = false;
	private var iphone4Offset_:Vector3 = Vector3.zero;
	private var layer_ = -1;
	public function resetScale(r:float, iPhone4Offset:Vector3){
		iphone4Offset_ = iPhone4Offset;
		_offset.transform.localScale.x *= r;
	}
	public function show(){
		_panel.enabled = true;
	}
	public function hide(){
		_panel.enabled = false;
	}
	public function set alpha(value:float){
		_panel.alpha = value;
	}
	
	private function testTrun(){
		
		if(this.transform.rotation  == Quaternion(0, 0, 0, 1)){
			_bg.transform.localRotation.y = 0f;
			_offset.transform.localPosition.x = -184;
		}else{
			_bg.transform.localRotation.y = 180f;
			_offset.transform.localPosition.x = 184;
		}
		
		if(!this.iPhone5){
			this.transform.localPosition += iphone4Offset_;
		}
		
	}
	public function Start(){
		if(_debug){
			var tl:TaskList = new TaskList();
			var wait:EZWaitTask = new EZWaitTask();
			wait.setAllTime(1.0f);
			tl.push(wait);
			tl.push(showTask("assdfsdfsdfsdf", -1));
			TaskManager.Run(tl);
		
		}
	}
	
	public function hideTask():Task{
		if(layer_!= -1){
		
			setLayerRecursively(gameObject, layer_);
		}
		
		return _pop.hideTask();
		
	}
	
	function setLayerRecursively(obj:GameObject, newLayer:int){
	 	if (null == obj) {
            return;
        }
       
	    obj.layer = newLayer;
	   
	    for(var child : Transform in obj.transform ){
	        setLayerRecursively(child.gameObject, newLayer );
	    }
	}

	public function showTask(text:String, layer:int):Task{
		var task:Task = new Task();
		var isOver:boolean = false;
		if(layer != -1){
			if(this.layer_ == -1){
				this.layer_  = gameObject.layer;
			}
			Debug.Log(layer + "layerlayerlayer");
			setLayerRecursively(gameObject, layer);
			
		}
		
		task.init = function(){
			var show:Task = null;
			show = _pop.showTask(text);
			
			TaskManager.PushFront(show, function(){
				testTrun();
			});
			TaskManager.PushBack(show, function(){
				isOver = true;
			});
			TaskManager.Run(show);
		
		};
		
		task.isOver = function():boolean{
			return isOver;	
		};
		
		return task;
	
	}
}