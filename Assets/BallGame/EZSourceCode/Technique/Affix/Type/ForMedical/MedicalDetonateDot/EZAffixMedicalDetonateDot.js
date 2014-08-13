#pragma strict
class EZAffixMedicalDetonateDot extends EZAffix{
	public function setup(info:JsonData.JsonPack){ 
		super.setup(info);
	} 
	
	
	
	public function clone():EZAffix{
		var affix:EZAffixMedicalDetonateDot = new EZAffixMedicalDetonateDot();
		this.clone(affix); 
		return affix;
	}
	
	protected function execute(context:EZAffixContext){
		
		var getMagic:Function = context.root.getMagic;
		context.root.getMagic = function(seat:EZSoul.Seat):float{  
			var m:float = getMagic(seat);
			
			var soul:EZSoul = EZContainerManager.GetSoul(seat) as EZSoul;  
		
			var handler:EZDotHandler = soul.getDotHandler();
			handler.refresh();
			var a:float = handler.medical;
			handler.medicalClear(); 
			var l:float = this.level[this.lv];
			return (m + a*l);
		};
		
		
	}

};

