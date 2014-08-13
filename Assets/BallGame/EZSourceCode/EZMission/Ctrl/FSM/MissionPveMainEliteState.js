#pragma strict

class MissionPveMainEliteState extends StateWithEventMap{
	private var ctrl_:MissionCtrl = null;
	public function MissionPveMainEliteState(ctrl:MissionCtrl){
		ctrl_ = ctrl;
		
		addEvent("back", "lobby");
	}
	function start(){
		Debug.Log("<============MissionPveMainEliteState================>");
	}
	function postEvent(evt:FSMEvent){
		if(evt.msg == "object"){
			Debug.Log(evt.obj.name);
			var item:PVEMainItemView = evt.obj.GetComponent.<PVEMainItemView>();
			var data:EZMissionMenuData = item.data;
			ctrl_.loadPveMinor(data.title, data.scene,MissionCtrl.Face.PveEliteLevel);
			return "pve.level.in";
		}else if(evt.msg == "normal"){
			return "pve.in";
		}
		return super.postEvent(evt);
	}
	
}