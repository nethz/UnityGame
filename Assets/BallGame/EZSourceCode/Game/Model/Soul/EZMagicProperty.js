#pragma strict

class EZMagicProperty{
	
	private var maxPower_:float = 10;
	private var magic_:EZTechnique = null;
	
	
	private var info_:JsonData.TechInfo = null;
	public function get info():JsonData.TechInfo{
		return info_;
	}

	
	public function get magic():EZTechnique{
		return magic_;
	}
	public function load(data:JsonData.MagicProperty, base:JsonData.BaseProperty){
	
		info_ = data.tech;
		var setup:JsonData.Setup = EZSetupTable.GetInstance().data;
		Debug.Log(EZTechniqueManager.instance());
		Debug.Log(data);
		Debug.Log(base);
		Debug.Log(setup);
		
		this.magic_ = EZTechniqueManager.instance().create(data.tech, setup.affix.magic(base.lv)); 
		this.maxPower_ = data.maxPower;
	}
	public function hasTech():boolean{
		
		var affixes_:EZAffix[] = magic_.affixes;
		if(affixes_ && affixes_.Length > 0){
			return true;
		}
		return false;
	
	}
	public function get maxPower():float{
		 
		return maxPower_;
	}
	public function set maxPower(value:float){
		maxPower_ = value;
	}
	
};