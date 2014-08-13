#pragma strict

class MissionPveMainState extends StateWithEventMap{
	private var ctrl_:MissionCtrl = null;
	public function MissionPveMainState(ctrl:MissionCtrl){
		ctrl_ = ctrl;
		
		addEvent("back", "lobby");
	}
	function start(){
	}
	function postEvent(evt:FSMEvent){
		if(evt.msg == "object"){
			Debug.Log(evt.obj.name);
			var item:PVEMainItemView = evt.obj.GetComponent.<PVEMainItemView>();
			var data:EZMissionMenuData = item.data;
			ctrl_.loadPveMinor(data.title, data.scene,MissionCtrl.Face.PveLevel);
			return "pve.level.in";
		}else if(evt.msg == "elite"){
			return "pve.eliteIn";
		}
		return super.postEvent(evt);
	}
	
}