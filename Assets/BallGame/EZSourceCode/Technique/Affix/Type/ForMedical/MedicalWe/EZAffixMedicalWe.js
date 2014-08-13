#pragma strict

class EZAffixMedicalWe extends EZAffix{
	public function setup(info:JsonData.JsonPack){ 
		super.setup(info);
		
	} 
	
	
	
	public function clone():EZAffix{
		var affix:EZAffixMedicalWe = new EZAffixMedicalWe();
		this.clone(affix); 
		return affix;
	}
	protected function execute(context:EZAffixContext){
		  
		  
		  
		  
		var getPhysics:Function = context.root.getPhysics;
		context.root.getPhysics = function(seat:EZSoul.Seat):float{  
			var p:float = getPhysics(seat);
			p += this.level[this.lv];
			return p;
		};
		
		
		var toPrepare:Function = context.root.toPrepare;
		context.root.toPrepare = function(ad:EZTechData){
			if(toPrepare){
				toPrepare(ad);
			}
			if(ad.target == EZTarget.Target.SelfBattle || ad.target == EZTarget.Target.Self){
				if(ad.type == "medical" || ad.type == "bind"){
					ad.target = EZTarget.Target.We;
				}
			}
		};
		
		
		
	
	}
}