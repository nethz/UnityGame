#pragma strict

class EZAffixInitiativePong extends EZAffix{ 
	
	public function setup(info:JsonData.JsonPack){
		super.setup(info);
		
	
	} 
	
	
	
	public function clone():EZAffix{
		var affix:EZAffixInitiativePong = new EZAffixInitiativePong();
		this.clone(affix); 
		
		return affix;
	}

	
	protected function execute(context:EZAffixContext){
		var fsc:EZContainer = EZContainerManager.GetContainer(context.from) as EZContainer; 
		var initiative:boolean = fsc.initiative;
		
		if(initiative){
			context.root.setFlickerSpeed(context.from);
			var actioning:Function = context.root.actioning;
			context.root.actioning = function(seat:EZSoul.Seat){
				
				if(actioning){
					actioning(seat);
				}
				
				if(!context.root.blockPhysics){
					var data:EZTechDataValue = new EZTechDataValue();
					data.type = "attack";
					data.target =  EZTarget.Target.FrontRandom;
				
					data.magic = function(seat:EZSoul.Seat):float{
						var p:float = context.root.physics(seat);
						var l:float = this.level[this.lv];
						return (p*l);
					};
					
					data.physics = function(seat:EZSoul.Seat):float{
						return 0;
					};
					
					
					data.times = function():int{
						return 1;
					};
					context.root.addNext(data);
				}
				
			};
		
		}
		
	}
};