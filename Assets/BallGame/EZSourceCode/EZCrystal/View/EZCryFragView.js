#pragma strict

class EZCryFragView extends MonoBehaviour{
	public var _number:UILabel;
	public var _button:EZCryFragButton;
	public var _black:UISprite;
	private var mode_:EZCryNormalCtrl.Mode = EZCryNormalCtrl.Mode.Select;
	
	class Frag{
		
		public var _self:int = 0;
		public var _other:int = 0;
		public function Frag(self:int, other:int){
			_self = self;
			_other = other;
			
		}
		public function count():int{
			return _self + _other;		
		}
		public function get self():int{
			return _self;
		
		}
		public function get other():int{
			return _other;
		}
	
	}
	private var max_:int = 10;
	private var has_:EZCryFragView.Frag = null;
	private var give_:int = 0;
	private var isOpen_:boolean = false;
	public function set max(value:int){
		max_ = value;
		refresh();
	}
	public function set has(value:JsonData.Frag){
		has_ = value;
		if(has_.self != 0){
			_button.setEnabled(true);
		}else{
			_button.setEnabled(false);
		}
		refresh();
	}
	
	public function get has():EZCryFragView.Frag{
		return has_;
	}
	public function get give():int{
		return give_;
	}
	public function setMode(mode:EZCryNormalCtrl.Mode){
		mode_ = mode;
		_button.setMode(mode_);
		refresh();
	}

	public function refresh(){
		if(isOpen_){
	   		 _number.enabled = true;
	   		 _black.enabled = true;
		    if(mode_  ==  EZCryNormalCtrl.Mode.Select){
				_number.text = has_.count().ToString() + "/" + max_.ToString();
				
			}else{
				_number.text = has_.self.ToString() + "/" + has_.count().ToString();
			
			}
		}else{
		
		    _number.enabled = false;
		    _black.enabled = false;
		}
		
		_button.refresh();
	}
	
	public function open(){
		isOpen_ = true;
	    _button.open();
	    refresh();
	}
	
	public function close(){
		isOpen_ = false;
		_button.close();
	    refresh();
	  
	}

}