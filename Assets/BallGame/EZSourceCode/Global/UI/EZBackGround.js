#pragma strict

class EZBackground extends MonoBehaviour{
	public var _objs:GameObject[];
	private var _sprite:UISprite;
	
	
	public function OnClick(){
		
		if(_objs){
			for(var j:int = 0; j<_objs.Length; ++j){
				_objs[j].SendMessage("OnBackground", SendMessageOptions.DontRequireReceiver);
			}
		}
		
	}
}