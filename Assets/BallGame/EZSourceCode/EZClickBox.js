#pragma strict

import System.Collections.Generic; 

class EZClickBox extends MonoBehaviour{
	var _box:BoxCollider = null;
	public function Awake(){
		_box.enabled = false;
	
	}
	public function OnClick(){
		
		var target:GameObject = GameObject.FindGameObjectWithTag("Ctrl");
	
		target.SendMessage("onAction", "click", SendMessageOptions.DontRequireReceiver);
		
		
	}
	public function doEnabled(){
		_box.enabled = true;
	}
	public function doDisable(){
		_box.enabled = false;
	}
}