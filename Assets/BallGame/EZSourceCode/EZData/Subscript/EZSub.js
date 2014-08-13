#pragma strict
class EZSub extends MonoBehaviour{
	public var _new:UISprite;
	private var isOpen_:boolean = false;
	private var isNew_:boolean = false;
	private var subscript_:EZSubscript = null;
	private var key_:String = "";
	private var dirty_:boolean = false;
	public function Awake(){
		this.close();
	}
	public function OnPress(){
		doPress();
	}
	
	
	public function doPress(){
		if(isNew_){
			isNew_ = false;
			this.refresh();
		}
	}
	public function get isNew():boolean{
		return isNew_;
	}
	public function load(subscript:EZSubscript, key:String){
		key_ = key;
		subscript_ = subscript;
		dirty_ = true;
		this.refresh();
		
		
	}
		
	public function open(){
		isOpen_ = true;
		if(dirty_ && subscript_){
			if(subscript_.isNew(key_)){
				isNew_ = true;
				subscript_.touch(key_);
			}else{
				isNew_ = false;
			}
			dirty_ = false;			
		}
		this.refresh();
	}
	public function close(){
		isOpen_ = false;
		this.refresh();
	}
	
	public function refresh(){
		if(isOpen_){
			if(isNew_){
				_new.enabled = true;
			}else{
				_new.enabled = false;
			}
			
		}else{
			_new.enabled = false;
		}
	}
}