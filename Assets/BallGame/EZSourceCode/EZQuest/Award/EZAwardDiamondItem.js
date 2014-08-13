#pragma strict

class EZAwardDiamondItem extends EZAwardItem{
	
	public var _diamond:String = "diamond";
	public function setup(num:int){
		_label.text = "x" +num.ToString() + _diamond;
	}
	
}