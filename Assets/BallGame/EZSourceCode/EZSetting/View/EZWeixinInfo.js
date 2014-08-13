#pragma strict

class EZWeixinInfo extends MonoBehaviour{
	public var _switch:EZUISwitch = null;
	public var _web:WebTexture = null;
	//public var _url:String = '';
	public var _panel:UIPanel = null;
	public var _loadingTime:float = 0.1;
	public var _loadedTime:float = 0.2;
	
	public function alphaTask(time:float):Task{
		var task:Task = new Task();
		var ta:TweenAlpha =null;
		task.init = function(){
			ta = TweenAlpha.Begin(this.gameObject, time, 1);
		//	ta.method = TweenAlpha.Method.Line;
		};
		task.isOver = function(){
			if(ta && ta.enabled){
				return false; 
			}
			return true;
		};
		return task;
	
	}
	public function loadTask():Task{
		if(_web.isLoaded){
		
			var open:Task = new Task();
			open.init = function(){
				
				_panel.alpha = 1;
				_switch.open();
			};
			return open;
		}else{
		
			var tl:TaskList = new TaskList();
			var mt1:MultiTask = new MultiTask();
			var mt2:MultiTask = new MultiTask();
			
	
			var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
			loading.time = _loadingTime;
			loading.alpha = 0.5f;
			loading.text = EZDictionary.LookUp("!loading");
			
			var task:Task = new Task();
			task.init = function(){
				if(!_web.isLoaded){
					_web.load(WebForGame.GetInstance().info.getUrl("wechat", WebInfo.Server.Master));
				}
			};
			task.isOver = function():boolean{
				
				
				
				return _web.isLoaded;
			};
			task.shutdown = function(){
			
				_panel.alpha = 0;
				_switch.open();
			
			};
			
			mt1.push(loading);
			mt1.push(task);
			var loaded:EZLoadedTask = TaskManager.Create("global.ui.loaded") as EZLoadedTask;
			loaded.time = _loadedTime;
			
			mt2.push(alphaTask(_loadedTime));
			mt2.push(loaded);
			tl.push(mt1);
			tl.push(mt2);
			return tl;
		
		}
	
	
	}
	public function close(){
		_switch.close();
	}
}