#pragma strict

class EZBuffCrystalCorselet extends EZBuff{
	public var _round:int = 0;
	private var shield_:float = 0;
	
	public function setup(info:JsonData.JsonPack, context:EZAffixContext, seat:EZSoul.Seat){
		
		super.setup(info, context, seat);
		_round = info.toInt("round");
		
		var soul:EZSoul = EZContainerManager.GetSoul(EZSoul.Seat.WeBattle) as EZSoul;  
		
		//shield_ = (soul.baseMaxHealth - soul.health) * info.toFloat("coefficient");
		var v:float = 1.0f;
	 	if(this.lv_ >= 0 && this.lv_ <= this.level_.Length){
	 		v = this.level_[this.lv_];
	 	}
		//shield_ = Mathf.Round(shield_ * v);
		this.data_.number = _round + 1;
		this.data_.val = v;//shield_;
	}
	public function get shieldValue():float{
		return shield_;
	}
	
	public function shielding(hurt:float):float{
		flicker = true;
		if(shield_ > hurt){
			return 0;
		}else{
			return hurt - shield_;
		}
	}
	
	public function shielded(hurt:float):float{
		
		var ret:float = 0;
		if(shield_ > hurt){
			shield_ -= hurt;
		}else{
			ret =  hurt - shield_;
			shield_ = 0;
		}
		return ret;
	}
	
	
	
	
	public function doActioned(){
		if(shield_ == 0){
			close = true;
		}
	
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