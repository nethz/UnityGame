#pragma strict

class EZSkillProperty{
	
	
	
	
	private var skill_:EZTechnique = null;
	private var info_:JsonData.TechInfo = null;
	public function get skill():EZTechnique{
		return skill_;
	}
	
	public function get info():JsonData.TechInfo{
		return info_;
	}
	
	
	public function hasTech():boolean{
		
		var affixes_:EZAffix[] = skill_.affixes;
		if(affixes_ && affixes_.Length > 1){
			return true;
		}	
		return false;
	
	}
		
	
	public function load(data:JsonData.SkillProperty, base:JsonData.BaseProperty){
		info_ = data.tech;
		
		var setup:JsonData.Setup = EZSetupTable.GetInstance().data;
		this.skill_ = EZTechniqueManager.instance().create(data.tech, setup.affix.skill(base.lv));
	}
	
};