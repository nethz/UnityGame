#pragma strict

class EZBuffChant extends EZBuff{
	public var coefficient_:float = 0.0f;
	public var times_:int = 1;
	public var techInfo_:EZTechniqueInfo = null;
	
	public function setup(info:JsonData.JsonPack, context:EZAffixContext, seat:EZSoul.Seat){
		super.setup(info, context, seat);
	
		coefficient_  = this.level_[this.lv_];
		
		techInfo_ = new EZTechniqueInfo( 
						context.from,
						context.to,
						context.power,
						context.speed,
						context.attack
					);
		
		times_ = info.toInt("times");
		
		this.data_.number = times_ + 1;
			
			
	}
	
	public function getTech(tech:Function):EZTechnique{
		if(times_ <=0 && tech){
			var prototype:EZTechnique = tech();
			var electric:EZTechnique = prototype.clone(techInfo_); 
			var affixes:EZAffix[] = electric.affixes;
			for(var i:int = 0; i<affixes.length; ++i){
				if(affixes[i].type == type_){
					var af:EZAffixDoChant = new EZAffixDoChant();
					af.coefficient = coefficient_;
					affixes[i] = af;
				}
			}
			
			
			close = true;
			return electric;
		}
		
		
		
	     return null;
	}
	public function deposit():boolean{
	
		return true;
	}
	public function doRound():boolean{
	
		--times_;
		this.data_.number = times_ +1;
		return true;
	}
	
	public function doActioned(){
		var handler:EZBuffHandler = this.gameObject.GetComponent(EZBuffHandler) as EZBuffHandler;
		handler.refresh();
		if(handler.ignore()){
			close = true;
		}
		
	}
	public function doSwap(){
		close = true;
	}
	
}