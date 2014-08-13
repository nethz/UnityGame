#pragma strict

class EZAffixCombo extends EZAffix{
	private var coefficient_:float = 0f;
	private var times_:int = 1;
	public function setup(info:JsonData.JsonPack){
		super.setup(info);
		coefficient_ = info.toFloat("coefficient");
		times_ = info.toInt("times");
		
	} 
	
	
	
	public function clone():EZAffix{
		var affix:EZAffixCombo = new EZAffixCombo();
		this.clone(affix); 
		affix.coefficient_ = this.coefficient_;
		affix.times_ = this.times_;
		return affix;
	}

	protected function execute(context:EZAffixContext){
	
		var getPhysics:Function = context.root.getPhysics;
	
		context.root.getPhysics = function (seat:EZSoul.Seat):float{
			var physics:float = getPhysics(seat);
			return physics + (coefficient_ * this.level[this.lv]);
		};
		var getTimes:Function = context.root.times;
		context.root.times = function(){
		
			if(context.root.blockPhysics){
				return 1;
			}
			var t:int = getTimes();
			return times_>t ? times_ : t;
		};
		

	}

};