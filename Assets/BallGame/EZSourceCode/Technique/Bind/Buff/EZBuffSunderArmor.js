#pragma strict

class EZBuffSunderArmor extends EZBuff{
	public var _coefficient:float = 0;
	public var _doit:boolean = false;
	
	protected var step_12_:float[] = null;
	protected var step_18_:float[] = null;
	public function setup(info:JsonData.JsonPack, context:EZAffixContext, seat:EZSoul.Seat){
		super.setup(info, context, seat);
		
		
		
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
		
		
		
		var s:float = 0;
		if(context.power <= 6){
			s = level[lv_];
		}else if(context.power <= 12){
			s = step_12_[lv_];
		}else{
			s = step_18_[lv_];
		}
		
		
		
		
		_coefficient =  s;
		data_.val = _coefficient;
		data_.number = -1;
	}
	public function get hurted():float{
		_doit = true;
		flicker = true;
		return _coefficient;
	}
	
	
	
	
	public function doActioned(){
		if(_doit){
			_doit = false;
			close = true;
		}
	}
	
	
	
}