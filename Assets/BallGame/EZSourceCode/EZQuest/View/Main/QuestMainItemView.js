#pragma strict

class QuestMainItemView extends MonoBehaviour{
	public var _title:UILabel = null;
	public var _progress:UILabel = null;
	public var _new:EZTeamSub = null;
	public var _box:BoxCollider = null;
	public var _bg:UISprite = null;
	public var _clear:UISprite = null;
	private var isOpen_:boolean = false; 
	private var pass_:float = 0.0f;
	private var max_:float = 0.0f;
	public function open(){ 
		isOpen_ = true;
		refresh();
	}
	
	public function close(){
		isOpen_ = false;
		refresh();
	}
	public function getSub():EZTeamSub{
		return this._new;
	}
	public function get title():String{
		return _title.text;
	
	}
	
	public function set title(value:String){
		_title.text = value;
	}
	
	private function set progress(value:String){
		_progress.text = value;
	}
	public function setProgress(pass:float, max:float){
		pass_ = pass;
		max_ = max;
		refresh();
	}
	private function refresh(){
		if(isOpen_){ 
			_progress.text = Mathf.FloorToInt(pass_).ToString() + "/" + max_.ToString();
			_box.enabled = true;
			_title.enabled = true;
			_bg.enabled = true; 
			_progress.enabled = true;  
			_new.open();
			Debug.LogWarning("aaa" + _new.isNew);
			if((pass_/ max_)>= 1.0f && !_new.isNew){
				_clear.enabled = true;
			}else{
				_clear.enabled = false;
			}	 
		}else{
			_box.enabled = false; 
			_clear.enabled = false; 
			_bg.enabled = false;
			_title.enabled = false;
			_progress.enabled = false;
			_new.close();
		}
	}
	
	
}