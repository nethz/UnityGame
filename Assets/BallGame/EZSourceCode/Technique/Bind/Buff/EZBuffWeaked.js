#pragma strict

class EZBuffWeaked extends EZBuff{


	public var _round:int = 0;
	public var _coefficient:float = 0;
	protected var step_12_:float[] = null;
	protected var step_18_:float[] = null;
	public function setup(info:JsonData.JsonPack, context:EZAffixContext, seat:EZSoul.Seat){
		super.setup(info, context, seat);
		
		
		_round = info.toInt("round");
		
		this.data_.number = _round +1;
		if(info.hasKey("step_12")){
			this.step_12_ = info.toFloatArray("step_12");
		}else{
			this.step_12_ = new float[5];
			for(var i:int =0;i<this.step_12_.length; ++i){
				this.step_12_[i] = 1;
			}
		}
		
		
		if(info.hasKey("step_18")){
			this.step_18_ = info.toFloatArray("step_18");
		}else{
			this.step_18_ = new float[5];
			for(var m:int =0;m<this.step_18_.length; ++m){
				this.step_18_[m] = 1;
			}
		}
		
		
		
		_coefficient = 0;
		if(context.power <= 6){
			_coefficient = level[lv_];
		}else if(context.power <= 12){
			_coefficient = step_12_[lv_];
		}else{
			_coefficient = step_18_[lv_];
		}
		
		data_.val = _coefficient;
		
	}
	
	
	public function hurting(hurt:float):float{
		if(hurt != 0.0f){
			this.flicker = true;
			return _coefficient * hurt;
		}
		return 0.0f;
		
	}
	public function doRound():boolean{
		--_round;
		this.data_.number = _round + 1;
		if(_round < 0){
			this.close = true;
			return false;
		}
		return true;
	}
	
	
}