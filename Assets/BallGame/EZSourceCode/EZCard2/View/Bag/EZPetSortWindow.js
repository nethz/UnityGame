#pragma strict

class EZPetSortWindow extends MonoBehaviour{
	public var _view:EZCardViewBase = null;
	public var _updateBtns:EZCardUpdateBtn = null;
	public function Start(){
		_view.setEnabled(false);
	}
	public function open(){
		_view.setEnabled(true);
		if(_updateBtns){
			_updateBtns.updateColor();
		}
		this.SendMessage("disClickedBtn",SendMessageOptions.DontRequireReceiver);
	}
	public function close(){
		_view.setEnabled(false);
	};
	
	public function OnClick(){
		this.close();
	}
	
	
}