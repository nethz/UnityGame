#pragma strict


class EZDuplicateItemManager  extends MonoBehaviour{
	public var _item:GameObject;
	public var _level:GameObject;
	private var items_:GameObject[];
	public var _oneScreenItems:int = 3;
	public var _spacing:float = 20.0f;
	public var _background:UIDragCamera;
	public var _scrollBar:UISprite;
	private var size_:Vector2;
	private var sizeLevel_:Vector2;
	public var _camera:Camera;
	private var callback_ :Function = null;
	private var isIn_:boolean = false;
	
	
	function Awake(){
		var box:BoxCollider = _item.GetComponent("BoxCollider") as BoxCollider; 
		size_ = box.size;
		var box2:BoxCollider = _level.GetComponent("BoxCollider") as BoxCollider; 
		sizeLevel_ = box2.size;
	
	}

	public function enableDrag(enable:boolean){
		for(var i:int = 0; i < items_.length; ++i){
			var dc:UIDragCamera = items_[i].GetComponent("UIDragCamera") as UIDragCamera;
			dc.enabled = enable;
		}
		_background.enabled = enable;
	}
	private function showScrollBar(isShow){
		if(isShow){
			_scrollBar.alpha = 0.6f;
		}else{
			_scrollBar.alpha = 0;
		}
	}
	public function create(lists:EZDuplicateListModel[]){
		if(lists){
			this.createItem(lists.length);
			
			for(var i:int = 0; i< lists.length; ++i){
				var item:EZDuplicateItem = items_[i].GetComponent(EZDuplicateItem) as EZDuplicateItem;
				if(item){
					item.load(lists[i]);
				}
			}
			
		}
	} 
	
	
	public function create(datas:EZDuplicateLevelData[]){
		if(datas){
			this.createLevel(datas.length);
			
			
				for(var i:int = 0; i< datas.length; ++i){
				var level:EZDuplicateLevel = items_[i].GetComponent(EZDuplicateLevel) as EZDuplicateLevel;
				if(level){
					level.load(datas[i]);
				}
			}
			
			
			
		}
	} 
	
	private function createLevel(num:int)
	{	
		items_ = new GameObject[num];
		for(var i:int = 0; i<num; ++i){
		
			items_[i] = GameObject.Instantiate(_level);
			items_[i].transform.parent = this.transform;
			items_[i].transform.localScale = Vector3.one;
			items_[i].transform.localPosition = Vector3(sizeLevel_.x, - i * (sizeLevel_.y + _spacing) , 0);
			items_[i].SetActive(true);
			items_[i].name = "Item"+i.ToString("D3");
			
		}
		
		if(num <= _oneScreenItems){
			this.enableDrag(false);
			showScrollBar(false);
		}else{
			this.enableDrag(true);
			showScrollBar(true);
		}
		
		//this._table.repositionNow = true;
	}
	
	private function createItem(num:int)
	{	
		items_ = new GameObject[num];
		for(var i:int = 0; i<num; ++i){
		
			items_[i] = GameObject.Instantiate(_item);
			items_[i].transform.parent = this.transform;
			items_[i].transform.localScale = Vector3.one;
			items_[i].transform.localPosition = Vector3(size_.x, - i * (size_.y + _spacing) , 0);
			items_[i].SetActive(true);
			items_[i].name = "Item"+i.ToString("D3");
			
		}
		
		if(num <= _oneScreenItems){
			this.enableDrag(false);
			showScrollBar(false);
		}else{
			this.enableDrag(true);
			showScrollBar(true);
		}
	//	this._table.repositionNow = true;
	}
	public function itemsLayout(){
		if(items_){
			for(var n:int = 0; n< items_.length; ++n){
				items_[n].transform.localPosition.x = 0;
			}
		}
		
		isIn_ = true;
		Debug.Log("go True~");
	}
	public function flyOutFun(item:GameObject, time:float){
		var wait:EZWaitTask = new EZWaitTask();
		wait.setAllTime(time);
		wait.shutdown = function(){
			var tp:TweenPosition = TweenPosition.Begin(item, 0.35, item.transform.localPosition + Vector3(size_.x*2, 0, 0));
			tp.method = UITweener.Method.EaseInOut;
			tp.eventReceiver = this.gameObject;
			tp.callWhenFinished = "flyFinshed";
		};
		
		TaskManager.Run(wait);
	}
	public function flyFinshed(t:UITweener){
		if(callback_){
			callback_();
		}
	}
	
	public function flyInFun(item:GameObject, time:float){
						
		var wait:EZWaitTask = new EZWaitTask();
		wait.setAllTime(time);
		wait.shutdown = function(){
			var tp:TweenPosition = TweenPosition.Begin(item, 0.35, Vector3(0, item.transform.localPosition.y, 0));
			tp.method = UITweener.Method.EaseInOut;
			tp.eventReceiver = this.gameObject;
			tp.callWhenFinished = "flyFinshed";
		};
		TaskManager.Run(wait);
	}
	
	
	public function checkItemInScreen(item:GameObject){
		var screenTop:Vector3 = _camera.ScreenToWorldPoint(Vector3(0,0,0));
		var screenBottom:Vector3 = _camera.ScreenToWorldPoint(Vector3(Screen.width, Screen.height));
		var box:BoxCollider = item.GetComponent("BoxCollider") as BoxCollider;  
		
		var down:float = item.transform.position.y + box.center.y + box.size.y/2;
		var up:float = item.transform.position.y + box.center.y - box.size.y/2;
		
		if(down >= screenTop.y && up <= screenBottom.y){
			return true;
		}
		return false;
	}
	public function fly(fun:Function){
		if(!items_){
			return new Task();
		}
		var task:Task = new Task();
		var objs:Array = new Array();
		var isOver:boolean = false;
		task.init = function(){
	
			for(var n:int = 0; n< items_.length; ++n){
				if(checkItemInScreen(items_[n])){
					objs.push(items_[n]);
				}
			}
			var num:int = 0;
			this.callback_ = function(){
				num++;
				if(num == objs.length){
					isOver = true;
				}
			
			};
			for(var i:int = 0; i< objs.length; ++i){
				fun(objs[i] as GameObject, i* 0.05);
			}
		};
		task.isOver = function():boolean{
			return isOver;
		};
		return task;
	}
	public function flyOut():Task{
		
		return fly(flyOutFun);
	
	}
	public function itemsDestroy(){
		if(items_){
			for(var n:int = 0; n< items_.length; ++n){
				GameObject.DestroyObject(items_[n]);//.transform.localPosition.x = 0;
			}
		}
		
		items_ = null;
		isIn_ = false;
		Debug.Log("go False!~");
	}
	
	
	
	public function flyTask(lists:EZDuplicateListModel[], callback:Function):Task{
		var tl:TaskList = new TaskList();
		if(isIn_){
			var outTask:Task = flyOut() as Task;
			TaskManager.PushBack(outTask, this.itemsDestroy);
			tl.push(outTask);
		}
		
		var inTask:Task = flyIn() as Task;
		TaskManager.PushFront(inTask, function(){
		_camera.transform.position = Vector3.zero;
		callback();
		this.create(lists);
		});
		TaskManager.PushBack(inTask, this.itemsLayout);
		tl.push(inTask);
		return tl;
	}
	
	
	public function flyTask(lists:EZDuplicateLevelData[], callback:Function):Task{
		var tl:TaskList = new TaskList();
		if(isIn_){
			var outTask:Task = flyOut() as Task;
			TaskManager.PushBack(outTask, this.itemsDestroy);
			tl.push(outTask);
		}
		
		var inTask:Task = flyIn() as Task;
		TaskManager.PushFront(inTask, function(){
		_camera.transform.position = Vector3.zero;
		callback();
		this.create(lists);
		});
		TaskManager.PushBack(inTask, this.itemsLayout);
		tl.push(inTask);
		return tl;
	}
	public function flyIn():Task{
		return fly(flyInFun);
	}

}