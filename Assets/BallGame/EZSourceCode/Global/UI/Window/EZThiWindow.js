#pragma strict
	class EZThiWindow extends MonoBehaviour{
	
	public var _windowShow:EZWindowShow = null;
	public var _window:UISprite;
	public var _background:UISprite;
	public var _left:EZWindowButton;
	public var _right:EZWindowButton;
	public var _mid:EZWindowButton;
	public var _label:UILabel;
	public var _title:UILabel;
	public var _message:UILabel;
	private var isOpen_:boolean = false;
	public var _backbox:BoxCollider;
	public function Awake(){
		close();
	
	}
	public function window(title:String, message:String, left:Function, mid:Function, right:Function, leftLabel:String, midLabel:String, rightLabel:String){
		close();
		_windowShow.shrink();
		if(_message == null || _title == null || String.IsNullOrEmpty(message)){
			_label.text = title;
			_label.enabled = true;
		}else{
			
			_title.text = title;
			_message.text = message;
			_title.enabled = true;
			_message.enabled = true;
		}
		
		_left.label = leftLabel;
		if(left){
			_left.callback = left;
			_left.open(true);
		}else{
			_left.open(false);
		}
		
		
		_right.label = rightLabel;
		if(right){
			_right.callback = right;
			_right.open(true);
		}else{
			_right.open(false);
		}
		
		
		_mid.label = midLabel;
		if(mid){
			
			_mid.callback = mid;
			_mid.open(true);
		}else{
			_mid.open(false);
		}
		
		
		
		_window.enabled = true;
		_background.enabled = true;
		_backbox.enabled = true;
		_windowShow.show();
		isOpen_ = true;
	}


	public function get isOpen():boolean{
		return isOpen_;
	}
	public function close(){
		_left.close();
		_mid.close();
		_right.close();
		
		_title.enabled = false;
		_message.enabled = false;
		_window.enabled = false;
		_label.enabled = false;
		_background.enabled = false;
		_backbox.enabled = false;
		isOpen_ = false;
	}
}