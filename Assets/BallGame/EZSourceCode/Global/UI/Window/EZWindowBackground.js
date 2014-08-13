#pragma strict
class EZWindowBackground extends MonoBehaviour{
	public var _arrow:EZWindowArrow = null;
	
	public function OnPress(isPressed:boolean){
		if(isPressed){
			_arrow.down();
		}else{
			_arrow.up();
		}
	}
}