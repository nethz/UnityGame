#pragma strict

class EZSettingInvitation extends MonoBehaviour{
	private var count_:int = 0;
	public var _box:BoxCollider = null;
	public var _label:UILabel = null;
	public var _enable:Color;
	public var _disable:Color;
	public var _begin:String;
	public var _end:String;
	public var _button:SettingButton = null;
	public function setup(count:int){
		
		count_ = count;
		refresh();
	
	}
	public function refresh(){
		
		_label.text=_begin + count_.ToString() +_end;
		if(count_<= 0 ){
			_box.enabled = false;
			_label.color = _disable;
			_button.alpha = 0.5f;
		}else{
			
			_button.alpha = 1.0f;
			_box.enabled = true;
			_label.color = _enable;
		}
	
	}
}