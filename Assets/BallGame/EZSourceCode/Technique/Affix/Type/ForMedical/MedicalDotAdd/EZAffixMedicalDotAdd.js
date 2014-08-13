#pragma strict

class EZAffixMedicalDotAdd extends EZAffix{
	public function setup(info:JsonData.JsonPack){ 
		super.setup(info);
		
	} 
	
	
	
	public function clone():EZAffix{
		var affix:EZAffixMedicalDotAdd = new EZAffixMedicalDotAdd();
		this.clone(affix); 
		return affix;
	}
	protected function execute(context:EZAffixContext){
		  
		var getMagic:Function = context.root.getMagic;
		context.root.getMagic = function(seat:EZSoul.Seat):float{  
			var m:float = getMagic(seat);
			var to:EZSoul = EZContainerManager.GetSoul(seat) as EZSoul;
			var dotHandler:EZDotHandler = to.getDotHandler();
			dotHandler.refresh();
			if(dotHandler.medical != 0){
				
	       		context.root.flickerBindType(seat, EZBindData.BindType.MedicalDot);
				var p:float = context.root.physics(seat);
				m += p * this.level[this.lv];
			}
			return m;
		};
	
	}
}