#pragma strict

class EZAffixAdd extends EZAffix{
	private var coefficient_:float = 1;
	public function setup(info:JsonData.JsonPack){ 
		super.setup(info);
		coefficient_ = info.toFloat("coefficient");
		
	} 
	
	
	
	public function clone():EZAffix{
		var affix:EZAffixAdd = new EZAffixAdd();
		this.clone(affix); 
		affix.coefficient_ = this.coefficient_;
		return affix;
	}
	protected function execute(context:EZAffixContext){
		  
		var GetMagic:Function = context.root.getMagic;
		context.root.getMagic = function(seat:EZSoul.Seat):float{  
			var m:float = GetMagic(seat);
			if(context.root.blockPhysics){
				return m;
			}else{
				var p:float = context.root.physics(seat);
				var l:float = this.level[this.lv];
				return (m + this.coefficient_ *p*l);
			}
		};
	
	}
}