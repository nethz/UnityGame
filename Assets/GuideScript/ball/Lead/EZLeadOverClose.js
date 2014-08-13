#pragma strict


class EZLeadOverClose extends StateWithEventMap{
	private var ctrl_:EZLeadCtrl = null;
	public function EZLeadOverClose(ctrl:EZLeadCtrl){
	
		addEvent("open", "dialog");
		ctrl_ = ctrl;
	}
	
	
}