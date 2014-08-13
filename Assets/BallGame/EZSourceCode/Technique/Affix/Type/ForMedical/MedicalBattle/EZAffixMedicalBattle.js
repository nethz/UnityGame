#pragma strict

class EZAffixMedicalBattle extends EZAffix{
	public function setup(info:JsonData.JsonPack){ 
		super.setup(info);
		
	} 
	
	
	
	public function clone():EZAffix{
		var affix:EZAffixMedicalBattle = new EZAffixMedicalBattle();
		this.clone(affix); 
		return affix;
	}
	protected function execute(context:EZAffixContext){
		  
		/*var getPhysics:Function = context.root.getPhysics;
		context.root.getPhysics = function(seat:EZSoul.Seat):float{  
			var p:float = getPhysics(seat);
			if(seat == EZSoul.Seat.WeBattle || seat == EZSoul.Seat.FoeBattle){
				p += this.level[this.lv];
			
			}
			return p;
		};
		*/
		var getMagic:Function = context.root.getMagic;
		context.root.getMagic = function(seat:EZSoul.Seat):float{  
		
			var m:float = getMagic(seat);
			if(seat == EZSoul.Seat.WeBattle || seat == EZSoul.Seat.FoeBattle){
				var p:float = context.root.physics(seat);
				var l:float = this.level[this.lv];
				return (m + p*l);
			}
			return m;
		
			
		};
	
	}
}