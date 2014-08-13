#pragma strict

class EZAwardMoneyItem extends EZAwardItem{
	public var _money:String = "money";
	public function setup(num:int){
		_label.text = "x" +num.ToString() + _money;
	}
	
}