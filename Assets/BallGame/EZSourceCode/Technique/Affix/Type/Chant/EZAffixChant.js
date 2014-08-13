#pragma strict
class EZAffixChant extends EZAffix{
	//private var times_:int = 1;
	
	private var info_:JsonData.JsonPack;
	public function setup(info:JsonData.JsonPack){ 
		super.setup(info);
		info_ = info;
	} 
	
	
	
	public function clone():EZAffix{
		var affix:EZAffixChant = new EZAffixChant();
		this.clone(affix); 
		affix.info_ = this.info_;
		return affix;
	}
	
	protected function execute(context:EZAffixContext){
		var data:EZTechDataRoot = context.root;
		data.block = null;
		
		
		
		var pretreatment:Function = data.pretreatment;
		var buff:EZBuffChant = null;
		data.pretreatment = function(){
			if(pretreatment){
				pretreatment();
			}
				
			var from:EZSoul.Seat = context.from;
			var to:EZSoul.Seat = context.to;	
			
			var soul:EZSoul = EZContainerManager.GetSoul(from) as EZSoul;
			data.block = EZBindManager.GetInstance().buffing(soul, this.type) as EZBuffChant; 
			data.block.setup(info_, context, from);
		};
		
	
		
	}

};

