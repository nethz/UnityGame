#pragma strict
class EZCryInfoBall extends MonoBehaviour{
	public var _ball:UISprite;
	public var _base:UISprite;
	public var _pattern:UISprite;
	public var _ballList:String[];
	public var _baseList:String[];
	public var _noBall:String;
	public var _noBase:String;
	private var type_:int = -1;
	private var lv_:int = -1;
	private var isOpen_:boolean = false;
	public function close(){
		isOpen_= false;
		this.refresh();
	}
	public function setup(type:int, lv:int){
		type_ = type;
		lv_ = lv;
		this.refresh();
	}
	public function open(){
		
		isOpen_= true;
		this.refresh();
	}
	public function refresh(){
		if(isOpen_){
			_ball.enabled = true;
			_base.enabled = true;
			_pattern.enabled = true;
			if(type_ < 0 || type_ >= _ballList.Length){
				_ball.spriteName = _noBall;
			}else{
				_ball.spriteName = _ballList[type_];
			}
			
			this._ball.MakePixelPerfect();
			if(lv_ < 0 || lv_ >= _baseList.Length){
				_base.spriteName = _noBase;
			}else{
				_base.spriteName = _baseList[lv_];
			}
			this._base.MakePixelPerfect();
		}else{
			_ball.enabled = false;
			_base.enabled = false;
			_pattern.enabled = false;
		}
	}
}