#pragma strict


class EZShiftHurt extends EZShift{
	public var hurt_:float = 100;
	public var oldHealth_:float = 0;
	public var soul_:EZSoul = null;
	public function setup(info:JsonData.JsonPack){
		super.setup(info);
		this.hurt_ = info.toFloat("hurt");
		soul_ = this.gameObject.GetComponent(EZSoul) as EZSoul;
		oldHealth_ = soul_.health;
	}
	public function round(){
		
	}
	
	public function get val():float{
		return hurt_;
	}
	
	public function open(){
		super.open();
		oldHealth_ = soul_.health;
	}
	public function shifted():String{
		if(oldHealth_ - soul_.health >= hurt_){
			return stateName;
		}
		return "";
	}
}