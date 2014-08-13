#pragma strict

class EZAffixAttackShield extends EZAffix{

	private var info_:JsonData.JsonPack;
	
	
	
	public function setup(info:JsonData.JsonPack){ 
		super.setup(info);
		info_ = info;
	} 
	
	
	
	public function clone():EZAffix{
		var affix:EZAffixAttackShield = new EZAffixAttackShield();
		this.clone(affix); 
		affix.info_ = this.info_;
		return affix;
	}
	protected function execute(context:EZAffixContext){
			
	
		
		
		
		var data:EZTechDataBind = new EZTechDataBind();
		
		data.power = context.power;
		data.type = "bind";
		data.binding = function(seat:EZSoul.Seat):EZBind{
			
			var soul:EZSoul = EZContainerManager.GetSoul(seat) as EZSoul;
			var buff:EZBuff = EZBindManager.GetInstance().buffing(soul, this.type) as EZBuff; 
			
			buff.setup(info_, context, seat);
			return buff;
			
		};
		data.target = EZTarget.Target.Self;
		context.root.addNext(data);
	}
}