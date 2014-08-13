#pragma strict


class EZDotMedicalPerfect extends EZDot{

	private var medical_:float = 0;	
	private var medicalFeedback_:boolean = false;
	private var medicalFeedbackBlood_:float = 1.0f;
	private var fromSoul_:EZSoul = null;
	
	public function setup(info:JsonData.JsonPack, context:EZAffixContext, seat:EZSoul.Seat){
		super.setup(info, context, seat);
		medical_ = context.root.physics(seat);
		medical_ *= this.level[this.lv_ ] * context.root.strongDot;
		medicalFeedback_ = context.root.medicalFeedback;
		medicalFeedbackBlood_ = context.root.medicalFeedbackBlood;
		fromSoul_ = EZContainerManager.GetSoul(context.from) as EZSoul;   
		
		
		if(medical_ == 0)
			medical_ = 1;
		
		data_.val = medical_;
			
	}
	private function medicalSelf(context:EZDotContext){
		if(fromSoul_ == null || !fromSoul_.alive){
			return;
		}
		
		var data:EZTechDataValue = new EZTechDataValue();
		
		data.power = power_;
		data.type = "medical";
		data.target = EZTarget.FromSeat(fromSoul_.seat);
			
		data.physics = function(seat:EZSoul.Seat):float{
			var ret:EZTechniqueHandler.MedicalResult = EZTechniqueHandler.MedicalPlanning(context.data, EZSoul.Seat.None, context.to);
			return ret.feedback * medicalFeedbackBlood_;
		};
	
	
		data.times = function():int{
			return 1;
		};
		data.magic = function(seat:EZSoul.Seat):float{
			return 0;
		};
		
		context.data.addNext(data);
	}
	

	public function execute(context:EZDotContext){
		super.execute(context);
		var data:EZTechDataValue = new EZTechDataValue();
		data.power = power_;
		data.type = "medical";
		data.physics = function(seat:EZSoul.Seat){
			return medical_;
		};
		data.magic = function(seat:EZSoul.Seat){
			return 0;
		};
		context.data = data;
		if(this.medicalFeedback_ && context.to != fromSoul_.seat){
			this.medicalSelf(context);
		}
	}

		
	public function get medical():float{
		if(medical_ != 0){
			this.flicker = true;
		}
		return medical_ * times_;
	}
	
};

