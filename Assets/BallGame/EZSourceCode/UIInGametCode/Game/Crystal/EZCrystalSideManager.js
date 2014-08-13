#pragma strict
/*
class EZTaskCloseable extends Task{
	public var close:Function = null;

}*/
class EZCrystalSideManager extends MonoBehaviour{
	public var _ctrl:EZCrystalSideCtrl = null;
	
	//public var _button:EZCrystalWebButton = null;
	private var fsm_:FSM = new FSM();
	public function Awake(){
		_ctrl._button.enabled = false;
		fsm_.addState("normal", new EZCrystalSideNormalState(_ctrl), "");
		fsm_.addState("filled", new EZCrystalSideFilledState(_ctrl, 3), "");
		fsm_.addState("touch", new EZCrystalSideTouchState(_ctrl), "");
		fsm_.addState("web", new EZCrystalSideWebState(_ctrl, 1), "");
		fsm_.init("normal");
	}
	
	public function down(){
		fsm_.post("down");
	}
	
	public function reset(){
		fsm_.post("reset");
	}
	public function web(){
		fsm_.post("web");
	}
	public function up(){
		fsm_.post("up");
	}
	public function filled(){
		Debug.LogWarning("!!!!!!!! + filled");
		//fsm_.post("filled");
		_ctrl.filled = true;
	}
	public function Start(){
	}
	public function Update(){
		fsm_.update(Time.deltaTime);
	}
	public function flyTask(time:float):Task{
		var tl:TaskList = new TaskList();
		var one = new Task();
		var tv:GeekTweenValue = null;
		one.init = function(){
		
			_ctrl._addCrystal.play();
			_ctrl._sprite.color = _ctrl._flyColor;
			_ctrl._sprite.fillDirection = UISprite.FillDirection.Vertical;
			
			_ctrl._sprite.invert = false;
			tv = GeekTweenValue.Begin(_ctrl._sprite.gameObject, time/2, 1.0f, 0.0f, this.gameObject, "fly");
			
		};
		
		one.isOver = function():boolean{
			if(tv && tv.enabled){
				return false;
			}
			return true;
		};
		one.shutdown = function(){
			tv = null;
		};
		tl.push(one);
		
		var two = new Task();
		
		two.init = function(){
			
			_ctrl._sprite.invert = true;
			tv = GeekTweenValue.Begin(_ctrl._sprite.gameObject, time/2, 0.0f, 1.0f, this.gameObject, "fly");
		};
		
		two.isOver = function():boolean{
			if(tv && tv.enabled){
				return false;
			}
			return true;
		};
		two.shutdown = function(){
			tv = null;
		};
		tl.push(two);
		return tl;	
	
	}
	
	
	public function fly(degree:float){
		degree = Mathf.Clamp01(degree);
		_ctrl._sprite.fillAmount = 1.0f - degree;
	}
	

}