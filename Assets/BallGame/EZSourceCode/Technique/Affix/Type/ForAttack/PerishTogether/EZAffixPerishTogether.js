#pragma strict

class EZAffixPerishTogether extends EZAffix{

	private var self_:float[] = null;
	public function setup(info:JsonData.JsonPack){ 
		super.setup(info);
		self_ = info.toFloatArray("self");
	} 
	
	
	
	public function clone():EZAffix{
		var affix:EZAffixPerishTogether = new EZAffixPerishTogether();
		this.clone(affix); 
		
		affix.self_ = new float[this.self_.length];
		for(var i:int; i<this.self_.length; ++i){
			affix.self_[i] = this.self_[i];
		}
		
		
		
		return affix;
	}
	public function getSelf(context:EZAffixContext):EZTechData{
	
	
		var data:EZTechDataValue = new EZTechDataValue();
		data.type = "attack";
		data.target = EZTarget.Target.Self;
		
		data.physics = function(seat:EZSoul.Seat):float{
			return 0.0f;
		};
		data.magic = function(seat:EZSoul.Seat):float{
		
			
			var p:float = context.root.physics(seat);
			return (p * self_[this.lv]);
		};
		return data;
		
	} 
	public function execute(context:EZAffixContext){
	
		
	
		var GetPhysics:Function = context.root.getPhysics;
		context.root.getPhysics = function(seat:EZSoul.Seat):float{  
			var p:float = GetPhysics(seat);
			return (p + level[this.lv]);
		};
		var data:EZTechData =  getSelf(context); 
		
		context.root.addPrevious(data);
		
	}
}