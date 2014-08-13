#pragma strict
/*
class EZTaskCloseable extends Task{
	public var close:Function = null;

}*/
class EZCrystalSideCtrl extends MonoBehaviour{
	public var _sprite:UISprite;
	public var _waitColor:Color;
	public var _flyColor:Color;
	public var _filledColor:Color;
	public var _downColor:Color;
	public var _webColor:Color;
	public var _sound:EZSound = null;
	public var _addCrystal:EZSound = null;
	public var _button:EZCrystalWebButton = null;
	private var filled_:boolean = false;
	public function set filled(value:boolean){
		filled_ = value;
	}
	public function get filled():boolean{
	
		return filled_;
	}

}