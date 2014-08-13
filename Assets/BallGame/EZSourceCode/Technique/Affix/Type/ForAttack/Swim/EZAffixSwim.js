#pragma strict

class EZAffixSwim extends EZAffix{

	private var info_:JsonData.JsonPack;
	
	
	
	public function setup(info:JsonData.JsonPack){ 
		super.setup(info);
		info_ = info;
	} 
	
	
	
	public function clone():EZAffix{
		var affix:EZAffixSwim = new EZAffixSwim();
		this.clone(affix); 
		affix.info_ = this.info_;
		return affix;
	}
	protected function execute(context:EZAffixContext){
			
		var GetPhysics:Function = context.root.getPhysics; 
		context.root.getPhysics= function (seat:EZSoul.Seat):float{ 
			var physics:float = GetPhysics(seat);
			return physics + this.level[this.lv];
		};
		
		
		
		var data:EZTechDataBind = new EZTechDataBind();
		data.type = "bind";
		data.binding = function(seat:EZSoul.Seat):EZBind{
			
			var soul:EZSoul = EZContainerManager.GetSoul(seat) as EZSoul;
			var buff:EZBind = EZBindManager.GetInstance().buffing(soul, this.type) as EZBuff; 
			
			buff.setup(info_, context, seat);
			return buff;
			
		};
		context.root.addNext(data);
	}
}