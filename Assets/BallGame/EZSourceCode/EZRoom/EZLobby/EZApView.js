#pragma strict

class EZApView extends MonoBehaviour{
	public var _text:UILabel;
	public var _bar:UISlider;
	
	private function setAp(ap:float){
		_bar.sliderValue = ap;
	}
	public function set val(value:float){
		var to:float = value;
		var from:float = _bar.sliderValue;
		if( to > from){
			GeekTweenValue.Begin(_bar.gameObject, 0.2, from, to, this.gameObject, "setAp");
		}else{
			setAp(to);
		}
	}
	public function get val():float{
		return _bar.sliderValue;
	}
	public function set text(value:String){
		_text.text = value;
	}
	

	
}