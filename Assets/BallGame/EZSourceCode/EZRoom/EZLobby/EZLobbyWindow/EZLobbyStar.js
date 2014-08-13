#pragma strict

class EZLobbyStar extends MonoBehaviour{
	public var _star:UISprite = null;
	public var _subscript = "";
	public function Awake(){
		_star.enabled = false;
	}
	
	public function load(){
		var sm:EZSubscriptManager = EZSubscriptManager.GetInstance();
		var subscript:EZSubscript = sm.getSubscript(_subscript);
		if(subscript.number != 0){	
			
			_star.enabled = true;
		}else{
			_star.enabled = false;
		}
	}
	public function get hasStar(){
		return _star.enabled;
	}

}
