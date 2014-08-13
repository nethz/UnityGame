#pragma strict

class EZGuideSelect extends EZScreen{
	public var _pullUp:GameObject = null;
	public var _bg:UISprite = null;
	public var _height1:Vector3 = Vector3.zero;
	public var _time1:float = 0.5f;
	public var _height2:Vector3 = Vector3.zero;
	public var _height2iPhone5:Vector3 = Vector3.zero;
	public var _time2:float = 0.5f;
	public var _indicate:EZGuideDialogue = null;
	public var _switchRole:SwitchRole = null;
	public var _title:UILabel = null;
	public var _nameWindow:NameWindow = null;
	
	private var tp_:GeekTweenPosition = null;
	
	public function Awake(){
		super.Awake();
		_bg.color.a = 0f;
		_title.enabled = false;
	}
	
	public function showIndicate(){
		var mt:MultiTask = new MultiTask();
		mt.push(_switchRole.loadHero());
		var tl:TaskList = new TaskList();
		var showBgTask:Task = new Task();
		//if(this.iPhone1080){
			tl.push(pullUp(_time1,_height1));
		//}else{
		//	tl.push(pullUp(_time1,_height1iPhone1080));
		//}
		tl.push(_indicate.showTextTask());
		TaskManager.PushFront(tl,function(){
			_bg.color.a = 1f;
		});
		mt.push(tl);
		TaskManager.Run(mt);
	}
	
	public function showSelect(){
		var tl:TaskList = new TaskList();
		var pullUpTask:Task = null;//
		if(iPhone5 ){
			
			pullUpTask = pullUp(_time2, _height2iPhone5);
		}else{
			pullUpTask = pullUp(_time2, _height2);
		}
		
		TaskManager.PushFront(pullUpTask,function(){
			_indicate.showCursor(false);
			_indicate.clearText();
			_title.enabled = true;
		});
		tl.push(pullUpTask);
		//tl.push(_switchRole.loadHero());
		//tl.push(_switchRole.stopHero());
		TaskManager.Run(tl);
	}
	
	public function switchSex(isBoy:boolean){
		_switchRole.switchSex(isBoy);
	}
	
	public function get heroSex():boolean{
		return _switchRole.heroSex;
	}
	
	public function get heroName():String{
		return _nameWindow.heroName;
	}
	
	public function openNameWindow(){
		_nameWindow.open();
	}
	
	public function closeNameWindow(){
		_nameWindow.close();
	}
	
	private function pullUp(time:float,height:Vector3):Task{
		var task:Task = new Task();
		task.init = function(){
			tp_ = GeekTweenPosition.Begin(_pullUp,time,height);
		};
		task.isOver = function():boolean{
			if(tp_ && !tp_.enabled){
				return true;
			}
			return false;	
		};
		return task;
	}
	
	
}