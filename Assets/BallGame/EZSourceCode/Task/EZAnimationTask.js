#pragma strict

class EZAnimationTask extends Task{
	
	private var callback_:Function = null;
	public var close1:Function = null;
	public var close:Function = null;
	public var pose:Function = null;
	private var over_:boolean = false;
	public function set over(value:boolean){
		over_ = value;
	}
	public function get over():boolean{
		return over_;
	}
	public var setShifting:Function = null;
	public function setCallback(callback:Function){
		this.callback_ = callback;
	}
	public function get callback():Function{
		return this.callback_;
	}

}