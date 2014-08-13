#pragma strict

class EZPuzzleDialogueCtrl extends MonoBehaviour{
	public var _bg:UISprite = null;
	public var _dragon:UISprite = null;
	public var _flickerTime:float = 0.2f;
	public var _dragonShowTime:int = 2;
	public var _bigBox:BoxCollider = null;
	public var _cursor:EZGuideCursor = null;
	public var _type:EZGuideTyper = null;
	public var _diamondTyper:EZGuideTyper = null;
	public var _puzzleGameObject:GameObject = null;
	public var _upTime:float = 1f;
	public var _screen:EZScreen = null;
	public var _upOffset:Vector3 = Vector3.zero;
	public var _upOffset5:Vector3 = Vector3.zero;
	public var _readyEndIndex:int = 9;
	public var _getDiamond1:String = "";
	public var _getDiamond2:String = "";
	public var _getDiamond3:String = "";
	public var _metal:String = "";
	public var _wood:String = "";
	public var _water:String = "";
	public var _fire:String = "";
	public var _earth:String = "";
	public var _crystal:String = "";
	
	private var diamondNum_:int = 0;
	private var ballOldPosition_:Vector3 = Vector3.zero;
	
	function Awake(){
		ballOldPosition_ = _puzzleGameObject.transform.localPosition;
		_dragon.color.a = 0f;
	}
	
	public function get typer():EZGuideTyper{
		return this._type;
	}
	
	public function get diamondTyper():EZGuideTyper{
		return this._diamondTyper;
	}
	
	public function get diamondOver():boolean{
		return diamondNum_ >= 6;
	}
	
	public function typerDialogue(index:int,overShowCursor:boolean){
		var task:Task = typer.showTextTask(index);
		TaskManager.PushFront(task,function(){
			_cursor.hide();
		});
		TaskManager.PushBack(task,function(){
			if(overShowCursor){
				_cursor.show();
			}else{
				_cursor.hide();
			}
		});
		TaskManager.Run(task);
	}
	
	public function puzzleUpTask(){
		var task:Task = new Task();
		var tp:TweenPosition = null;
		task.init = function(){
			if(_screen.iPhone5){
				tp = TweenPosition.Begin(_puzzleGameObject,_upTime,ballOldPosition_ + _upOffset5);
			}else{
				tp = TweenPosition.Begin(_puzzleGameObject,_upTime,ballOldPosition_ + _upOffset);
			}
		};
		task.isOver = function(){
			return (tp && !tp.enabled);	
		};
		return task;
	}
	
	public function typerDiamond(type:Geek.MagicType){
		diamondNum_ ++;
		var temp:String = "";
		switch(type){
			case Geek.MagicType.Metal:
				temp = _metal;
			break;
			case Geek.MagicType.Wood:
				temp = _wood;
			break;
			case Geek.MagicType.Water:
				temp = _water;
			break;
			case Geek.MagicType.Fire:
				temp = _fire;
			break;
			case Geek.MagicType.Earth:
				temp = _earth;
			break;
			case Geek.MagicType.Crystal:
				temp = _crystal;
			break;
		}
		if(type == Geek.MagicType.Crystal){
			temp = _getDiamond1 + diamondNum_ + "/6," + temp + _getDiamond3;
		}else{
			temp = _getDiamond1 + diamondNum_ + "/6," + temp + _getDiamond2;
		}
		var text:EZGuideText= new EZGuideText(temp,EZGuideText.Style.LINE,false);
		var task:Task = _diamondTyper.showTextTask(text);
		var tl:TaskList = new TaskList();
		tl.push(task);
		if(diamondOver){
			var wait:EZWaitTask = new EZWaitTask();
			wait.setAllTime(1.5f);
			TaskManager.PushBack(wait,function(){
				_puzzleGameObject.SendMessage("OnBallAction", "over", SendMessageOptions.DontRequireReceiver);
			});
			tl.push(wait);
		}
		TaskManager.Run(tl);
	}
	
	public function goOver(){
		_puzzleGameObject.SendMessage("goOver", "over", SendMessageOptions.DontRequireReceiver);
	}
	
	public function showDragon():Task{
		var tl:TaskList = new TaskList();
		for(var i:int = 0;i <_dragonShowTime;++i){
			tl.push(dragonShowTask());
			tl.push(dragonHideTask());
		}
		return tl;
	}

	private function dragonShowTask():Task{
		var task:Task = new Task();
		var ta:TweenAlpha = null;
		task.init = function(){
			ta = TweenAlpha.Begin(_dragon.gameObject,_flickerTime,1f);
		};
		task.isOver = function(){
			return ta && !ta.enabled;
		};
		return task;
	}
	
	private function dragonHideTask():Task{
		var task:Task = new Task();
		var ta:TweenAlpha = null;
		task.init = function(){
			ta = TweenAlpha.Begin(_dragon.gameObject,_flickerTime,0f);
		};
		task.isOver = function(){
			return ta && !ta.enabled;
		};
		return task;
	}
}