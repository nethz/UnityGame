#pragma strict

class EZAffixHurted extends EZAffix{ 
	private var step_6_:float = 0;
	private var step_12_:float = 0;
	private var step_18_:float = 0;
	public function setup(info:JsonData.JsonPack){
		super.setup(info);
		step_6_ = info.toFloat("step_6");
		step_12_ = info.toFloat("step_12");
		step_18_ = info.toFloat("step_18");
	
	} 
	
	
	
	public function clone():EZAffix{
		var affix:EZAffixHurted = new EZAffixHurted();
		this.clone(affix); 
		affix.step_6_ = this.step_6_;
		affix.step_12_ = this.step_12_;
		affix.step_18_ = this.step_18_;
		return affix;
	}

	protected function execute(context:EZAffixContext){
	
		var GetMagic:Function = context.root.getMagic; 
		var once:boolean = false;
		
		
		
		context.root.getMagic= function (seat:EZSoul.Seat):float{
		
			var m:float = GetMagic(seat);
			if(!once){
				var soul:EZSoul = EZContainerManager.GetSoul(seat) as EZSoul;
				var rate:float = 0;
				if(context.power<= 6){
					rate = step_6_;
				}else if(context.power<= 12){
					rate = step_12_;
				}else{
					rate = step_18_;
				}
				var e:float = context.root.elements(seat);
				var magic:float =  this.level[this.lv] * rate * soul.baseMaxHealth *e;
				return m + magic;
			}else{
				return m;
			}
		};
	
		var actioned:Function = context.root.actioned;
		context.root.actioned = function(seat:EZSoul.Seat){
			if(actioned){
				actioned(seat);
			}
			once = true;
		};
	}

};