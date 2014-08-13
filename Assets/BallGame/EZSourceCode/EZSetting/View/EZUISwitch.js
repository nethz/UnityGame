#pragma strict

class EZUISwitch extends MonoBehaviour{
	public var _windowShow:EZWindowShow = null;
	public var _widgets:UIWidget[];
	public var _colliders:Collider[];
	
	public function Awake(){
		close();
	}
	
	public function open(){
		if(_windowShow) _windowShow.shrink();
		setEnabled(true);
		if(_windowShow) _windowShow.show();
	}
	
	public function close(){
		setEnabled(false);
	}
	
	private function setEnabled(isEnable:boolean){
		for(var i:int = 0;i<_widgets.length;++i){
			_widgets[i].enabled = isEnable;
		}
		for(var j:int = 0;j<_colliders.length;++j){
			_colliders[j].enabled = isEnable;
		}
	}
}