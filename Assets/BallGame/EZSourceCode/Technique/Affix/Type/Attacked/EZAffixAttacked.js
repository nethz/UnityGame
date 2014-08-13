#pragma strict

class EZAffixAttacked extends EZAffix{
	private var coefficient_:float = 1;
	private var step_6_:float = 0;
	private var step_12_:float = 0;
	private var step_18_:float = 0;
	//private var level_:float[] = null;
	public function setup(info:JsonData.JsonPack){ 
		super.setup(info);
		coefficient_ = info.toFloat("coefficient");
		step_6_ = info.toFloat("step_6");
		step_12_ = info.toFloat("step_12");
		step_18_ = info.toFloat("step_18");
	} 
	
	
	
	public function clone():EZAffix{
		var affix:EZAffixAttacked = new EZAffixAttacked();
		this.clone(affix); 
		affix.coefficient_ = this.coefficient_;
		affix.step_6_ = this.step_6_;
		affix.step_12_ = this.step_12_;
		affix.step_18_ = this.step_18_;

		return affix;
	}

	protected function execute(context:EZAffixContext){
		var data:EZTechDataRoot = new EZTechDataRoot();
		data.type = "attack";
		var l:float = this.level[this.lv];
		var s:float = this.step_18_;
		if(context.power <=6){
			s = this.step_6_;
		}else if(context.power <=12){
			s = this.step_12_;
		}
		var attack:float = l * s * context.power * coefficient_ * context.attack;
		data.original = attack;
		//data.times = 1;
		
		
		var soul:EZSoul = EZContainerManager.GetSoul(context.from);
		var type:Geek.MagicType = soul.type;
	
		data.elements = function(seat:EZSoul.Seat):float{
			var to:EZSoul = EZContainerManager.GetSoul(seat) as EZSoul;
			if(Geek.Neutralize(type, to.type)){
				return 1.5f;
			}else if(Geek.Reinforce(type, to.type)){
				return 0.66666f;
			} 
			return 1f;
		};
		
		
		context.root = data; 
		
		
	}

};