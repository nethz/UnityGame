#pragma strict
class EZTechniqueManager extends MonoBehaviour{
	public var _factory:EZTechniqueFactory;
	private static var instance_:EZTechniqueManager = null;
	public function Awake(){
		this.instance_ = this;
	}
	public static function instance(){
		return instance_;
	}
	
	public function create(tech:JsonData.TechInfo):EZTechnique{
		if(tech != null)
			return createPrototype(tech.affixes, tech.mark);
		
	}
	
	
	public function create(tech:JsonData.TechInfo, max:int):EZTechnique{
		var length:int =  0;
		if(tech && tech.affixes){
			length = max <tech.affixes.Length? max: tech.affixes.Length;
		}
		var infos:JsonData.JsonPack[] = new JsonData.JsonPack[length];
		for(var i:int =0 ; i <infos.Length; ++i){
			infos[i] = tech.affixes[i];
		}
		
		return createPrototype(infos, tech.mark);
	}
	public function createPrototype(infos:JsonData.JsonPack[], mark:String):EZTechnique{
		var prototype:EZTechnique = new EZTechnique(mark);
		var affixManager:EZAffixManager = EZAffixManager.instance();
		var affixes:Array = new Array();
		for(var i:int = 0 ; i< infos.Length; ++i){
			var af = affixManager.createAffix(infos[i]);
			if(af){
				affixes.push(af.clone());
			}
		}
		var afs:EZAffix[] = new EZAffix[affixes.Count];
		for(var n:int = 0 ; n< affixes.Count; ++n){
			afs[n] = affixes[n] as EZAffix;
		}
		
		
		prototype.setAffixes(afs);
		return prototype;
		
	}
	
};