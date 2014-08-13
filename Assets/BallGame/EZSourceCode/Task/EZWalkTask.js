#pragma strict

class EZWalkTask extends Task{
	
	private var time_:float = 3;
	private var target_:Vector3;
	private var over_:boolean;
	private var method_:GeekTweener.Method = GeekTweener.Method.Linear;
	public var move:Function = null;
	public function get method():GeekTweener.Method{
		return method_;
	}
	public function set method(value:GeekTweener.Method){
		this.method_ = value;
	}
	public function setTarget(target:Vector3){
		this.target_= target;
	}

	public function set time(value:float){
		time_ = value;
	}
	public function get time():float{
		return time_;
	}
	public function get target():Vector3{
		return target_;
	}
	
	public function get over():boolean{
		return over_;
	}
	public function set over(value:boolean){
		this.over_ = value;
	}
}