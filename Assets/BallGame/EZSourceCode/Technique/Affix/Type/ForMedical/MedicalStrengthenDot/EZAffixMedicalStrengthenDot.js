#pragma strict

class EZAffixMedicalStrengthenDot extends EZAffix{
	public function setup(info:JsonData.JsonPack){ 
		super.setup(info);
	}
	public function clone():EZAffix{
		var affix:EZAffixMedicalStrengthenDot = new EZAffixMedicalStrengthenDot();
		this.clone(affix); 
		return affix;
	}
	protected function execute(context:EZAffixContext){
		context.root.strongDot = this.level[this.lv];
	}
}