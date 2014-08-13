#pragma strict

class EZPetSoul extends EZSoulBase{

	private var magicProp_:EZMagicProperty = new EZMagicProperty();
	private var skillProp_:EZSkillProperty = new EZSkillProperty();
	private var attack_:EZTechnique = null;

	private var info_:JsonData.Soul = null;
	public function get info():JsonData.Soul{
		return info_;
	}
	public static function Create(data:JsonData.Soul):EZPetSoul{
		
		var obj:GameObject = EZSoul.CreateGameObject();
		var soul:EZPetSoul = obj.AddComponent("EZPetSoul") as EZPetSoul;
		soul.load(data);
		obj.name = soul.style;
		return soul;
	}	
	
	public function get alive():boolean{
		if(!this.appear(EZCtrl.index)){
			return false;
		}
		return super.alive;
	}
	//public function appear(i:int):boolean{
	//	if(i!=0){
	//		return true;
	//	}
	//	return seat == EZSoul.Seat.WeBattle;
	//}
	private function load(data:JsonData.Soul){
		info_ = data;
		loadBase(data.baseProp);
		loadNature(data.natureProp);
		loadAppear(data.appear);
		this.magicProp_.load(data.magicProp, data.baseProp);
		this.skillProp_.load(data.skillProp, data.baseProp);
	}
	public function hasSkill():boolean{
		return this.skillProp_.hasTech();
	}
	public function hasMagic():boolean{
		return this.magicProp_.hasTech();
	}
	
	private function get magicProperty():EZMagicProperty{
		return this.magicProp_;
	} 
	
	
	private function get skillProperty():EZSkillProperty{
		return this.skillProp_;
	}
	
	
	
	public function get skillInfo():JsonData.TechInfo{  
		return skillProperty.info; 
	}  
	
	
	
	public function get magicInfo():JsonData.TechInfo{  
		return skillProperty.info; 
	} 
	
		
	public function get attack():EZTechnique{
		if(attack_ == null){
			attack_ = skillProperty.skill.getAttack();
		}
		return attack_;
	}
		
	public function get skill():EZTechnique{
		return skillProperty.skill;
	}
	
	public function get magic():EZTechnique{
		return magicProperty.magic;
	}
	
	public function get magicMaxPower():float{  
		return magicProperty.maxPower;
	} 
	
}