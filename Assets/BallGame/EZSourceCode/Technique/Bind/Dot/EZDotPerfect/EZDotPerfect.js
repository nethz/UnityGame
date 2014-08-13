#pragma strict


class EZDotPerfect extends EZDot{

	private var hurt_:float = 0;	
	public function setup(info:JsonData.JsonPack, context:EZAffixContext, seat:EZSoul.Seat){
		super.setup(info, context, seat);
		hurt_ = this.physics;
		hurt_ *= this.level[this.lv_ ] * context.root.strongDot;
		Debug.LogWarning("EZDotPerfect:" + hurt_);
		
		
		if(hurt_ == 0)
			hurt_ = 1;
			
			
		data_.val = hurt_;
			
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

