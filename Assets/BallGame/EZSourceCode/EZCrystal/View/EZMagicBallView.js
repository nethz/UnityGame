#pragma strict
class EZMagicBallView extends MonoBehaviour{
	public var _ball:UISprite;
	public var _base:UISprite;
	public var _level:UILabel;
	public var _select:UISprite;
	public var _box:BoxCollider;
	public var _baseType:String[];
	public var _noBall:String;
	public var _hasBall:String;
	public var _noBase:String;
	public var _id:int = 0;
	public var _new:EZSub;
	private var selected_:boolean = false;
	private var illume_:boolean = false;
	private var lv_:int=-1;
	private var exp_:float=-1;
	private var max_:float=-1;
	
	private var isOpen_:boolean = false;
	
	public function get exp():int{
		return exp_;
	}
	
	public function get maxExp():int{
		return max_;
	}
	public function get id():int{
		return _id;
	}
	
	public function get lv():int{
		return lv_;
	}
	public function get illume(){
		return illume_;
	}
	
	public function set selected(value:boolean){
		selected_ = value; 
		refresh();
	}
	public function open(){
		isOpen_ = true;
		refresh();
	}
	public function close(){
		isOpen_ = false;
		refresh();
	}
	
	private function refresh(){
		if(isOpen_){
		
			_new.open();
			_ball.enabled = true;
			_base.enabled = true;
			_select.enabled = selected_;
			
			if(illume_){
				_box.enabled = !selected_;
				this._ball.spriteName = _hasBall;
				_level.text = "Level "+ (lv_ +1).ToString();
				_level.color = Color.white;
			}else{
				_box.enabled = false;
				this._ball.spriteName = _noBall;
				_level.color = Color.gray;
				_level.text = "Empty";
			}
			_level.enabled = true;
			
			this._ball.MakePixelPerfect();
			var lv:int = lv_;
			if(lv < 0 || lv >= _baseType.Length){
				this._base.spriteName = _noBase;
			}else{
				this._base.spriteName = _baseType[lv];
			}
			this._base.MakePixelPerfect();
		}else{
		
			_new.close();
			_box.enabled = false;
			_ball.enabled = false;
			_base.enabled = false;
			_level.enabled = false;
			_select.enabled = false;
		}
		
		
		
	}
	
	public function reset(){
		illume_ = false;
	}
	public function setup(subscript:EZSubscript, lv:int, exp:float, max:float){
		illume_ = true;
		lv_ = lv;
		exp_ = exp;
		max_ = max;
		refresh();
		_new.load(subscript, "b"+_id.ToString());
		
	}
	
	//private var is
}