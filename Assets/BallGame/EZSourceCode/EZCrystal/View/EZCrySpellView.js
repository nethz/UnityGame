#pragma strict
class EZCrySpellView extends MonoBehaviour{
	public var _icon:UISprite;
	public var _select:UISprite;
	public var _box:BoxCollider;
	public var _sub:EZSub;
	private var selected_:boolean;
	private var isOpen_:boolean = false;
	private var illume_:boolean = false;
	
	public var _id:int = 0;
	public function get id():int{
		return _id;
	}
	public function get icon():String{
		return _icon.spriteName;
	}
	public function Awake(){
		this.selected_ = false;
	}
	
	public function get selected():boolean{
	    return selected_;
	}
	
	public function reset(){
		illume_ = false;
	}	
	
	public function get illume(){
		return illume_;
	}
	
	public function setup(subscript:EZSubscript, illume:boolean){
		illume_ = illume;
		if(subscript){
			_sub.load(subscript, "c" + _id.ToString());
		}
		refresh();
	}
	
	public function set selected(value:boolean){
	    selected_ = value;
		refresh();
	}
	
	private function refresh(){
		if(isOpen_){
			_icon.enabled = true;
			_sub.open();
			if(illume_){
				if(selected_){
					_box.enabled = false;
				}else{
					_box.enabled = true;
				}
				_icon.color.a = 1.0f;
			}else{
				_box.enabled = false;
				_icon.color.a = 0.3f;
			}
			_select.enabled = selected_;
			
			
		}else{
			_sub.close();
			_select.enabled = false;
			_box.enabled = false;
			_icon.enabled = false;
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
}