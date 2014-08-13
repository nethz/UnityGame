#pragma strict

class EZAffixHurt extends EZAffix{ 
	private var rate_:float = 0.0f;
	//private var aim_:String = "";
	public function setup(info:JsonData.JsonPack){
		super.setup(info);
		rate_ = info.toFloat("rate");
	
	} 
	
	
	
	public function clone():EZAffix{
		var affix:EZAffixHurt = new EZAffixHurt();
		this.clone(affix); 
		affix.rate_ = this.rate_;
		return affix;
	}

	protected function execute(context:EZAffixContext){
	
		var GetMagic:Function = context.root.getMagic; 
		var once:boolean = false;
		context.root.getMagic = function (seat:EZSoul.Seat):float{
			var m:float = GetMagic(seat);
			if(!once){
				var soul:EZSoul = EZContainerManager.GetSoul(seat) as EZSoul;
				var e:float = context.root.elements(seat);
				var magic:float =  this.level[this.lv] * rate_ * soul.baseMaxHealth *e * context.power;
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