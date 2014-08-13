#pragma strict

class EZAffixRevive extends EZAffix{
	 
	private var coefficient1_:float = 0f;
	private var coefficient2_:float = 0f;

	public function setup(info:JsonData.JsonPack){ 
		super.setup(info); 
		coefficient1_ = info.toFloat("coefficient1");
		coefficient2_ = info.toFloat("coefficient2");
	}
	
	public function clone():EZAffix{
		var affix:EZAffixRevive = new EZAffixRevive();
		this.clone(affix); 
		 
		affix.coefficient1_ = this.coefficient1_;
		affix.coefficient2_ = this.coefficient2_;
		return affix;
	}
	protected function execute(context:EZAffixContext){
		
		
			
			
			
		var root:EZTechDataRoot = new EZTechDataRoot();
		
		root.power = context.power;
		root.type = "medical";
		root.target = EZTarget.Target.Self;
		
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
	
		root.elements = function(seat:EZSoul.Seat):float{
			return 1f;
		};

		var data:EZTechDataRevive = new EZTechDataRevive();
		
		data.power = context.power;
		data.target = EZTarget.Target.We;
		root.addNext(data);
		
		data.health = function(seat:EZSoul.Seat){
			
		 	var soul:EZSoul = EZContainerManager.GetSoul(seat) as EZSoul; 
		 	var n:int = EZContainerManager.WeDie();
		 	var v:float = 1.0f;
		 	if(this.lv >= 0 && this.lv <= this.level.Length){
		 		v = this.level[this.lv];
		 	}
		 	return v;
		 	/*
		 	if(n == 1){
				return soul.baseMaxHealth * coefficient1_ * v;
		 	}else if(n ==2){
				return soul.baseMaxHealth * coefficient2_ * v;
		 	}else{
		 		 return 1;
		 	}*/
			
		};
		context.root = root; 

	}
	
};

