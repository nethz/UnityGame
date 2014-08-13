#pragma strict

class EZAffixDotPerfect extends EZAffix{

	private var info_:JsonData.JsonPack;
	public function setup(info:JsonData.JsonPack){ 
		super.setup(info);
		info_ = info;
	} 
	
	
	
	public function clone():EZAffix{
		var affix:EZAffixDotPerfect = new EZAffixDotPerfect();
		this.clone(affix); 
		affix.info_ = this.info_;
		return affix;
	}
	protected function execute(context:EZAffixContext){
		
		
		context.root.blockPhysics = true;
		
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