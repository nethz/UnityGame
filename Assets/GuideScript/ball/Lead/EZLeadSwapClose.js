#pragma strict

class EZLeadSwapClose extends StateWithEventMap{
	private var ctrl_:EZLeadCtrl = null;
	public function EZLeadSwapClose(ctrl:EZLeadCtrl){
		
		addEvent("open", "dialog");
		ctrl_ = ctrl;
	}	
	public function start(){
		
		Debug.LogWarning("EZLeadSwapClose");
	}
}