#pragma strict

class EZMonsterSoul extends EZSoulBase{
	private var curTech_:EZMonsterTech = null;
	private var attack_:EZMonsterTech = null;
	private var techs_:EZMonsterTech[] = null;
	private var def_:EZMonsterTech = null;

	//private var context_:EZAffixContext = new EZAffixContext();
	private function load(data:JsonData.Monster){
		loadBase(data.baseProp);  
		loadNature(data.natureProp);  
		
		loadAppear(data.appear);
		def_ = new EZMonsterTech();
		def_.load(data.def);
		if(data.techs && data.techs.Length != 0){
			techs_ = new EZMonsterTech[data.techs.Length];
			for(var i:int = 0; i < techs_.Length; ++i){
				techs_[i] = new EZMonsterTech();
				techs_[i].load(data.techs[i]);
			}
		}
	
		
	}
	
	public static function Create(data:JsonData.Monster):EZMonsterSoul{ 
	 
		var obj:GameObject = EZSoul.CreateGameObject();
		var soul:EZMonsterSoul = obj.AddComponent("EZMonsterSoul") as EZMonsterSoul;
		var ai:EZMonsterInterface = obj.AddComponent("EZMonsterInterface") as EZMonsterInterface;
		ai._soul = soul;
		
		soul.load(data);
		obj.name = soul.style;
		return soul;
		
	}
	
	
	public function get magic():EZTechnique{
	//	if(curTech_)
		//	return curTech_.tech; 
		return null;
	}	
	
	public function get skill():EZTechnique{
		return null;
	} 
	public function get attack():EZTechnique{
		if(attack_)
			return attack_.attack; 
		return null;
	}
	public function thinking(){
		curTech_ = null; 
		attack_ = null; 
		var handler:EZBuffHandler = this.getBuffHandler();
		handler.refresh();
		

		if(techs_){
			for(var i:int = 0; i < techs_.Length; ++i){
				this.techs_[i].thinking();
			}
			
			for(var n:int = 0; n < techs_.Length; ++n){
				if(this.techs_[n].active){
					curTech_ = this.techs_[n]; 
					this.addMagicPower(curTech_.allPower);
					break;
				}
			}   
			
		}
		def_.thinking(); 
		if(this.def_.active){
			this.addAttackPower(def_.allPower);
			attack_ = this.def_;
		}
		
		
		
	} 
	


};
