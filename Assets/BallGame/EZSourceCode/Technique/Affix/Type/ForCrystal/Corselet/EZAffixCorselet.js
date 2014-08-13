#pragma strict

class EZAffixCorselet extends EZAffix{
	private var info_:JsonData.JsonPack;

	public function setup(info:JsonData.JsonPack){ 
		super.setup(info);
		info_ = info;
	}
	
	public function clone():EZAffix{
		var affix:EZAffixCorselet = new EZAffixCorselet();
		this.clone(affix); 
		affix.info_ = this.info_;
		return affix;
	}
	protected function execute(context:EZAffixContext){
		var root:EZTechDataRoot = new EZTechDataRoot();
		
		root.power = context.power;
		root.type = "medical";
		root.target = EZTarget.Target.WeBattle;
		
		root.blockPhysics = true;
		root.original = 0;
		root.physics = function(seat:EZSoul.Seat):float{
			return 0;
		};
		root.magic = function(seat:EZSoul.Seat):float{
			return 0;
		};
		root.times = function():int{
			return 1;
		};
		//root.power = function():int{
		//	return context.power;
		//}
		root.elements = function(seat:EZSoul.Seat):float{
			return 1f;
		};
		context.root = root; 
		var data:EZTechDataBind = new EZTechDataBind();
		
		data.power = context.power;
		data.type = "bind";
		
		data.target = EZTarget.Target.WeBattle;
		data.binding = function(seat:EZSoul.Seat):EZBuff{
			var to:EZSoul = EZContainerManager.GetSoul(seat) as EZSoul;
			var buff:EZBuff = EZBindManager.GetInstance().buffing(to, this.type); 
			buff.setup(info_, context, seat);
			return buff;
		};
		context.root.addNext(data);
	}
};

