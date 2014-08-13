#pragma strict

class EZAwardGoodItem extends EZAwardItem{
	public var _good:String = "good";
	public function setup(num:int){
		if(num != 1){
			_label.text = _good + " x" +num.ToString();
		}else{
		
			_label.text = _good;
		}
	}
	
}