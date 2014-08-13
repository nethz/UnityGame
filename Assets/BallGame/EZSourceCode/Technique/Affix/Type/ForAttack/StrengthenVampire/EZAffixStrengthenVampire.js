#pragma strict
class EZAffixStrengthenVampire extends EZAffix{
	//private var times_:int = 1;
	public function setup(info:JsonData.JsonPack){ 
		super.setup(info);
	} 
	
	
	
	public function clone():EZAffix{
		var affix:EZAffixStrengthenVampire = new EZAffixStrengthenVampire();
		this.clone(affix); 
	
		return affix;
	}
	
	protected function execute(context:EZAffixContext){
		var data:EZTechDataRoot = context.root;
		var has:boolean = false;
		
		
		
		data.strongVampire = true;
		var pretreatment:Function = data.pretreatment;
		data.pretreatment = function(){
			if(pretreatment){
				pretreatment();
			}
			if(data.suckBlood){
				has = true;
			}
			
		};
		
		
		
		var GetPhysics:Function = context.root.getPhysics;
		context.root.getPhysics = function(seat:EZSoul.Seat):float{  
			var p:float = GetPhysics(seat);
			if(has){
				return (p + this.level[this.lv]);
			}
			return p;
		};
		
		/*
		if(context.root.type != "medical"){
			var ToPrepare:Function = data.toPrepare;
			data.toPrepare = function(ad:EZTechData){
				
				if(ToPrepare){
					ToPrepare(ad);
				}
				if(ad.type == "medical"){
					if(!has){
						
					}	
				}
			};
		}*/
	
	
		
	}
};

