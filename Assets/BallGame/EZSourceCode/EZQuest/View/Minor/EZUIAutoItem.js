#pragma strict
class EZUIAutoItem extends MonoBehaviour{

	public var _background:UISprite = null;
	private var objs_:List.<EZUIAutoItemUnitInterface> = new List.<EZUIAutoItemUnitInterface>();
	public var _method:GeekTweener.Method = GeekTweener.Method.Linear;
	public var _allTime:float = 0.3;
	public var _uiTable:UITable = null;
	
	private var scale_:Vector3;
	private var isfold_:boolean = true;
	
	private var temp:boolean = false;
	private var unfold_:Function = null;
	private var fold_:Function = null;
	
	public function set unfold(value:Function){
		unfold_ = value;
	}
	public function set fold(value:Function){
		fold_ = value;
	}
	public function Awake(){
		scale_ = _background.transform.localScale;
	}
	public function clearObj(){
		objs_.Clear();
	}

	public function addObj(obj:EZUIAutoItemUnitInterface){
		objs_.Add(obj);
	}

	
	public function get isFold():boolean{
		return isfold_;
	}

	
	public function unfoldOneTask(unit:EZUIAutoItemUnitInterface, time:float):Task{
		var task:Task = new Task();
		var ts:GeekTweenScale = null;
		task.init = function(){
			unit.gameObject.SetActive(true);
			if(_uiTable)
				_uiTable.Reposition();
			var bounds:Bounds  = NGUIMath.CalculateRelativeWidgetBounds(this.gameObject.transform);
			unit.gameObject.SetActive(false);
			ts = GeekTweenScale.Begin(_background.gameObject, time, new Vector3(scale_.x, bounds.extents.y *2, scale_.z));
			ts.method = _method;
		};
		
		task.shutdown = function(){
			unit.setAlpha(0.0f);
			unit.gameObject.SetActive(true);
			TaskManager.Run(unit.alphaTask(1.0f, 0.2f));
		};
		
		task.isOver = function():boolean{
			if(ts && ts.enabled){
				return false;
			}
			return true;
		};
		
		return task;
	}
	public function unfoldTask():Task{
		var task:Task = new Task();
		var isOver:boolean = false;
		task.init = function(){
			
			isOver = false;
			var tl:TaskList = new TaskList();
			for(var i:int = 0; i<objs_.Count; ++i){
				tl.push(this.unfoldOneTask(objs_[i], _allTime/objs_.Count));
			}
			TaskManager.PushBack(tl, function(){
				isOver = true;
				isfold_ = false;
			});			
			TaskManager.Run(tl);
		};
		task.shutdown = function(){
			if(this.unfold_){
				this.unfold_();
			}
		};
		task.isOver = function():boolean{
			return isOver;
		};
		return task;
	}
	
	

	public function foldOneTask(unit:EZUIAutoItemUnitInterface, time:float):Task{
		var task:Task = unit.alphaTask(0.0f, 0.1f);
		TaskManager.PushBack(task, function(){
			unit.gameObject.SetActive(false);
		});
		return task;
	}
	public function backTask(time:float):Task{
		var task:Task = new Task();
		var ts:GeekTweenScale = null;
		task.init = function(){
			ts = GeekTweenScale.Begin(_background.gameObject, time, scale_);
			ts.method = _method;
		};
	
		task.isOver = function():boolean{
			if(ts && ts.enabled){
				return false;
			}
			return true;
		};
		
		return task;
	}
	
	public function foldTask():Task{
		var task:Task = new Task();
		var isOver:boolean = false;
		task.init = function(){
			
			if(this.fold_){
				this.fold_();
			}
			isOver = false;
			var tl:TaskList = new TaskList();
			var mt:MultiTask = new MultiTask();
			for(var i:int = 0; i < objs_.Count; ++i){
				mt.push(this.foldOneTask(objs_[i], 0.1));
			}
			tl.push(mt);
			tl.push(this.backTask(0.1));
			TaskManager.PushBack(tl, function(){
				isOver = true;
				isfold_ = true;
			});			
			TaskManager.Run(tl);
		};
		
		task.isOver = function():boolean{
			return isOver;
		};
		
		return task;
	}
	
}