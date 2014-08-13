#pragma strict


class EZLeadInfoClose extends StateWithEventMap{

	private var ctrl_:EZLeadCtrl = null;
	public function EZLeadInfoClose(ctrl:EZLeadCtrl){
		
		addEvent("open", "dialog");
		ctrl_ = ctrl;
	}

}