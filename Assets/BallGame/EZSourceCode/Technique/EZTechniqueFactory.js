#pragma strict
class EZTechniqueFactory extends MonoBehaviour{
	public var _prototype:EZTechnique;
	
	public function Awake(){ 
		var ab:EZAffixFactory[] = System.Array.ConvertAll(
				this.GetComponents(EZAffixFactory),
				function (component){component as EZAffixFactory;}
				);
		var affixes:EZAffix[] = new EZAffix[ab.Length];
		for(var i:int = 0; i< ab.Length; ++i)
		{
			affixes[i] = ab[i].affix;
		}
		this._prototype.setAffixes(affixes);

	}
	public function get type():String{
		return this._prototype.type;
	}
	public function create(info:EZTechniqueInfo):EZTechnique{
		return _prototype.clone(info);
	}
	
	
};