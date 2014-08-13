#pragma strict

class EZAffixVampire extends EZAffix{


	private var blood_:float[] = null;
	public function setup(info:JsonData.JsonPack){ 
		super.setup(info);
		blood_ = info.toFloatArray("blood");
	} 
	
	
	
	public function clone():EZAffix{
		var affix:EZAffixVampire = new EZAffixVampire();
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
		data.target = EZTarget.Target.Self;
		
		data.physics = function(seat:EZSoul.Seat):float{
		
			var to:EZSoul = EZContainerManager.GetSoul(seat) as EZSoul;
			var handler:EZBuffHandler = to.getBuffHandler();
			var injury:float = handler.injury();
		
			var vampire:float = 0;
			var targets:EZSoul.Seat[] = EZAffixTarget.GetTargetSeat(context.root.target, context.from, context.to);
			for(var i:int = 0; i<targets.Length; ++i){
				var ret:EZAttackHandler.AttackResult = EZAttackHandler.AttackPlanning(context.root, context.from, targets[i]);
				vampire += ret.vampire * this.blood_[this.lv]; 
			}
			
			
			return vampire * injury;
		};
		data.times = function():int{
			return 1;
		};
		data.magic = function(seat:EZSoul.Seat):float{
			return 0;
		};
		return data;
		
	} 
	protected function execute(context:EZAffixContext){
	
		var GetPhysics:Function = context.root.getPhysics;
		context.root.suckBlood = true;
		context.root.getPhysics = function(seat:EZSoul.Seat):float{  
			var p:float = GetPhysics(seat);
			if(context.root.strongVampire){
				return p;
			}
			return (p + level[this.lv]);
		};
		
		
		
		
		
		var data:EZTechData = getSelf(context); 
		context.root.addBesides(data);
		
	}
}