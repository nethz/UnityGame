#pragma strict
class EZUIInfoText extends MonoBehaviour{
	var _label:UILabel;
	public function setup(text:String){
		_label.text = text;
	}
}