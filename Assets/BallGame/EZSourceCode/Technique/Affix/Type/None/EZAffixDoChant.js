#pragma strict

class EZAffixDoChant extends EZAffix{

	
	
	
	private var coefficient_:float = 0;
	
	public function set coefficient(value:float ){
		this.coefficient_ = value;
	}
	
	
	public function clone():EZAffix{
		var affix:EZAffixDoChant = new EZAffixDoChant();
		affix.coefficient_ = this.coefficient_;
		return affix;
	}
	
	protected function execute(context:EZAffixContext){
		var data:EZTechDataRoot = context.root;
		context.root.doChant = true;
		var GetPhysics:Function = data.getPhysics;
		data.getPhysics = function(seat:EZSoul.Seat):float{  
			var p:float = GetPhysics(seat);
			return (p + coefficient_);
		};
		
		
	}
}