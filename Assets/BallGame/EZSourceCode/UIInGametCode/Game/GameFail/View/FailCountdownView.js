#pragma strict

class FailCountdownView extends MonoBehaviour{
	public var _text:UILabel;
	private var number_:int = 0;
	public var _methodTv:GeekTweener.Method;
	public var _countdownTime:float = 0.0f;
	private var tv_:GeekTweenValue  = null;
	public function Awake(){
		_text.enabled = false;
	}
	
	public function setup(time:float){
		_countdownTime = time;
	}
	public function open(){
		_text.enabled = true;
		
	}
	public function close(){
		_text.enabled = false;
	}

	public function countDown(){
		if(_text.enabled){
			tv_ = GeekTweenValue.Begin(this.gameObject, _countdownTime, _countdownTime, 0.0f, this.gameObject, "setNum");
			tv_.method = _methodTv;
		}
		
	}
	
	public function setNum(num:float){
		number_ = Mathf.FloorToInt(num);
		_text.text = number_.ToString();
	}
	
	
	public function get zero():boolean{
		return number_ <= 0;
	}

}
	