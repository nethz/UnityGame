#pragma strict

class EZBuffBlood extends EZBuff{
	public var _round:int = 0;
	private var hurt_:float = 0;
	
	public function setup(info:JsonData.JsonPack, context:EZAffixContext, seat:EZSoul.Seat){
		
		super.setup(info, context, seat);
		_round = info.toInt("round");
		
		hurt_ = context.root.physics(seat);
		hurt_ *= this.level[this.lv_];
		
		this.data_.val = hurt_;
		this.data_.number = _round +1;
	}
	public function get blood():float{
		this.flicker = true;
		return hurt_;
	}
	
	
	public function doRound():boolean{
		--_round;
		
		this.data_.number = _round +1;
		if(_round < 0){
			this.close = true;
			return false;
		}
		return true;
	}
	
}