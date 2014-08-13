#pragma strict
/*
class EZCrySpellInfoTextView extends MonoBehaviour{
	//public var _text:UILabel = null;
	public var _whiteText:UILabel = null;
	public var _yellowText:UILabel = null;
	public var _time:UILabel = null;
	public var _front:UISprite = null;
	public var _begin:Transform = null;
	public var _end:Transform = null;
	public var _mark:UILabel = null;
	public var _slip:UISprite = null;
	private var isOpen_:boolean = false;
	private var mp_:float = 0;
	private var maxMp_:float = 0;
	private var addMaxMp_:float = 0;
	private var resetTime_:float = 0;
	private var space_:int = 0;
	public function setup(mp:float, maxMp:float, addMaxMp:float, resetTime:double){
		this.mp_= mp;
		this.maxMp_ = maxMp;
		this.addMaxMp_ = addMaxMp;
		resetTime_ = resetTime;
	}
	
	public function Awake(){
		this.close();
	}
	public function refresh(){
		if(this.isOpen_){
			
			var epoch:double = EZTimestamp.GetInstance().epoch;
			var space:int = (resetTime_ - epoch);
			updateTime(space);
			

			
			_front.enabled = true;
			_whiteText.enabled = true;
			_yellowText.enabled = true;
			
		}else{
			_front.enabled = false;
			_whiteText.enabled = false;
			_yellowText.enabled = false;
			_time.enabled = false;
			_slip.enabled = false;
			_mark.enabled = false;
		}
	
	}
	public function open(){
		this.isOpen_ = true;
		refresh();
	}
	public function close(){
		this.isOpen_ = false;
		refresh();
	}
	public function updateTime(space:int){
		space_ = space;
		if(space_ <= 0 || addMaxMp_ == 0){
			_time.enabled = false;
			_slip.enabled = false;
			_mark.enabled = false;
			if(mp_ > maxMp_){
				mp_ = maxMp_;
			}
			_whiteText.text = mp_.ToString() + "/"+ maxMp_.ToString();
			_front.fillAmount = mp_/(maxMp_);
		}else{
			
			var second:int  = space% 60;
			var minute:int  = (space/ 60)%60;
			var hour:int = space/ 3600;
			if(hour != 0){
				if(second%2 == 0){
					_time.text = "[f9ef67]"+hour.ToString("d2")+":"+minute.ToString("d2")+"[-]";
				}else{
					_time.text = "[f9ef67]"+hour.ToString("d2")+" "+minute.ToString("d2")+"[-]";
				}
			
				_time.enabled = true;
				_mark.enabled = false;
			}else if(minute != 0){
				_time.text = "[f9ef67]"+minute.ToString("d2")+"[-]";
				_mark.text = "[f9ef67]m[-]";
				_time.enabled = true;
				_mark.enabled = true;
			}else{
				_time.text = "[f9ef67]"+second.ToString("d2")+"[-]";
				_mark.text = "[f9ef67]s[-]";
				_time.enabled = true;
				_mark.enabled = true;
			
			}
			_whiteText.text = mp_.ToString() + "/"+ maxMp_.ToString();
			_yellowText.text = "[f9ef67]+"+addMaxMp_.ToString()+"[-]";
			_front.fillAmount = mp_/(maxMp_ + addMaxMp_);
			var s:float = maxMp_/(maxMp_ + addMaxMp_);
			_slip.gameObject.transform.localPosition = _begin.localPosition *(1-s) + _end.localPosition *s;
			_slip.enabled = true;
		}
	}
	public function Update(){
		if(this.isOpen_){
			var epoch:double = EZTimestamp.GetInstance().epoch;
			var space:int = (resetTime_ - epoch);
			if(space != space_){
				updateTime(space);
			}
		}
		
	}
}*/