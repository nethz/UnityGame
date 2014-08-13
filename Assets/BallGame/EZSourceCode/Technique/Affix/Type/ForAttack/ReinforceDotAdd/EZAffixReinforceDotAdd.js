#pragma strict

class EZAffixReinforceDotAdd extends EZAffix{ 
	
	public function setup(info:JsonData.JsonPack){
		super.setup(info);
		
	
	} 
	
	
	
	public function clone():EZAffix{
		var affix:EZAffixReinforceDotAdd = new EZAffixReinforceDotAdd();
		this.clone(affix); 
		
		return affix;
	}

	protected function execute(context:EZAffixContext){
		
		var GetMagic:Function = context.root.getMagic;
		
		context.root.getMagic = function(seat:EZSoul.Seat):float{  
			var m:float = GetMagic(seat);
			if(!context.root.blockPhysics){
				var from:EZSoul = EZContainerManager.GetSoul(context.from) as EZSoul;
				var to:EZSoul = EZContainerManager.GetSoul(seat) as EZSoul;
				var dotHandler:EZDotHandler = to.getDotHandler();
				dotHandler.refresh();
		  		var isReinforce:boolean = dotHandler.isReinforce(from.type);
		        context.root.flickerMagicType(to.seat, Geek.GetReinforce(from.type));
				if(isReinforce){
					var p:float = context.root.physics(seat);
					var l:float = this.level[this.lv];
					return (m + p*l);
				}
			}
			return m;
			
			
		};
	}
};