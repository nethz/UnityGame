#pragma strict

class EZAffixSplitting extends EZAffix{
	public function setup(info:JsonData.JsonPack){ 
		super.setup(info);
	} 
	
	
	
	public function clone():EZAffix{
		var affix:EZAffixSplitting = new EZAffixSplitting();
		this.clone(affix); 
	
		return affix;
	}
	
	protected function execute(context:EZAffixContext){
		var data:EZTechDataRoot = context.root;
		
		var getPhysics:Function = context.root.getPhysics;
		context.root.getPhysics = function(seat:EZSoul.Seat):float{  
			var p:float = getPhysics(seat);
			return (p + this.level[this.lv]);
		};
		var toPrepare:Function = data.toPrepare;
		data.toPrepare = function(ad:EZTechData){
			if(toPrepare){
				toPrepare(ad);
			}
			if(ad.target == EZTarget.Target.Rival){
				ad.target = EZTarget.Target.Front;
			}
		};
	
		
	}
}