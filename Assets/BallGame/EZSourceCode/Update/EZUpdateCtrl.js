#pragma strict

class EZUpdateCtrl extends MonoBehaviour{
	public var _debug:boolean = false;
	public var _window:EZUpdateWindow = null;
	public var _version:EZVersion = null;
	public var _uuid:String = "110519";
	public var _hash:String = "110519";
	private var pause_:boolean = false;
	public function set pause(value:boolean){
		pause_ = value;
	}
	public function get pause():boolean{
		return pause_;
	
	}
}