#pragma strict

class EZAffixDotPath extends EZAffix{

	private var info_:JsonData.JsonPack;
	
	
	
	private var coefficient_:float = 1;
	
	public function setup(info:JsonData.JsonPack){ 
		super.setup(info);
		info_ = info;
		coefficient_ = info.toFloat("coefficient");
	} 
	
	
	
	public function clone():EZAffix{
		var affix:EZAffixDotPath = new EZAffixDotPath();
		this.clone(affix); 
		affix.info_ = this.info_;
		affix.coefficient_ = this.coefficient_;
		return affix;
	}
	protected function execute(context:EZAffixContext){
		
		
		context.root.suckBlood = true;
		
		
			
		var getPhysics:Function = context.root.getPhysics;
		context.root.getPhysics = function(seat:EZSoul.Seat):float{  
			var p:float = getPhysics(seat);
			if(context.root.strongVampire){
				return p;
			}
			return (p + coefficient_);
		};
		
		
		var data:EZTechDataBind = new EZTechDataBind();
		data.type = "bind";
		var from:EZSoul = EZContainerManager.GetSoul(context.from) as EZSoul;
		data.binding = function(seat:EZSoul.Seat):EZBind{
			
			var soul:EZSoul = EZContainerManager.GetSoul(seat) as EZSoul;
			var dot:EZDot = EZBindManager.GetInstance().doting(soul, this.type, from.type) as EZDot; 
			
			dot.setup(info_, context, seat);
			return dot;
			
		};
		context.root.addNext(data);
	}
}