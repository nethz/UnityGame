#pragma strict

class EZBroadcast extends EZScreen{ 

	private static var instance_:EZBroadcast = null;
	public var _info:EZInfo;
	//public var _sprite:UISprite;
	private var business_:boolean = false; 
	
	public var _position:Vector3[];
	public var _position5:Vector3[];
	
	public var _offset:Transform = null;
	public var _table:EZBroadcastTable;
	private var pack_:EZBroadcastPack = null;
	public var _panel:UIPanel= null;
	private var isOpen_:boolean = false;
	public function addText(text:String){
		_info.addText(text); 
	}
	
	public function Awake(){ 
		super.Awake();
		this.instance_ = this;
		this.close();
	}
	
	public static function GetInstance():EZBroadcast{
		return this.instance_;
	}
	
	public function next():Task{ 
		var text:String = pack_.getText();
		if(String.IsNullOrEmpty(text)){
			_panel.enabled = false;
			return new Task();
		}else{
			_panel.enabled = true;
			var task:Task = _info.rollTask(text);
		
			TaskManager.PushFront(task, function(){
				business_ = true; 
					
			});
			TaskManager.AddOver(task, function():boolean{
				return this.business_ == false;
			});
			TaskManager.PushBack(task, function(){
				business_ = false; 
			}); 
				
		
		
			return task;
		}
	
		
		
	}
	public function close(){
		_info.hide();
		_panel.enabled = false; 
		this.isOpen_ = false;
		this.business_ = false;
	}
	public function openTask(scene:int):Task{
		var tl:TaskList = new TaskList();
		tl.push(loadTask(scene));
		tl.push(showTask(scene));
		
		
		return tl;
	
	}
	public function showTask(scene:int){
		var task:Task = new Task();
		var ta:TweenAlpha = null;
		
		task.init = function(){
			if(this.iPhone5){
				if(scene >= 0 && scene < _position5.Length){
					_offset.localPosition = _position5[scene];
				}
			}else{
				if(scene >= 0 && scene < _position.Length){
					_offset.localPosition = _position[scene];
				}
			}
			_info.show();
			
			
			_panel.alpha = 0.0;
			
			TaskManager.Run(next());
			//_panel.enabled = true;
			ta = TweenAlpha.Begin(this.gameObject, 0.3f, 1.0f);
		};
		task.isOver = function():boolean{
			if(ta && ta.enabled){
				return false;
			}
			return true;
			
		};
	
	
		return task;
	
	}
	public function loadTask(scene:int):Task{
		var task:Task = new Task();
		task.init = function(){
			pack_ = _table.setScene(scene);
			this.isOpen_ = true;
			
		};
		return task;
		
	}
	
	public function open(scene:int){
		if(this.iPhone5){
			if(scene >= 0 && scene < _position5.Length){
				_offset.localPosition = _position5[scene];
			}
		}else{
			if(scene >= 0 && scene < _position.Length){
				_offset.localPosition = _position[scene];
			}
		}
			
		_panel.alpha = 1.0;
		TaskManager.Run(next());
		//_panel.enabled = true;
		_info.show();
		isOpen_ = true;
		
	}
	public function Update(){ 
		if(this.isOpen_ && !business_){
			TaskManager.Run(next());
		}
	}
}