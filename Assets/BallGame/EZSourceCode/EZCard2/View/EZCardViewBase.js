#pragma strict

class EZCardViewBase extends MonoBehaviour{

	private var widgets_ :UIWidget[] = null;
	private var boxes_ :BoxCollider[] = null;
	public var _panels:UIPanel[];
	public function Awake(){
		if(_panels.Length == 0){
			widgets_ = System.Array.ConvertAll(
				this.gameObject.GetComponentsInChildren(UIWidget), 
				function (component){component as UIWidget;}
				);
			}
		boxes_ = System.Array.ConvertAll(
			this.gameObject.GetComponentsInChildren(BoxCollider), 
			function (component){component as BoxCollider;}
			);
	}
	
	public function setEnabled(enabled:boolean){
		
		if(_panels.Length == 0){
			for(var i:int = 0; i<widgets_.length; ++i){
				widgets_[i].enabled = enabled;
				
			}
		}else{
			for(var n:int =0; n< _panels.Length; ++n){
				_panels[n].enabled = enabled;
			}
		}
		for(var j:int = 0; j<boxes_.length; ++j){
			boxes_[j].enabled = enabled;
		}
	}

}