#pragma strict

class EZCryButtons extends MonoBehaviour{
	
	
	var _comp:EZCryButton = null;
	var _give:EZCryButton = null;
	var _cancel:EZCryButton = null;
	var _label:UILabel = null;
	private var isOpen_:boolean = false;
	var _mode = EZCryNormalCtrl.Mode.Give;
	public function refresh(){
		if(isOpen_){
			if(_mode == EZCryNormalCtrl.Mode.Give){
				_cancel.isEnabled = true;
				_label.enabled = true;
				_comp.isEnabled = false;
				_give.isEnabled = false;
			}else{
				_cancel.isEnabled = false;
				_label.enabled = false;
				_comp.isEnabled = true;
				_give.isEnabled = true;
			}
		}else{
			_label.enabled = false;
			_cancel.isEnabled = false;
			_comp.isEnabled = false;
			_give.isEnabled = false;
		}
	}
	public function setMode(mode:EZCryNormalCtrl.Mode){
		_mode = mode;
		refresh();
	}
	public function close(){
		isOpen_ = false;
		refresh();
	}
	public function open(){
		isOpen_ = true;
		refresh();
	}
}