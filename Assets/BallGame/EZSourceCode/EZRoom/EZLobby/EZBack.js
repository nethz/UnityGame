#pragma strict


class EZBack extends MonoBehaviour{
	public var _box:BoxCollider = null;
	public var _sprite:UISprite = null;
	public function setEnabled(enabled:boolean){
		if(enabled){
			_box.enabled = true;
			_sprite.enabled = true;
		}else{
			ActionManager.Run("global.ui.reset");
			_box.enabled = false;
			_sprite.enabled = true;
		
		}
		
	}
	
}