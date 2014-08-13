#pragma strict
class EZDotDrink extends EZDot{

	private var hurt_:float = 0;
	private var fromSoul_:EZSoul = null;
	public function setup(info:JsonData.JsonPack, context:EZAffixContext, seat:EZSoul.Seat){
		super.setup(info, context, seat);
		hurt_ = this.physics;
		hurt_ *= this.level[this.lv_];
		hurt_ *= context.root.strongDot;
		
		fromSoul_ = EZContainerManager.GetSoul(context.from) as EZSoul;   
		
		
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
		this.medical(context);
	}
	
	private function medical(context:EZDotContext){
		if(fromSoul_ == null || !fromSoul_.alive){
			return;
		}
		
		var data:EZTechDataValue = new EZTechDataValue();
		
		data.power = power_;
		data.type = "medical";
		data.target = EZTarget.FromSeat(fromSoul_.seat);
			
		data.physics = function(seat:EZSoul.Seat):float{
			var to:EZSoul = EZContainerManager.GetSoul(seat) as EZSoul;
			var handler:EZBuffHandler = to.getBuffHandler();
			var injury:float = handler.injury();
			var ret:EZAttackHandler.AttackResult = EZAttackHandler.AttackPlanning(context.data, EZSoul.Seat.None, context.to);
			
			return ret.vampire * injury;
		};
	
	
		data.times = function():int{
			return 1;
		};
		data.magic = function(seat:EZSoul.Seat):float{
			return 0;
		};
		
		context.data.addBesides(data);
	}
	
	
	public function get attack():float{
		if(hurt_ != 0)
			this.flicker = true;
		return hurt_ * times_;
	}
	
}