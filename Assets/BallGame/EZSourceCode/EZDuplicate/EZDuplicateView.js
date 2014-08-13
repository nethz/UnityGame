#pragma strict

class EZDuplicateView extends MonoBehaviour{
	public var _ap:UISlider;
	public var _apText:UILabel;
	public var _background:EZDuplicateViewBackground;
	public function Awake(){
	//	_background.hide();
		
	}
	public function get background():EZDuplicateViewBackground{
		return _background;
	}
	public function set apText(value:String){
		_apText.text = value;
	}

	public function set ap(value:int){
		_ap.sliderValue = value;
	}
}