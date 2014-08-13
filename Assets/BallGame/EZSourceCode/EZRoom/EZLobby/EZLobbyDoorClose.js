#pragma strict

class EZLobbyDoorClose extends MonoBehaviour{

	public var _light:UITexture = null;
	public var _door:UITexture = null;
	
	public function doEnable(){
		_light.enabled = true;
		_door.enabled = true;
	}
	public function doDisable(){
		
		_light.enabled = false;
		_door.enabled = false;
		
	}
}