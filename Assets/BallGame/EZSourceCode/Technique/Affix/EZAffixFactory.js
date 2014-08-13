#pragma strict
class EZAffixFactory extends MonoBehaviour{

	enum Mold{
		Original,
		Attack,
		Medical,
		Both,
		Crystal,
	};
	
	public var _mold:Mold = Mold.Both;
	public var _type:String;
	
	public function get type():String{
		return _type;
	}
	public function get affix():EZAffix{return null;};
	
	public function create(info:JsonData.JsonPack){
		var affix = this.affix;
		affix.mold = _mold;
		affix.setup(info);
		return affix;
	}  
}