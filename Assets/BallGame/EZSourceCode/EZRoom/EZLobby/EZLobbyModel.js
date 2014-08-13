#pragma strict

class EZLobbyModel extends MonoBehaviour{

	public var _refresh:boolean = false;
	
	
	public function load(){
	
	}
	public function get refresh():boolean{
		return _refresh;
	}
	public function set refresh(value:boolean){
	
		this._refresh = value;
	}
	public function get lv():int{
		return 0;
	}
	
	public function get exp():float{
		return 0.0f;
	}
	public function get allExp():float{
		return 1.0f;
	}
	
	public function get ap():float{
		return 0.0f;
	}
	
	public function get allAp():float{
		return 1.0f;
	}
	
	public function get diamond():int{
		return 0;
	}
	public function get money():int{
		return 0;
	}
	public function get bag():int{
		return 0;
	}
	
	public function get news():int{
		return 0;
	}
	public function get quest():int{
		return 0;
	}
	
	

}