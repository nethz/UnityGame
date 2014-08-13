#pragma strict

class EZAffixMedicalTogether extends EZAffix{

	private var blood_:float[] = null;
	private var info_:JsonData.JsonPack;
	public function setup(info:JsonData.JsonPack){ 
		super.setup(info);
		info_ = info;
		blood_ = info.toFloatArray("blood");
	} 
	
	
	
	public function clone():EZAffix{
		var affix:EZAffixMedicalTogether = new EZAffixMedicalTogether();
		this.clone(affix); 
			
		affix.blood_ = new float[this.blood_.length];
		for(var i:int; i<this.blood_.length; ++i){
			affix.blood_[i] = this.blood_[i];
		}
		
		return affix;
	}
	
	public function getSelf(context:EZAffixContext):EZTechData{
	
		var data:EZTechDataValue = new EZTechDataValue();
		
		data.power = context.power;
		data.type = "medical";
		data.target = EZTarget.FromSeat(context.from);
		data.blockPhysics = true;
		data.physics = function(seat:EZSoul.Seat):float{
			return 0;
		};
		data.times = function():int{
			return 1;
		};
		data.magic = function(seat:EZSoul.Seat):float{
			var feedback:float = 0;
			var targets:EZSoul.Seat[] = EZAffixTarget.GetTargetSeat(context.root.target, context.from, context.to);
			for(var i:int = 0; i<targets.Length; ++i){
				if(targets[i] != context.from){
					var ret:EZTechniqueHandler.MedicalResult = EZTechniqueHandler.MedicalPlanning(context.root, context.from, targets[i]);
					feedback += ret.feedback * this.blood_[this.lv]; 
				}
			}
			
			return feedback;
		};
		return data;
		
	} 
	protected function execute(context:EZAffixContext){
		
		var getPhysics:Function = context.root.getPhysics;
		
		context.root.medicalFeedback = true;
		context.root.medicalFeedbackBlood = this.blood_[this.lv];
		
		
		context.root.getPhysics = function(seat:EZSoul.Seat):float{  
			var p:float = getPhysics(seat);
			return (p + level[this.lv]);
		};
		
		
		
		
		
		var data:EZTechData = getSelf(context); 
		context.root.addNext(data);
		
	}
	
}