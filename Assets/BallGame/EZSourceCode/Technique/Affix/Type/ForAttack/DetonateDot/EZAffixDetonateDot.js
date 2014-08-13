#pragma strict
class EZAffixDetonateDot extends EZAffix{
	public function setup(info:JsonData.JsonPack){ 
		super.setup(info);
	} 
	
	
	
	public function clone():EZAffix{
		var affix:EZAffixDetonateDot = new EZAffixDetonateDot();
		this.clone(affix); 
		return affix;
	}
	
	protected function execute(context:EZAffixContext){
		
		var getMagic:Function = context.root.getMagic;
		var actioning:Function = context.root.actioning;
		
	
		context.root.getMagic = function(seat:EZSoul.Seat):float{  
			var m:float = getMagic(seat);
			var l:float = this.level[this.lv];
			
			var soul:EZSoul = EZContainerManager.GetSoul(seat) as EZSoul;  
			var handler:EZDotHandler = soul.getDotHandler();
			handler.refresh();
			var aValue = handler.attack;
			handler.attackClear();
			return (m + aValue*l);
		};
		
		//var actioned:Function = context.root.actioned;
		/*context.root.actioned = function(seat:EZSoul.Seat){  
		
			if(actioned){
				actioned(seat);
			}
			var soul:EZSoul =  EZContainerManager.GetSoul(seat) as EZSoul; 
			var handler:EZDotHandler = soul.getDotHandler();
			handler.refresh();
			handler.attackClear(); 
			
		};*/
		
	}

};

