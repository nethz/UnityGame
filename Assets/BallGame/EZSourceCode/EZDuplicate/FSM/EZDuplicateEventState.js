#pragma strict
/*
class EZDuplicateEventState extends StateWithEventMap{
	
	private var ctrl_:EZDuplicateCtrl = null;
	private var nextState_:String = "";

	public function EZDuplicateEventState(ctrl:EZDuplicateCtrl){
		this.ctrl_ = ctrl;
		
		addEvent("pvp", "pvp_in");
		addEvent("pve", "pve_in");
	}
	
	
		function postEvent(evt:FSMEvent){
		
		if(evt.msg == "object"){
			var item:EZDuplicateItem = evt.obj.GetComponent(EZDuplicateItem) as EZDuplicateItem;
			if(item){
				
				ctrl_.select(item.data);
				this.nextState_ = "event_level_in";
			}
		}else if(evt.msg == "back"){
			var target:GameObject = GameObject.FindGameObjectWithTag("GoubalCtrl");
			if(target){
				target.SendMessage("OnAction", "back", SendMessageOptions.DontRequireReceiver);
			}
		}
		return super.postEvent(evt);
	}
	
	function update(d:float):String{
	
		return nextState_;
	}
	
	public function start(){
		Debug.Log("EZEventStart");
		
		nextState_ = "";
	}
	public function over(){
	
	}
}*/