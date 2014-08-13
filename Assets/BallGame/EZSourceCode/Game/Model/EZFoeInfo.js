#pragma strict

class EZFoeInfo extends MonoBehaviour{
		
	public var dropQuality_:int = -1;
	public var info_:String = "";
	public var pop_:String = "";
	
	
	public function set dropQuality(value:int){
		this.dropQuality_  = value;
	}
	
	public function set info(value:String){
		this.info_  = value;
	}
	public function set pop(value:String){
		this.pop_  = value;
	}
	
	
	public function get dropQuality():int{
		return this.dropQuality_;
	}

	public function get info():String{
		return this.info_;
	}
	public function get pop():String{
		return this.pop_;
	}
	
}