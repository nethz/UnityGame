#pragma strict

class EZGameFailBaseView extends MonoBehaviour{

	public var _panel :UIPanel = null;
	public var _boxes :BoxCollider[] = null;
	public function Awake(){
		if(_boxes.Length == 0){
			_boxes = System.Array.ConvertAll(
				this.gameObject.GetComponentsInChildren(BoxCollider), 
				function (component){component as BoxCollider;}
			);
		}
		
	}
	public function open(){
		setEnabled(true);
	}
	public function close(){
		setEnabled(false);
	}
	public function setEnabled(enabled:boolean){
		_panel.enabled = enabled;
		for(var j:int = 0; j<_boxes.length; ++j){
			
			_boxes[j].enabled = enabled;
		}
	}

}