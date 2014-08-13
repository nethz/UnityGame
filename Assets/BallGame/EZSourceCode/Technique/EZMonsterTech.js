#pragma strict

class EZMonsterTech{
	private var begin_:int = 0;
	private var beginPower_:int = 0;
	private var cd_:int = 0;
	private var allPower_:float = 0;
	private var power_:int = 0;
	private var attack_:EZTechnique = null;
	private var magic_:EZTechnique = null;
	private var active_:boolean = false;
	private var round_: int = 0;
	private var powerUP_:boolean = false;
	private var type_: EZCalculatorAction.Type = EZCalculatorAction.Type.Magic;
	
	public function hasMagic():boolean{
		if(magic_){
			var affixes_:EZAffix[] = magic_.affixes;
			if(affixes_ && affixes_.Length > 0){
				return true;
			}
		}
		return false;
	
	}
	
	public function hasSkill(){
		return false;
	}
	public function get allPower():float{
		return allPower_;
	}
	public function doIt():EZCalculatorAction.Type{
		if(hasMagic() && powerUP_){
			powerUP_ = false;
			this.power_ ++;
			if(power_ ==  allPower_+1){
				power_ = 0;
			}
		}
		return type_;
	}
	public function get power():float{
		return power_;
	}
	public function get attack():EZTechnique{
		return attack_;
	}
	
	
	public function get magic():EZTechnique{
		if(hasMagic())
			return magic_;
		return null;
	}
	//public function get begin():int{
	//	return begin_;
	//}
	public function get cd():int{
		return cd_;
	}
	public function get time():int{
		
		if(round_ == 0){
			if(begin_ < 0){
				return (cd_ - round_);
			}
			return 0;
		}
		return (cd_ - round_);
	}
	public function reset(){
		round_ = begin_;
		powerUP_ = false;
		power_ = beginPower_;
		
	}
	
	public function thinking(){
		active_ = false; 
		++round_;
		if(round_ >= cd_){
			
			round_ = 0;
			active_ = true;
			if(begin_ < 0){
				begin_ = 0;
			}
			if(hasMagic()){
				powerUP_ = true;
				if(power_ == allPower_){
					type_ = EZCalculatorAction.Type.Magic;
				}else{
					type_ = EZCalculatorAction.Type.Attack;
				}
			}else{
				type_ = EZCalculatorAction.Type.Attack;
			}
			
			
		}
	}
	public function get active():boolean{
		return active_;
	}
	
	public function get type():EZCalculatorAction.Type{
		return type_;
	}
	public function load(data:JsonData.MonsterTech){
		begin_ = data.begin;
		beginPower_ = data.beginPower;
		cd_ = data.cd;
		allPower_ = data.power;
		if(data.attack){
			attack_ = EZTechniqueManager.instance().create(data.attack);
			
		}
		
		
		if(data.magic){
			magic_ = EZTechniqueManager.instance().create(data.magic);
		}
		
	}
	

}