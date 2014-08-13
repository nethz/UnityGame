#pragma strict

class EZHudBindManager extends MonoBehaviour{
	public var _list:EZHudBindList = null;
	
	public function set alpha(value:float){
		_list.alpha = value;
	}
	
	public function set isEnabled(value:boolean){
		_list.isEnabled = value;
	}
	public function flicker(data:EZBindData, numberFlicker:boolean){
		var task:EZWaitTask = new EZWaitTask();
		task.setAllTime(0.3f);
		task.init = function(){
			var view:EZBindView = _list.bright(data);
			if(view && numberFlicker && data.number > 0){
				view.numberFlicker(data.number);
			}
		};
		task.shutdown = function(){
			_list.dark(data);
		};
		
		
		TaskManager.Run(task);
	}
	
	public function flickerBind(bind:EZBindData.BindType){
		var task:EZWaitTask = new EZWaitTask();
		task.setAllTime(0.3f);
		task.init = function(){
			_list.brightBind(bind);
		};
		task.shutdown = function(){
			_list.darkBind(bind);
		};
		
		
		TaskManager.Run(task);
	}
	
	public function flickerMagic(magic:Geek.MagicType){
		var task:EZWaitTask = new EZWaitTask();
		task.setAllTime(0.3f);
		task.init = function(){
			_list.brightMagic(magic);
		};
		task.shutdown = function(){
			_list.darkMagic(magic);
		};
		TaskManager.Run(task);
	}
	public function create(data:EZBindData){
		
		
		if(_list.has(data)){
			flicker(data, false);
		}else{
			_list.create(data);
			
			_list.repositionNow();
			flicker(data, false);
		}
	}
	public function clear(){
		_list.clear();
	}
	public function destroy(data:EZBindData){
		 _list.destroy(data);
	}
	public function execute(data:EZBindData, action:EZBindData.Action){
		switch(action){
		case EZBindData.Action.Create:
			create(data);
		break;
		
		case EZBindData.Action.Bright:
			_list.bright(data);
		break;
		case EZBindData.Action.Dark:
			_list.dark(data);
		break;
		case EZBindData.Action.Flicker:
			flicker(data, false);
		break;
		case EZBindData.Action.NumberFlicker:
			flicker(data, true);
		break;
		case EZBindData.Action.Destroy:
			_list.destroy(data);
		break;
		}
	}
	
	
}