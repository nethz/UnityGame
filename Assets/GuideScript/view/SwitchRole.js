#pragma strict

class SwitchRole extends MonoBehaviour{
	public var _boy:GameObject = null;
	public var _girl:GameObject = null;
	public var _focusBoyPos:Vector3 = Vector3.zero;
	public var _focusGirlPos:Vector3 = Vector3.zero;
	public var _hlMethod:GeekTweener.Method;
	public var _switchTime:float = 0.5f;
	public var _oldScal:Vector3 = Vector3.one;
	public var _btnOK:UIImageButton = null;
	public var _heroBoy:EZGuideHero = null;
	public var _heroGirl:EZGuideHero = null;
		
	private var sex_:boolean = true;
	private var _isShow:boolean = true;
	private var _oldPosBoy:Vector3 = Vector3.zero;
	private var _oldScalBoy:Vector3 = Vector3.zero;
	private var _oldPosGirl:Vector3 = Vector3.zero;
	private var _oldScalGirl:Vector3 = Vector3.zero;
	private var bodyBoy_:EZHero = null;
	private var bodyGirl_:EZHero = null;
	
	public function Awake(){
		_btnOK.isEnabled = false;
		_oldPosBoy = _boy.transform.localPosition;
		_oldScalBoy = _boy.transform.localScale;
		_oldPosGirl = _girl.transform.localPosition;
		_oldScalGirl = _girl.transform.localScale;
	}
	
	public function loadHero():Task{
		var tl:TaskList = new TaskList();
		tl.push(_heroGirl.loadTask("girl"));
		tl.push(_heroBoy.loadTask("boy"));
		var bodyTask:Task = new Task();
		var bodyIsOver:boolean = false;
		bodyTask.init = function(){
			bodyGirl_ =  _heroGirl.GetComponentInChildren(EZHero) as EZHero;
			bodyBoy_ =  _heroBoy.GetComponentInChildren(EZHero) as EZHero;
			bodyIsOver = true;
		};
		bodyTask.isOver = function(){
			return bodyIsOver;
		};
		tl.push(bodyTask);
		var turnTask:Task = new Task();
		var turnIsOver:boolean = false;
		turnTask.init = function(){
			bodyGirl_.body.flipHorizintal(true);
			turnIsOver = true;
		};
		turnTask.isOver = function(){
			return turnIsOver;
		};
		tl.push(turnTask);
		/*var poseTask:Task = new Task();
		var poseIsOver:boolean = false;
		poseTask.init = function(){
			bodyBoy_.post("stop");
			bodyGirl_.post("stop");
			poseIsOver = true;
		};
		poseTask.isOver = function(){
			return poseIsOver;
		};
		tl.push(poseTask);*/
		return tl;
	}
	
	/*public function stopHero():Task{
		var poseTask:Task = new Task();
		var poseIsOver:boolean = false;
		poseTask.init = function(){
			bodyBoy_.post("stop");
			bodyBoy_.body.pose("idle");
			bodyGirl_.post("stop");
			bodyGirl_.body.pose("idle");
			poseIsOver = true;
		};
		poseTask.isOver = function(){
			return poseIsOver;
		};
		return poseTask;
	}*/
	
	public function set show(value:boolean){
		_isShow = value;
		refresh();
	}
	
	private function refresh(){
		if(_isShow){
			
		}else{
			
		}
	}
	
	public function get heroSex():boolean{
		return sex_;
	}
	
	public function switchSex(isBoy:boolean){
		_btnOK.isEnabled = true;
		sex_ = isBoy;
		var tp:GeekTweenPosition = null;
		var ts:GeekTweenScale = null;
		if(isBoy){
			//in
			tp = GeekTweenPosition.Begin(_boy,_switchTime,_focusBoyPos);
			ts = GeekTweenScale.Begin(_boy,_switchTime,Vector3.one);
			tp.method = _hlMethod;
			ts.method = _hlMethod;
			//out
			tp.Begin(_girl,_switchTime,_oldPosGirl);
			ts.Begin(_girl,_switchTime,_oldScalGirl);
			bodyBoy_.post("idle");
			bodyGirl_.post("stop");
			bodyGirl_.body.pose("idle");
		}else{
			//in
			tp = GeekTweenPosition.Begin(_girl,_switchTime,_focusGirlPos);
			ts = GeekTweenScale.Begin(_girl,_switchTime,Vector3.one);
			tp.method = _hlMethod;
			ts.method = _hlMethod;
			//out
			tp.Begin(_boy,_switchTime,_oldPosBoy);
			ts.Begin(_boy,_switchTime,_oldScalBoy);
			bodyBoy_.post("stop");
			bodyBoy_.body.pose("idle");
			bodyGirl_.post("idle");
		}
	}
	

}