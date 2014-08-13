#pragma strict
/*
class EZAlertWindow  extends MonoBehaviour{
	public enum Type{
		OK,
		OKCancel,
	};
	
	public enum Action{
		OK,
		Cancel,
	}
	public var _window:GameObject;
	public var _cancel:GameObject;
	public var _ok:GameObject;
	public var _label:UILabel;
	
	public var _background:EZBackground = null;
	private var callback_:Function = null;
	
	private static var instance_:EZAlertWindow = null;
	public static function GetInstance():EZAlertWindow{
		return this.instance_;
	}
	public function Awake(){
		this.instance_ = this;
		_window.SetActive(false);
		_cancel.SetActive(false);
		_ok.SetActive(false);
		_label.gameObject.SetActive(false);
	}
	
	public static function GetInstance():EZAlertWindow{
		return this.instance_;
	}
	public function start(type:EZAlertWindow.Type, text:String, callback:Function){
		callback_ = callback;
		_background.show(EZBackground.Type.Normal);
		_window.SetActive(true);
		_cancel.SetActive(true);
		_ok.SetActive(true);
		_label.gameObject.SetActive(true);
		_label.text = text;
	}
	public function onAction(act:EZAlertWindow.Action){
	
		_window.SetActive(false);
		_cancel.SetActive(false);
		_ok.SetActive(false);
		_label.gameObject.SetActive(false);
		_background.hide();
		if(callback_){
			callback_(act);
		}
	}

}*/