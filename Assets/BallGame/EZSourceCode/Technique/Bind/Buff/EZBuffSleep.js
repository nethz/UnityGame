#pragma strict

class EZBuffSleep extends EZBuff{
	public var _round:int = 0;
	public var _hurted:boolean = false;
	
	
	private var step_6_:int = 0;
	private var step_12_:int = 0;
	private var step_18_:int = 0;
	
	
	public function setup(info:JsonData.JsonPack, context:EZAffixContext, seat:EZSoul.Seat){
		super.setup(info, context, seat);
		_hurted = false;
		
		
		if(context.power<= 6){
			_round = info.toInt("step_6");
		}else if(context.power<= 12){
			_round = info.toInt("step_12");
		}else{
			_round = info.toInt("step_18");
		}
		
		this.data_.number = _round + 1;	
		this.data_.val = 0;	
	//	Debug.LogWarning("!!!" + this.data_.number);
		
	}
	public function ignore():boolean{
		flicker = true;
		return true;
	}
	
	public function get hurted():float{
		_hurted = true;
		flicker = true;
		return 0;
	}
	
	public function doActioned(){
		if(_hurted){
			_hurted = false;
			close = true;
		}
	}
	public function doShift(){
		_hurted = false;
		close = true;
		//this.enabled = false;
	}
	public function doRound():boolean{
		--_round;
		this.data_.number = _round + 1;
		if(_round < 0){
			_hurted = false;
			this.close = true;
			return false;
		}
		return true;
	}
	
}