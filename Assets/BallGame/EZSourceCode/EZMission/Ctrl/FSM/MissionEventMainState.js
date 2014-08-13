#pragma strict

class MissionEventMainState extends StateWithEventMap{
	private var ctrl_:MissionCtrl = null;
	private var unfold_:boolean = false;
	public function MissionEventMainState(ctrl:MissionCtrl){
		ctrl_ = ctrl;
	}
	function start(){
		unfold_ = false;
	}
	function update(d:float):String{
	
		return "";
	}


	function postEvent(evt:FSMEvent){
	
		if(evt.msg == "object"){
		
			var item:MissionEventSonView = evt.obj.GetComponent.<MissionEventSonView>() as MissionEventSonView;
			if(item){
				var data:JsonData.EvtMission = item.data;
				var task:Task = EZMissionChecker.GetInstance().check(data.type, ctrl_._pveTitle); 
				if(task){
					TaskManager.Run(task);
				}
			}
		}else if(evt.msg == "back"){
			if(unfold_){ 
				var tsk:Task = ctrl_.foldTask(); 
				TaskManager.PushBack(tsk, function(){
					unfold_ = false; 
				});
				TaskManager.Run(tsk);
			}else{
				return "lobby";
			}
		
		}else if(evt.msg == "unfold"){
			unfold_ = true; 
		}else if(evt.msg == "fold"){
			 unfold_ = false;
		}
		return super.postEvent(evt);
	}
}