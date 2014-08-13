#pragma strict

class EZAffixReinforceDotPong extends EZAffix{ 
	
	public function setup(info:JsonData.JsonPack){
		super.setup(info);
		
		
	} 
	
	
	
	public function clone():EZAffix{
		var affix:EZAffixReinforceDotPong = new EZAffixReinforceDotPong();
		this.clone(affix); 
		
		return affix;
	}

	protected function execute(context:EZAffixContext){
		var actioning:Function = context.root.actioning;
		context.root.actioning = function(seat:EZSoul.Seat){
		
			if(actioning){
				actioning(seat);
			}
			if(context.root.blockPhysics){
				return;
			}
			var from:EZSoul = EZContainerManager.GetSoul(context.from) as EZSoul;
			var to:EZSoul = EZContainerManager.GetSoul(seat) as EZSoul;
			var dotHandler:EZDotHandler = to.getDotHandler();
			dotHandler.refresh();
	  		var isReinforce:boolean = dotHandler.isReinforce(from.type);
	        context.root.flickerMagicType(to.seat, Geek.GetReinforce(from.type));
	        
			if(isReinforce){
				var data:EZTechDataValue = new EZTechDataValue();
				data.type = "attack";
				data.target =  EZTarget.Target.FrontRandom;
				data.physics = function(seat:EZSoul.Seat):float{
					return 0;
				};
					
				data.times = function():int{
					return 1;
				};
				data.magic = function(seat:EZSoul.Seat):float{
					
					var p:float = context.root.physics(seat);
					var l:float = this.level[this.lv];
					return (p*l);
				};
				context.root.addNext(data);
			}
			
		};
	}
};