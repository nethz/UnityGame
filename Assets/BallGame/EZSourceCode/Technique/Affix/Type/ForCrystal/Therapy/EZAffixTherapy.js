#pragma strict

class EZAffixTherapy extends EZAffix{
	
	private var coefficient_:float = 0f;

	public function setup(info:JsonData.JsonPack){ 
		super.setup(info);
		coefficient_ = info.toFloat("coefficient");
	}
	public function clone():EZAffix{
		var affix:EZAffixTherapy = new EZAffixTherapy();
		this.clone(affix); 
		affix.coefficient_ = this.coefficient_;
		return affix;
	}
	protected function execute(context:EZAffixContext){
		
		var root:EZTechDataRoot = new EZTechDataRoot();
		
		root.power = context.power;
		root.type = "medical";
		root.target = EZTarget.Target.We;
		root.original = 0;
		
		root.physics = function(seat:EZSoul.Seat):float{
			return 0;
		};
		
		root.magic = function(seat:EZSoul.Seat):float{
		 	var soul:EZSoul = EZContainerManager.GetSoul(seat) as EZSoul;
		 	var v:float = 1.0f;
		 	if(this.lv >= 0 && this.lv <= this.level.Length){
		 		v = this.level[this.lv];
		 	
		 	}
		 	
		 	Debug.LogWarning("length:" + this.level.Length);
		 	Debug.LogWarning("lv:" + this.lv);
		 	Debug.LogWarning("v:" + v);
		 	Debug.LogWarning("coefficient_ * v:" + (coefficient_ * v));
		 	return v;
			//return soul.baseMaxHealth * coefficient_ * v;
		};
		
		
		root.times = function():int{
			return 1;
		};
	
		root.elements = function(seat:EZSoul.Seat):float{
			return 1f;
		};
		

		context.root = root; 

	}
	
};

