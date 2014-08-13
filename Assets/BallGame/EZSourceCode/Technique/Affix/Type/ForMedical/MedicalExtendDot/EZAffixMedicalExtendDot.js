#pragma strict

class EZAffixMedicalExtendDot extends EZAffix{

	private var info_:JsonData.JsonPack;
	public function setup(info:JsonData.JsonPack){ 
		super.setup(info);
		info_ = info;
	} 
	
	
	
	public function clone():EZAffix{
		var affix:EZAffixMedicalExtendDot = new EZAffixMedicalExtendDot();
		this.clone(affix); 
		return affix;
	}
	protected function execute(context:EZAffixContext){
		
		
		context.root.doubleDot  = (1.0f - this.level[this.lv]);
		
		
		
		
		
		
	}
	
}