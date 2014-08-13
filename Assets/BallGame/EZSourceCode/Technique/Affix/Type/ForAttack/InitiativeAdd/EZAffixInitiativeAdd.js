#pragma strict

class EZAffixInitiativeAdd extends EZAffix{ 
	
	public function setup(info:JsonData.JsonPack){
		super.setup(info);
		
	
	} 
	
	
	
	public function clone():EZAffix{
		var affix:EZAffixInitiativeAdd = new EZAffixInitiativeAdd();
		this.clone(affix); 
		
		return affix;
	}

	protected function execute(context:EZAffixContext){
		
			
		var fsc:EZContainer = EZContainerManager.GetContainer(context.from) as EZContainer; 
		var initiative:boolean = fsc.initiative;
		if(initiative){
			context.root.setFlickerSpeed(context.from);
		}
		var getMagic:Function = context.root.getMagic;

		context.root.getMagic = function(seat:EZSoul.Seat):float{  
			var m:float = getMagic(seat);
		
			if(initiative && !context.root.blockPhysics){
				var p:float = context.root.physics(seat);
				var l:float = this.level[this.lv];
				return (m + p*l);
			}else{
				return m;
			}
		};
	}
};