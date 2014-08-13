#pragma strict
/*
class EZDuplicatePveLevelState extends StateWithEventMap{

	private var ctrl_:EZDuplicateCtrl = null;
	private var nextState_:String = "";
	public function EZDuplicatePveLevelState(ctrl:EZDuplicateCtrl){
		ctrl_ = ctrl;
		addEvent("pvp", "pvp_in");
		addEvent("event", "event_in");
		addEvent("back", "pve_in");
	}
	
	public function start(){
	
		nextState_ = "";
		//ctrl_.showBackground();
	}
	
	function postEvent(evt:FSMEvent){
		
		if(evt.msg == "object"){
			var level:EZDuplicateLevel = evt.obj.GetComponent(EZDuplicateLevel) as EZDuplicateLevel;
			if(level){
				ctrl_.select(level.data);
				nextState_ = "goto";
			
			}
		}
		return super.postEvent(evt);
	}
	public function update(d:float){
		return nextState_;
	}
	public function over(){
		
		ctrl_.hideBackground();
	}
	
}*/