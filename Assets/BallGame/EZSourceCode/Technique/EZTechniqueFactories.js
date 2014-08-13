#pragma strict

class EZTechniqueFactories  extends MonoBehaviour{
	//public var _affixFactories:AffixFactories;
	private var map_:Hashtable =  null;// new Hashtable(); 
	
	public function Awake(){
		this.map_ = new Hashtable();
		var components:Component[] = GetComponentsInChildren(EZTechniqueFactory); 
		 
		for(var i:int =0; i< components.length; ++i){
			var factory:EZTechniqueFactory = components[i] as EZTechniqueFactory;
			map_[factory.type] = factory;
		}
	}
	//public function create(info:TechniqueInfo):Technique{
	/*
		if(map_ != null)
		{
			var factory:TechniqueFactory = map_[info.type]; 
			if(factory)
			{
				return factory.create(info);
			}
		} else{
			DebugStreamer.UI("fuck fuck fuck fuck!!!!!" ); 
		}*/
	//	return null;
	//}
	

		/*
	public function createPrototype(infos:JsonData.JsonPack[]):Technique{
		
		var prototype:RawTechnique = new RawTechnique();
		var affixManager:AffixManager = AffixManager.instance();
		var affixes:Array = new Array();
		for(var i:int = 0 ; i< infos.Length; ++i){
		
			var af = affixManager.createAffix(infos[i]);
			if(af)
			{
				affixes.push(af.clone());
			}
		}
		var afs:Affix[] = new Affix[affixes.Count];
		for(var n:int = 0 ; n< affixes.Count; ++n){
			afs[n] = affixes[n] as Affix;
		}
		
		
		prototype.setAffixes(afs);
		return prototype;
	}
	*/
	
	
};