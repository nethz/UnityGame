#pragma strict
class EZWindow extends MonoBehaviour{
	enum Mode{
		OkCancel,
		TouchNext,
	}
	public var _waringTrueWindow:EZWindowShow = null;
	public var _scaleTime:float = 0.2f;
	public var _scaleMethod:GeekTweener.Method = GeekTweener.Method.Linear;
	public var _arrow:EZWindowArrow;
	public var _window:UISprite;
	public var _background:UISprite;
	public var _backbox:BoxCollider;
	public var _ok:EZWindowButton;
	public var _cancel:EZWindowButton;
	public var _label:UILabel;
	public var _title:UILabel;
	public var _message:UILabel;
	public var _defaultOk:String;
	public var _defaultCancel:String;
	
	private var isOpen_:boolean = false;
	
	public function get isOpen(){
		return isOpen_;
	}
	public function Awake(){
		close();
	
	}
	
	public function okCancel(title:String, message:String, ok:Function, cancel:Function, okLabel:String, cancelLanbel:String){
		close();
		_waringTrueWindow.shrink();
		if(_message == null || _title == null || String.IsNullOrEmpty(message)){
			_label.text = title;
			_label.enabled = true;
		}else{
			
			_title.text = title;
			_message.text = message;
			_title.enabled = true;
			_message.enabled = true;
		}
		_ok.callback = ok;
		if(String.IsNullOrEmpty(okLabel)){
			_ok.label = _defaultOk;
		}else{
			_ok.label = okLabel;
		}
		_ok.open(true);
		_cancel.callback = cancel;
		_cancel.open(true);
		if(String.IsNullOrEmpty(cancelLanbel)){
			_cancel.label = _defaultCancel;
		}else{
			_cancel.label = cancelLanbel;
		}
		_window.enabled = true;
		_background.enabled = true;
		_backbox.enabled = true;
		_waringTrueWindow.show();
		isOpen_ = true;
	}
	public function touchNext(title:String, message:String, touch:Function){
		close();
		_waringTrueWindow.shrink();
		if(_message == null || _title == null || String.IsNullOrEmpty(message)){
			_label.text = title;
			_label.enabled = true;
		}else{
			
			_title.text = title;
			_message.text = message;
			_title.enabled = true;
			_message.enabled = true;
		}
		
		_window.enabled = true;
		_arrow.callback = touch;
		_arrow.open();
		_background.enabled = true;
		_backbox.enabled = true;
		_waringTrueWindow.show();
		isOpen_ = true;
	}
	public function touchText(title:String, message:String){
		_waringTrueWindow.shrink();
		if(_message == null || _title == null || String.IsNullOrEmpty(message)){
			_label.text = title;
			_label.enabled = true;
			_title.enabled = false;
			_message.enabled = false;
		}else{
			
			_title.text = title;
			_message.text = message;
			_title.enabled = true;
			_message.enabled = true;
			_label.enabled = false;
		}
		_waringTrueWindow.show();
		isOpen_ = true;
	}
	
	public function close(){
		_cancel.close();
		_ok.close();
		_arrow.close();
		_arrow.callback = null;
		_window.enabled = false;
		_label.enabled = false;
		if(_title)
			_title.enabled = false;
		if(_message)
			_message.enabled = false;
		_background.enabled = false;
		_backbox.enabled = false;
		isOpen_ = false;
	}
	
}