#pragma strict


class EZLeadSwapOpen extends StateWithEventMap{
	private var ctrl_:EZLeadCtrl = null;
	public function EZLeadSwapOpen(ctrl:EZLeadCtrl){
	
		addEvent("close", "close");
		ctrl_ = ctrl;
	}
	public function start(){
		
		Debug.LogWarning("EZLeadSwapOpen");
	}
}