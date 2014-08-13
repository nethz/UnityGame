#pragma strict

class EZAffixNoAttack extends EZAffix{
	
	private var info_:JsonData.JsonPack;
	public function setup(info:JsonData.JsonPack){ 
		super.setup(info);
		info_ = info;
	} 
	
	
	
	public function clone():EZAffix{
		var affix:EZAffixNoAttack = new EZAffixNoAttack();
		this.clone(affix); 
		affix.info_ = this.info_;
		return affix;
	}
	
	protected function execute(context:EZAffixContext){
		context.root.blockPhysics = true;
	}

};

