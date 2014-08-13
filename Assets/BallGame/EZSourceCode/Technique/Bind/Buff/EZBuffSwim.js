#pragma strict

class EZBuffSwim extends EZBuff{
	public var _round:int = 0;
	
	private var step_6_:int = 0;
	private var step_12_:int = 0;
	private var step_18_:int = 0;
	
	public function setup(info:JsonData.JsonPack, context:EZAffixContext, seat:EZSoul.Seat){
		super.setup(info, context, seat);
		
		if(context.power<= 6){
			_round = info.toInt("step_6");
		}else if(context.power<= 12){
			_round = info.toInt("step_12");
		}else{
			_round = info.toInt("step_18");
		}
		if(this.data_){
			this.data_.number = _round +1;
		}
	}
	public function ignore():boolean{
	
		flicker = true;
		return true;
	}
	
	
	public function doShift(){
		//this.enabled = false;
		close = true;
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