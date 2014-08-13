#pragma strict
//this code is old game start introduce!!!!!!!!!!!the new is EZGuideDialogue!!!!
class EZGuideCtrl extends MonoBehaviour{
	public var _camera:EZCameraForward = null;
	//public var _dialogue:EZGuideDialogue = null;
	public var _typer:EZGuideTyper = null;
	public var _select:EZGuideSelect = null;
	public var _puzzle:EZGuidePuzzle = null;
	public var _blackLight:UISprite = null;
	public var _reduce:float = 0.16f;
	public var _forwardIndex:int = 1;
	
	private var hero_:EZGuideHeroData = null;
	private var index_:int = 1;
	
	public function Awake(){ 
		hero_ = new EZGuideHeroData();
	}
	
	/*public function forward(){
		var tl:TaskList = new TaskList();
		var walkTask:Task = _camera.walk();
		tl.push(walkTask);
		TaskManager.PushFront(walkTask,function(){
			_dialogue.showCursor(false);
			_dialogue.clearText();
			if(_dialogue.textIndex >= _dialogue.textLength - 1){
				TweenAlpha.Begin(_blackLight.gameObject,_camera.stepTime,0f);
			}else{
				if(_dialogue.textIndex >= 2){
					TweenAlpha.Begin(_blackLight.gameObject,_camera.stepTime,_blackLight.color.a - _reduce);
				}
			}
			
		});
		tl.push(_dialogue.showTextTask());
		TaskManager.Run(tl);
	}*/
	
	public function forward(){
		var tl:TaskList = new TaskList();
		var walkTask:Task = _camera.walk();
		tl.push(walkTask);
		TaskManager.PushFront(walkTask,function(){
			_typer.showCursor(false);
			_typer.clear();
			if(_typer.index >= _typer.textsLength - 2){
				_camera._footSound.play();
				TweenAlpha.Begin(_blackLight.gameObject,_camera.stepTime,0f);
			}else{
				if(_typer.index >= _forwardIndex){
					_camera._footSound.play();
					TweenAlpha.Begin(_blackLight.gameObject,_camera.stepTime,_blackLight.color.a - _reduce);
				}
			}
		});
		var typeTask:Task = _typer.showTextTask(index_);
		tl.push(typeTask);
		TaskManager.PushBack(typeTask,function(){
			index_++;
		});
		TaskManager.Run(tl);
	}
	
	public function set hero(value:EZGuideHeroData){
		hero_ = value;
	}
	
	public function get hero():EZGuideHeroData{
		return this.hero_;
	}
	
} 