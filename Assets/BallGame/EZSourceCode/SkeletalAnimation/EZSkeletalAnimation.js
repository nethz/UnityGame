#pragma strict

class EZSkeletalAnimation extends MonoBehaviour{
	
	public var _json:String = "";
	public var _jsonOther:String = "";
	public var _name:String = "";
	public var _debug:boolean = false;
	public var _speed:float = 0.04;
	private var data_:JsonSkeletalAnimation = null;
	public function get animationName():String{
		return _name;
	}
	public function get debug():boolean{
		return _debug;
	}
	
	public function get speed():float{
		return _speed;
	}
	public function get json():String{
		return _json + _jsonOther;
	}
	public function get data():JsonSkeletalAnimation{
		if(data_ == null){
			data_  = JsonSkeletalAnimation.Load(_json + _jsonOther); 
			data_.speed = _speed;
		}
		return data_;
	}
}