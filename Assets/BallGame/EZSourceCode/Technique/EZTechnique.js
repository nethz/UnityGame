#pragma strict

class EZTechnique{ 
	
	protected var from_:EZSoul.Seat = EZSoul.Seat.None;
	protected var to_:EZSoul.Seat = EZSoul.Seat.None;
	protected var power_:float;
	protected var speed_:float;
	protected var attack_:float;
	protected var type_:String; 
	//protected var info_:String;
	protected var mark_:String;
	private var affixes_:EZAffix[] = null;
	
	public function get type():String{
		return type_;
	}
	public function EZTechnique(mark:String, info:EZTechniqueInfo){
		if(info !== null){
			from_ = info.from; 
			to_ = info.to;
			speed_ = info.speed;
			power_ = info.power;
			attack_ = info.attack;
			mark_ = mark;
		}
	}
	
	
	public function EZTechnique(mark:String){
		mark_ = mark;
	}
	public function get affixes():EZAffix[]{
		return affixes_;
	}
	public function setAffixes(affixes:EZAffix[]){ 
		this.affixes_ = affixes;
	}
	public function get mark():String{
		return mark_;
	}
	protected function createContext(target:EZSoul.Seat):EZAffixContext{ 
	
	 	var context:EZAffixContext = new EZAffixContext(); 
		context.from = this.from_;
		context.to = target;
		context.power = power_;
		context.speed = speed_;
		context.attack = attack_;
		return context;
	}
	public function execute():EZTechniqueData{ 
		
		var data:EZTechniqueData = new EZTechniqueData();
		
		var ignore:boolean = false;
		var from:EZSoul = EZContainerManager.GetSoul(this.from_) as EZSoul;
		if(from){
			var handler:EZBuffHandler = from.getBuffHandler();
			handler.refresh();
			if(handler.ignore()){
				ignore = true;
			}
		}
		
		var context:EZAffixContext = this.createContext(to_);
		if(!ignore && context.power != 0){
		
			for(var i:int = 0; i<this.affixes_.Length; i++){
				var afx:EZAffix = this.affixes_[i] as EZAffix;
				afx.executeIt(context);
			}
			
		}
		
		data.data = context.root;
		data.to = to_;
		data.from = this.from_;
		data.affixes = this.affixes_;
		data.mark = this.mark_;
		return data;
	} 
	
	public function print(){
		for(var i:int = 0; i<this.affixes_.Length; i++){
			var afx:EZAffix = this.affixes_[i] as EZAffix;
		}
	}
	public function clone(info:EZTechniqueInfo):EZTechnique{
		var tech:EZTechnique= new EZTechnique(this.mark_, info); 
		tech.type_ = this.type_;
		var affixes:EZAffix[] = new EZAffix[this.affixes_.Length];
		
		if(affixes_ && affixes_.Length > 0){
			for(var i:int = 0; i<this.affixes_.Length; ++i){
				affixes[i] = this.affixes_[i].clone() as EZAffix;
			}
		}
		
		tech.setAffixes(affixes);
		return tech;
	}	
	
	public function getAttack():EZTechnique{
		var tech:EZTechnique = new EZTechnique(this.mark_); 
		 
		tech.type_ = this.type_;
		var affixes:EZAffix[] = new EZAffix[1];
		if(affixes_ && affixes_.Length > 0){
			for(var i:int = 0; i<1; ++i){
				affixes[i] = this.affixes_[i].clone() as EZAffix;
			} 
		}
		
		
		tech.setAffixes(affixes);
		return tech;
	}	
	

};