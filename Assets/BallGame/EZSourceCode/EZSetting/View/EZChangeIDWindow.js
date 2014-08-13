#pragma strict

class EZChangeIDWindow extends MonoBehaviour{
	public var _windowShow:EZWindowShow = null;
	var _ok:EZButtonEnable = null;
	var _cancel:EZButtonEnable = null;
	var _input:EZInputEnable = null;
	var _box:BoxCollider = null;
	
	var _id:UILabel = null;
	var _name:UILabel = null;
	var _newId:UILabel = null;
	var _window:UISprite = null;
	var _bg:UISprite = null;
	private var isOpen_:boolean = false;
	private var name_:String = "";
	public function setup(name:String){
		name_ = name;
	}
	public function get newName():String{
		return _input.getInput();
	}
	public function Awake(){
		this.close();
	}
	function close(){
		this.isOpen_ = false;
		this.refresh();
	}
	function open(){
		_windowShow.shrink();
		this.isOpen_ = true;
		this.refresh();
		_windowShow.show();
	}
	function refresh(){
		if(isOpen_){
			_ok.open();
			_cancel.open();
			_input.open();
			_id.enabled = true;
			_name.enabled = true;
			_name.text = name_;
			_newId.enabled = true;
			_window.enabled = true;
			_bg.enabled = true;
			_box.enabled = true;
		}else{
			_ok.close();
			_cancel.close();
			_input.close();
			_id.enabled = false;
			_name.enabled = false;
			_newId.enabled = false;
			_window.enabled = false;
			_bg.enabled = false;
			_box.enabled = false;
		
		}
	}
}