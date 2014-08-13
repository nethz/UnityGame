#pragma strict

/*

class EZMagicStore extends MonoBehaviour{
	private var electric_:EZTechnique = null; 
	public var getTechnique:Function = null;
	private var times_:int = 0;
	
	
	
	
	private var coefficient_:float = 0;
	
	public function set coefficient(value:float ){
		this.coefficient_ = value;
	}
	public function setElectric(type:String, info:EZTechniqueInfo, times:int){ 
	
		
		if(getTechnique){
			var prototype:EZTechnique = getTechnique();
			this.electric_ = prototype.clone(info); 
			var affixes:EZAffix[] = this.electric_.affixes;
			for(var i:int = 0; i<affixes.length; ++i){
				if(affixes[i].type == type){
				
					var af:EZAffixNone = new EZAffixNone();
					af.coefficient = coefficient_;
					affixes[i] = af;
				}
			}
		}
		times_ = times;
	}
	
	
	public function get filled():boolean{
		return (electric_ != null);
	}
	public function release(){
		 electric_ = null;
	}
	public function discharge():EZTechnique{
		Debug.LogWarning("warning:" + times_);
		times_--;
		if(times_<=0){
			var electric:EZTechnique = electric_;
			electric_ = null;
			Debug.LogWarning("warningaaa:" + electric);
			return electric;
		}
		return null;
		 
	} 
}*/