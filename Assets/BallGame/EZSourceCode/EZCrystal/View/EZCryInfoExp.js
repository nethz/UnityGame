#pragma strict
class EZCryInfoExp extends MonoBehaviour{
	public var _front:UISprite;
	public var _lable:UILabel;
	public var _description:UILabel;
//	public var _level:UILabel;
	public var _back:UISprite;
	public var _barSide:UISprite;
	public var _lustre:UISprite;
	private var isOpen_:boolean = false;
	private var type_:int = -1;
	private var lv_:int = -1;
	private var exp_:float = 0.0f;
	private var maxExp_:float = 0.0f;
	public var _typeText:String[];
	//public var _levelText:String[];
	
	public function close(){	
		isOpen_ = false;
		refresh();
	}
	public function open(){
		isOpen_ = true;
		refresh();
	}
	public function setup(type:int, lv:int,  exp:float, maxExp:float){
		type_ = type;
		lv_ = lv;
		exp_ = exp;
		maxExp_ = maxExp;
		refresh();
	}
	public function setExpBar(bar:float){
		_front.fillAmount = bar;
	}
	public function refresh(){
		if(isOpen_){
			if(type_ == -1){
				_front.enabled = false;
				_lable.enabled = false;
				_description.enabled = false;
		//		_level.enabled = false;
				
				_back.enabled = true;
				_barSide.enabled = true;
				_lustre.enabled = true;
			}else{
				if(type_>=0 && type_<_typeText.Length )
					_description.text = _typeText[type_];
				_description.enabled = true;
				Debug.Log(lv_);
			//	_level.text = _levelText[lv_];// + (lv_+1).ToString();
			//	_level.enabled = true;
				GeekTweenValue.Begin(_front.gameObject, 0.1, _front.fillAmount,exp_/maxExp_,this.gameObject,"setExpBar");
				
				_front.enabled = true;
				_lable.text = Mathf.FloorToInt(exp_).ToString() + "/" +  Mathf.FloorToInt(maxExp_).ToString();
				
				_lable.enabled = true;
				
				_back.enabled = true;
				_barSide.enabled = true;
				_lustre.enabled = true;
			}
			
		}else{
			
			_front.enabled = false;
			_lable.enabled = false;
			_description.enabled = false;
			//_level.enabled = false;
			_back.enabled = false;
			_barSide.enabled = false;
			_lustre.enabled = false;
		}
	}
}