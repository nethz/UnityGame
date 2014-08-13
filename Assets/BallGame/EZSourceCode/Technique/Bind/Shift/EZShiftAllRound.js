#pragma strict


class EZShiftAllRound extends EZShift{
	public var round_:float = 0;
	
	public var soul_:EZSoul = null;
	public function setup(info:JsonData.JsonPack){
		super.setup(info);
		Debug.LogWarning(JsonData.JsonPack.Save(info));
		this.round_ = info.toInt("allround");
		
		soul_ = this.gameObject.GetComponent(EZSoul) as EZSoul;
	}
	
	public function get number():int{
		return round_ - soul_._round;
	}
	
	
	public function open(){
		super.open();
	}
	public function shifted():String{
		if(soul_._round >= round_){
			return stateName;
		}
		return "";
	}
}