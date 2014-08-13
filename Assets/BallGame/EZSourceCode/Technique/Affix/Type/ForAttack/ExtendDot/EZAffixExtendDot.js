#pragma strict

class EZAffixExtendDot extends EZAffix{

	private var info_:JsonData.JsonPack;
	public function setup(info:JsonData.JsonPack){ 
		super.setup(info);
		info_ = info;
	} 
	
	
	
	public function clone():EZAffix{
		var affix:EZAffixExtendDot = new EZAffixExtendDot();
		this.clone(affix); 
		return affix;
	}
	protected function execute(context:EZAffixContext){
		
		context.root.doubleDot  = this.level[this.lv];
		
		
		
		
	}
	
}