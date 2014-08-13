#pragma strict
class EZWindowArrowNormalState extends StateWithEventMap{
	private var sprite_:UISprite;
	private var time_:float = 0;
	private var show_:boolean = true;
	
	function EZWindowArrowNormalState(sprite:UISprite){
		sprite_ = sprite;
		addEvent("down", "touch");
		
	}
	public function start(){
		time_ = 0;
		show_ = true;
	}
	public function update(d:float){
		time_ += d;
		if(time_ > 0.5){
			time_ = 0;
			show_ = !show_;
			if(show_){
				sprite_.color.a = 0;
			}else{
				sprite_.color.a = 1;
			}
		}
	}
	public function over(){
		sprite_.color.a = 1;
	}
}
class EZWindowArrowTouchState extends StateWithEventMap{
	private var sprite_:UISprite;
	private var touch_:UISprite;
	private var callback_:Function;
	
	function EZWindowArrowTouchState(sprite:UISprite, touch:UISprite, callback:Function){
		addEvent("up", "normal");
		sprite_ = sprite;
		touch_ = touch;
		touch_.color.a = 0;
		callback_ = callback;
	}
	public function start(){
		
		sprite_.color.a = 0;
		touch_.color.a = 1;
	
	}
	public function over(){
	
		touch_.color.a = 0;
		sprite_.color.a = 1;
		if(callback_){
			callback_();
		}
		
	}
	
}
class EZWindowArrow extends MonoBehaviour{


	private var callback_:Function;
	public function set callback(value:Function){
		callback_ = value;
		
	}
	public var _pressSound:EZSound = null;
	public var _sprite:UISprite;
	public var _touch:UISprite;
	private var fsm_:FSM = new FSM();
	public function Start(){
		fsm_.addState("normal", new EZWindowArrowNormalState(_sprite), "");
		fsm_.addState("touch", new EZWindowArrowTouchState(_sprite, _touch, this.onCallback), "");
		fsm_.init("normal");
	}
	private function onCallback(){
		if(callback_){
			callback_();
		}
	
	}
	public function Update(){
		if(fsm_){
			fsm_.update(Time.deltaTime);
		}
	}
	public function close(){
		up();
		_sprite.enabled = false;
	}
	public function open(){
		_sprite.enabled = true;
	}
	public function up(){
		if(_sprite.enabled){
			fsm_.post("up");
		}
	}
	
	public function down(){
		if(_sprite.enabled)
		{
			_pressSound.play();
			fsm_.post("down");
		}
	}
	
	
}