#pragma strict


class EZLeadMagicOpen extends StateWithEventMap{
	private var ctrl_:EZLeadCtrl = null;
	public function EZLeadMagicOpen(ctrl:EZLeadCtrl){
	
		addEvent("close", "close");
		ctrl_ = ctrl;
	}
	public function start(){
		
		Debug.LogWarning("EZLeadSwapOpen");
	}
}