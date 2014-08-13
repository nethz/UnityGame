#pragma strict

class EZAffixAttack extends EZAffix{
	private var coefficient_:float = 1;
	public function setup(info:JsonData.JsonPack){ 
		super.setup(info);
		coefficient_ = info.toFloat("coefficient");
	} 
	
	
	
	public function clone():EZAffix{
		var affix:EZAffixAttack = new EZAffixAttack();
		this.clone(affix); 
		affix.coefficient_ = this.coefficient_;
		return affix;
	}
	public function args(context:EZAffixContext):Hashtable{ 
		//Debug.Log(attack);
		return ;
	}
	protected function execute(context:EZAffixContext){
		var data:EZTechDataRoot = new EZTechDataRoot();
		data.type = "attack";
		data.power = context.power;
		var attack:float = context.power * context.attack * coefficient_ * this.level[this.lv];
		data.original = attack;
		
		
		
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