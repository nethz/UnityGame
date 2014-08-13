#pragma strict

class EZAffixBuff extends EZAffix{
	private var info_:JsonData.JsonPack;
	
	private var target_:EZTarget.Target = EZTarget.Target.None;  
	public function get target():EZTarget.Target{
		return target_;
	}
	public function set target(value:EZTarget.Target){
		target_ = value;
	}	
	public function setup(info:JsonData.JsonPack){ 
		super.setup(info);
		info_ = info;
	} 
	
	
	
	public function clone():EZAffix{
		var affix:EZAffixBuff = new EZAffixBuff();
		this.clone(affix); 
		affix.info_ = this.info_;
		
		affix.target_ = this.target_;
		return affix;
	}
	protected function execute(context:EZAffixContext){
		var data:EZTechDataBind = new EZTechDataBind();
		data.type = "bind";
		
		data.power = context.power;
		data.binding = function(seat:EZSoul.Seat):EZBuff{
			
			var to:EZSoul = EZContainerManager.GetSoul(seat) as EZSoul;
			var buff:EZBuff = EZBindManager.GetInstance().buffing(to, this.type); 
			
			buff.setup(info_, context, seat);
			return buff;
			
		};
		data.target = target;
		context.root.addNext(data);
	}
	
};

