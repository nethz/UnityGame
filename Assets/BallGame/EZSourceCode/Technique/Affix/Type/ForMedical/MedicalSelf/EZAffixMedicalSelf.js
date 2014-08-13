#pragma strict

class EZAffixMedicalSelf extends EZAffix{
	public function setup(info:JsonData.JsonPack){ 
		super.setup(info);
		
	} 
	
	
	
	public function clone():EZAffix{
		var affix:EZAffixMedicalSelf = new EZAffixMedicalSelf();
		this.clone(affix); 
		return affix;
	}
	protected function execute(context:EZAffixContext){
		  
		  
		  
		  
		var getPhysics:Function = context.root.getPhysics;
		context.root.getPhysics = function(seat:EZSoul.Seat):float{  
			var p:float = getPhysics(seat);
			if(seat == context.from){
				p += this.level[this.lv];
			
			}
			return p;
		};
		/*
		
		var getMagic:Function = context.root.getMagic;
		var getPhysics:Function = context.root.getPhysics;
		context.root.getMagic = function(seat:EZSoul.Seat):float{  
			//var getPhysics:Function = ;
			var p:float = getPhysics(seat);
			var m:float = getMagic(seat);
			
			return m + (p *this.level[this.lv]);
			
			
			
		};
		
		*/
		
		
		var toPrepare:Function = context.root.toPrepare;
		context.root.toPrepare = function(ad:EZTechData){
			if(toPrepare){
				toPrepare(ad);
			}
			if(ad.target == EZTarget.Target.SelfBattle){
				ad.target = EZTarget.Target.Self;
			}
		};
		
		
		
	
	}
}