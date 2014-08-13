#pragma strict

class EZCryFragButton extends MonoBehaviour{
	public var _frag:UISprite;
	public var _box:BoxCollider;
	public var _magicType:Geek.MagicType = Geek.MagicType.None;
	private var mode_:EZCryNormalCtrl.Mode = EZCryNormalCtrl.Mode.Select;
	private var isOpen_:boolean = false;
	private var isEnabled_:boolean = false;
	public function get magicType():Geek.MagicType{
		return _magicType;
	}
	
	
	public function get json():String{
		return "hahhahaha";
	}
	public function setEnabled(enabled:boolean){
		isEnabled_ = enabled;
	}
	public function refresh(){
		if(mode_  ==  EZCryNormalCtrl.Mode.Select){
			_frag.color.a = 0.5f;
			_box.enabled = false;
		}else{
			if(!isEnabled_){
				_frag.color.a = 0.3f;
				_box.enabled = false;
			}else{
				_frag.color.a = 1.0f;
				_box.enabled = true;
			}
			
		}
	}
	public function setMode(mode:EZCryNormalCtrl.Mode){
		mode_ = mode;
	}
	public function open(){
		isOpen_ = true;
	}
	public function close(){
	
		isOpen_ = false;
	}
}