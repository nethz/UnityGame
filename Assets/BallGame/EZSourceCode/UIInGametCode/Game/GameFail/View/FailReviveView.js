#pragma strict

class FailReviveView extends EZGameFailBaseView{
	public var _text:UILabel;
	//public var _need:UILabel;
	private var need_:int = 1;
	private var has_:int = 0;
	
	public function Awake(){
		super.Awake();
		refresh();
	}
	public function refresh(){ 
		_text.text = need_.ToString() + "/" + has_.ToString();
		//_need.text = need_.ToString();
	}
	public function set has(value:int){
		has_ = value; 
		this.refresh();
	}
	
	public function set need(value:int){
		need_ = value;
		this.refresh();
	}

}