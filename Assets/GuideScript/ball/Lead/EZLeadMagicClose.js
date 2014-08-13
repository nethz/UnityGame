#pragma strict

class EZLeadMagicClose extends StateWithEventMap{
	private var ctrl_:EZLeadCtrl = null;
	public function EZLeadMagicClose(ctrl:EZLeadCtrl){
		
		addEvent("open", "dialog");
		ctrl_ = ctrl;
	}	
	public function start(){
		
		Debug.LogWarning("EZLeadMagicClose");
	}
}