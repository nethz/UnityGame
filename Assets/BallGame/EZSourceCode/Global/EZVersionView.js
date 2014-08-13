#pragma strict

class EZVersionView extends MonoBehaviour{
	public var _label:UILabel = null;
	public function Start(){
		
		if(Debug.isDebugBuild && EZUpdateTable.GetInstance()){
			_label.text =  EZUpdateTable.GetInstance().version + ".debug";
		}else{
		
			_label.text =  EZUpdateTable.GetInstance().version;
		
		}
	}
	
}