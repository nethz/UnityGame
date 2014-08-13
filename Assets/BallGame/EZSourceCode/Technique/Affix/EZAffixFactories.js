#pragma strict

class EZAffixFactories  extends MonoBehaviour{
	private var map_:Hashtable =  null;// new Hashtable(); 
	
	public function Awake(){
		this.map_ = new Hashtable();
		var components:Component[] = GetComponentsInChildren(EZAffixFactory); 
		 
		for(var i:int =0; i< components.length; ++i){
			var factory:EZAffixFactory = components[i] as EZAffixFactory;
			map_[factory.type] = factory;
		}
	}
	
	
	public function create(info:JsonData.JsonPack):EZAffix{
		

		if(info == null){
			return null;
		}
		if(map_ != null)
		{
			var type:String = info.toString("type");
			
			var factory:EZAffixFactory = map_[type] as EZAffixFactory; 
			
			if(factory)
			{
				var affix:EZAffix = factory.create(info);
				return affix;
			}else{
				return null;
			
			}
		} else{
			Debug.LogError("fuck fuck fuck Affix!!!!!" ); 
		}
			
		
		return null;
	}
	
	
};