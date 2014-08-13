#pragma strict

class MissionPveLevelMainState extends StateWithEventMap{
	private var ctrl_:MissionCtrl = null;
	
	public function MissionPveLevelMainState(ctrl:MissionCtrl){
		ctrl_ = ctrl;
	}
	
	
	
	public function start(){
		Debug.Log("MissionPveLevelMainState");
	}
	
	function postEvent(evt:FSMEvent){
		if(evt.msg == "object"){
			var item:PVEMinorItemView = evt.obj.GetComponent(PVEMinorItemView) as PVEMinorItemView;
			if(item){
				var data:JsonData.Mission = item.data;
				var task:Task = EZMissionChecker.GetInstance().check(data.type, ctrl_._pveTitle); 
				TaskManager.Run(task);
			}
		}else if(evt.msg == "normal"){
			return "pve.in";
		}else if(evt.msg == "elite"){
			return "pve.eliteIn";
		}else if(evt.msg == "back"){
			Debug.Log("<===========ctrl_.elite===============>" + ctrl_.elite);
			if(ctrl_.elite){
				return "pve.eliteIn";
			}else{
				return "pve.in";
			}
		}
		if(evt.msg == "fullAp"){
			ctrl_.fullAp();
		}
		return super.postEvent(evt);
	}
	
	public function over(){
		Debug.Log(" over MissionPveLevelMainState");
	}

}