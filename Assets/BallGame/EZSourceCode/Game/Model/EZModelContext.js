#pragma strict

class EZModelContext extends MonoBehaviour{
	public var _countdownfloat = 15;
	private var pause_:boolean = false;
	public var _debug:EZDebugContext = null;
	
	public var _back:EZBack = null;
	
	public function get back():EZBack{
		return _back;
	}
	public function set pause(value:boolean){
		this.pause_ = value;
	}
	public function get pause():boolean{
		return this.pause_;
	}
	public function get countdown():float{
		return _countdownfloat;
	}
	
	
	public var _speedUp:float = 2;
	public function get speedUp():float{
		return _speedUp;
	}
	
	private var count_:int = 0;
	private var attackId_:int = 0;
	private var shiftId_:int = 0;
	private var action_:String = "";
	public function set action(value:String){
		action_ = value;
	}
	public function get action():String{
		return action_;
	}
	public function get count():int{
		return this.count_;
	}
	public function set count(value:int){
		this.count_ = value;
	}
	

	
	
	public function get attackId():int{
		return this.attackId_;
	}
	
	public function set attackId(value:int){
		this.attackId_ = value;
	}
	
	public function get shiftId():int{
		return this.shiftId_;
	}
	public function set shiftId(value:int){
		 this.shiftId_ = value;
	
	}
	public function reset(){
		attackId_ = 0;
		shiftId_ = 0;
	}
	
	
};