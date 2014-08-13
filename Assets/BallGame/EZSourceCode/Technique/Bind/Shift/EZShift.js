#pragma strict

class EZShift extends MonoBehaviour{ 
	public var _soul:EZSoul = null;
	public var _stateName:String = ""; 
	public var _effect:String = "";
	
	public function get number():int{
		return 99;
	}
	public function get val():float{
		return 99.0;
	}
	public function Awake(){
		_soul = this.gameObject.GetComponent(EZSoul) as EZSoul;
	}
	public function open(){
		this.enabled = true;
	}
	public function close(){
		this.enabled = false;
	}
	public function setup(info:JsonData.JsonPack){
		this._stateName = info.toString("state");
		if(info.hasKey("effect")){
			_effect = info.toString("effect");
		}
	}
	
	public function get effect():String{
		return _effect;
	}
	
	public function get stateName():String{
		 return _stateName;
	} 
	public function shifted():String{
		return "";
	}
	
}