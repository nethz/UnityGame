#pragma strict
class EZFlame extends MonoBehaviour{
	public var _magicType:EZMagicTypeColor;
	public function Awake(){
		this.hide();
	}
	public function setMagicType(type:Geek.MagicType){
		_magicType.setType(type);
	}
	
	public function setAlpha(alpha:float){
		_magicType.alpha = alpha;
	}
	
	public function hide(){
		_magicType.hide();
	}
	public function show(){
		_magicType.show();
	}
}