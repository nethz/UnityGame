#pragma strict

class EZCardCompWindow extends MonoBehaviour{
	public var _panel:UIPanel = null;
	public var _box:BoxCollider = null;
	public var _buttons:BoxCollider[];
	
	private var isOpen_:boolean = false;
	
	public function Start(){
		this.close();
	
	}
	
	public function open(){
		isOpen_ = true;
		this.refresh();
	}
	
	public function close(){
		isOpen_ = false;
		this.refresh();
	}
	
	public function refresh(){
		if(isOpen_){ 
			_panel.enabled = true;
			_box.enabled = true;
			for(var i:int = 0; i< _buttons.Length; ++i){
				_buttons[i].enabled = true;
			}
		}else{ 
			_panel.enabled = false;
			_box.enabled = false;
			for(var j:int = 0; j< _buttons.Length; ++j){
				_buttons[j].enabled = false;
			}
		}
		
	}
	

}