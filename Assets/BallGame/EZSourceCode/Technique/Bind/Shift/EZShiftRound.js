#pragma strict


class EZShiftRound extends EZShift{
	public var round_:float = 0;
	public var nextRound_:float = 0;
	public var soul_:EZSoul = null;
	public function setup(info:JsonData.JsonPack){
		super.setup(info);
		this.round_ = info.toInt("round");
		soul_ = this.gameObject.GetComponent(EZSoul) as EZSoul;
	}
	
	public function get number():int{
		return nextRound_ - soul_._round;
	}
	
	public function open(){
		super.open();
		nextRound_ = round_+ soul_._round;
	}
	public function shifted():String{
		if(soul_._round >= nextRound_){
			return stateName;
		}
		return "";
	}
}