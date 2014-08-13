#pragma strict

class EZAffixDot extends EZAffix{
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
		var affix:EZAffixDot = new EZAffixDot();
		this.clone(affix); 
		affix.info_ = this.info_;
		affix.target_ = this.target_;
		return affix;
	}
	protected function execute(context:EZAffixContext){
		var data:EZTechDataBind = new EZTechDataBind();
		data.type = "bind";
		
		var from:EZSoul = EZContainerManager.GetSoul(context.from) as EZSoul;
		data.binding = function(seat:EZSoul.Seat):EZBind{
			var to:EZSoul = EZContainerManager.GetSoul(seat) as EZSoul;
			Debug.LogWarning(to +this.type + from.type );
			var dot:EZDot = EZBindManager.GetInstance().doting(to, this.type, from.type); 
			
			dot.setup(info_, context, seat);
			
			return dot;
			
		};
		data.target = target;
		context.root.addNext(data);
	}
	
};

