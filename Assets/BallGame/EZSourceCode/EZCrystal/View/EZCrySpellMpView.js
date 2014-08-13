#pragma strict

class EZCrySpellMpView extends MonoBehaviour{
	public var _front:UISprite;
	public function close(){	
		_front.enabled = false;
	}
	public function open(){
		_front.enabled = true;
	}
}
