#pragma strict


class EZDotHurt extends EZDot{
	private var hurt_:float = 0;
	
	protected var step_12_:float[] = null;
	protected var step_18_:float[] = null;
	//private var power_:int = 0;
	
	
	
	public function magic(info:JsonData.JsonPack, context:EZAffixContext, seat:EZSoul.Seat):float{
		
		var e:float = context.root.elements(seat);	
		
		if(info.hasKey("step_12")){
			this.step_12_ = info.toFloatArray("step_12");
		}else{
			this.step_12_ = new float[5];
			for(var i:int =0;i<this.step_12_.length; ++i){
				this.step_12_[i] = 1;
			}
		}
		
		
		if(info.hasKey("step_18")){
			this.step_18_ = info.toFloatArray("step_18");
		}else{
			this.step_18_ = new float[5];
			for(var m:int =0;m<this.step_18_.length; ++m){
				this.step_18_[m] = 1;
			}
		}
		
		
		var s:float = 0;
		if(context.power <= 6){
			s = level[lv_];
		}else if(context.power <= 12){
			s = step_12_[lv_];
		}else{
			s = step_18_[lv_];
		}
		
		var to:EZSoul = EZContainerManager.GetSoul(seat) as EZSoul;
		hurt_ = s * to.baseMaxHealth * e;
		hurt_ *= context.root.strongDot;
		
		if(hurt_ == 0)
			hurt_ = 1;
			
			
		data_.val = hurt_;
	}
	
	public function skill(info:JsonData.JsonPack, context:EZAffixContext, seat:EZSoul.Seat){
			
		var e:float = context.root.elements(seat);	
		var to:EZSoul = EZContainerManager.GetSoul(seat) as EZSoul;
		hurt_ = this.level[this.lv_] * context.power * to.baseMaxHealth * e;
		
		hurt_ *= context.root.strongDot;
		if(hurt_ == 0)
			hurt_ = 1;
		
		data_.val = hurt_;
	}
	public function setup(info:JsonData.JsonPack, context:EZAffixContext, seat:EZSoul.Seat){
		super.setup(info, context, seat);
		
		if(info.hasKey("step_12") && info.hasKey("step_18")){
			magic(info, context, seat);
		}else{
			skill(info, context, seat);
		}
		
	
	}
	public function execute(context:EZDotContext){
		super.execute(context);
		var data:EZTechDataValue = new EZTechDataValue();
		
		data.power = power_;
		data.type = "attack";
		data.physics = function(seat:EZSoul.Seat){
			return hurt_;
		};
		data.magic = function(seat:EZSoul.Seat){
			return 0;
		};
		context.data = data;
		
		context.data.puncture = true;
	}
	public function get attack():float{
		if(hurt_ != 0)
			this.flicker = true;
		return hurt_ * times_;
	}
	
};

