#pragma strict

class EZAwardExpItem extends EZAwardItem{
	
	public var _text1:String = "exp1";
	public var _text2:String = "exp2";
	public function setup(exp:int){
		_label.text = _text1 + exp.ToString() + _text2;
	}
	
}