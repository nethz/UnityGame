#pragma strict
class EZModelBagTestData  extends MonoBehaviour{

	public var _style:String;
	public var _maxHealth:float;
	public var _type:Geek.MagicType;
	public function setSoul(soul:EZSoul){
		this._type = soul.type;
		_style = soul.style;
		_maxHealth = soul.baseMaxHealth;
	}
}
