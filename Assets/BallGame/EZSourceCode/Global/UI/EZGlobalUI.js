#pragma strict
class EZGlobalUI extends MonoBehaviour{
	static private var instance_:EZGlobalUI = null;
	public var _loading:EZLoading; 
	public var _window:EZWindow;
	public var _thiWindow:EZThiWindow;
	public var _warningSound:EZSound = null;
	
	public function get window():EZWindow{
		return _window;
	}
	public function get loading():EZLoading{
		return _loading;
	}
	
	public function Start(){
	}
	public function Awake(){ 
		instance_ = this;
		
		TaskManager.registerTask("global.ui.window", this.windowTask);
		TaskManager.registerTask("global.ui.thiWindow", this.thiWindowTask);
		TaskManager.registerTask("global.ui.warning", this.warningTask);
		TaskManager.registerTask("global.ui.loading", this.loadingTask);
		TaskManager.registerTask("global.ui.load.over", this.loadOverTask);
		TaskManager.registerTask("global.ui.loaded", this.loadedTask);
		TaskManager.registerTask("global.ui.doload", this.doloadTask);
		ActionManager.registerFunction("global.ui.reset", function(){
			_window.close();
			_thiWindow.close();
		});
	
		
	}
	public function OnDestroy(){
		TaskManager.unregisterTask("global.ui.thiWindow");
		TaskManager.unregisterTask("global.ui.window");
		TaskManager.unregisterTask("global.ui.warning");
		TaskManager.unregisterTask("global.ui.load.over");
		TaskManager.unregisterTask("global.ui.loading");
		TaskManager.unregisterTask("global.ui.loaded");
		TaskManager.unregisterTask("global.ui.doload");
		ActionManager.unregisterAction("global.ui.reset");
	}

	public function loadOverTask():Task{
		var task:Task = _loading.overTask();
		
		return task;
	
	}

	public function loadingTask():Task{
			
		var task:EZLoadingTask = new EZLoadingTask();
		var isOver:boolean = false;
		
		task.init = function(){
			Debug.Log("loadingTask");
			isOver = false;
			
			Debug.Log("2");
			var load:Task = _loading.showTask(task.time, task.alpha, task.text, task.type, task.quality, task.index, task.show);
			TaskManager.PushBack(load, function(){
				isOver = true;
			});
			TaskManager.Run(load);
			
		};
		task.isOver = function():boolean{
			return isOver;
		};
		return task;
	
	
	}
	
	public function loadedTask():Task{
		var task:EZLoadedTask = new EZLoadedTask();
		var isOver:boolean = false;
		
		task.init = function(){
			isOver = false;
			var load:Task = _loading.hideTask(task.time);
			TaskManager.PushBack(load, function(){
				
				isOver = true;
			});
			TaskManager.Run(load);
			
		};
		task.isOver = function():boolean{	
			return isOver;
		};
	
		return task;
	}
	
	public function warningTask():Task{
		var task:EZWarningTask = new EZWarningTask();
		
		var isOver:boolean = false;
		var n:int = 0;
		task.init = function(){
			isOver = false;
			var item:EZWarningTask.Item = task.messages[n];
			_window.touchNext(item.title, item.message, 
				function(){
					if(n < task.messages.Count -1){
						++n;
						var next:EZWarningTask.Item = task.messages[n];
						_window.touchText(next.title, next.message);
						
					}else{
						isOver = true;
					}
				}
			);
		};
		task.isOver = function():boolean{
			return  (!_window.isOpen)||isOver;
		};
		task.shutdown = function(){
			if(_window.isOpen){
				_window.close();
			}
		};
		TaskManager.PushFront(task,function(){
			if(task.warningSound) _warningSound.play();
		});
		return task;
		
		
	} 
	
	
	
	public function thiWindowTask():Task{
		var task:EZThiWindowTask = new EZThiWindowTask();
		var isOver:boolean = false;
		
		task.init = function(){
			isOver = false;
			var left:Function = null;
			var mid:Function = null;
			var right:Function = null;
			if(task.leftEnable){
				left = function(){
					task.result = EZThiWindowTask.Result.Left;
					isOver = true;
				};
			
			}
			if(task.midEnable){
				mid = function(){
					task.result = EZThiWindowTask.Result.Mid;
					isOver = true;
				};
			
			}
			
			if(task.rightEnable){
				right = function(){
					task.result = EZThiWindowTask.Result.Right;
					isOver = true;
				};
			
			}
			_thiWindow.window(task.text, task.message, 
				left,
				mid,
				right,
				task.left,
				task.mid,
				task.right
			);
		};
	
		
		task.isOver = function():boolean{
			return  (!_thiWindow.isOpen)||isOver;
		};
		task.shutdown = function(){
			if(_thiWindow.isOpen){
				_thiWindow.close();
			}
		};
		return task;
	}
	
	
	public function windowTask():Task{
		var task:EZWindowTask = new EZWindowTask();
		var isOver:boolean = false;
		
		task.init = function(){
			isOver = false;
			_window.okCancel(task.text, task.message, 
				function(){
					task.okOrCancel = true;
					isOver = true;
				},
				function(){
					task.okOrCancel = false;
					isOver = true;
				},
				task.ok,
				task.cancel
			);
		};
		task.isOver = function():boolean{
			return isOver;
		};
		task.shutdown = function(){
			_window.close();
		};
		return task;
	}
	
	public function doloadTask():Task{
		var task:EZDoLoadTask = new EZDoLoadTask();
		var over:boolean = false;
		task.init = function(){
			over = false;
			var tl:TaskList = new TaskList();
			var loading:EZLoadingTask = loadingTask();
			loading.time = 0.3;
			loading.alpha = 0.5;
			loading.text = task.text;//
			
			tl.push(loading);
			
			tl.push(task.task);
			
			
			var loaded:EZLoadedTask = loadedTask();
			loaded.time = 0.3;  
			
			TaskManager.PushBack(task.task, function(){
			});
			tl.push(loaded);
			TaskManager.PushBack(loaded, function(){
			});
			TaskManager.PushBack(tl, function(){
				over = true;
			});
			TaskManager.Run(tl);
		};
	
		task.isOver = function():boolean{
//			Debug.Log(isOver);
			return over;
		};
		task.shutdown = function(){
			Debug.Log("?????");
		};
		return task;
		
	}
	
	
	
	
	public static function GetInstance():EZGlobalUI{
		return instance_;
	}
	
}