#pragma strict

class QuestMinorState extends StateWithEventMap{
	private var ctrl_:QuestCtrl = null;
	private var goLevel_:boolean = false;
	private var goPet_:boolean = false;
	private var goTo_:String = "";
	private var unfold_:boolean = false;
	public function QuestMinorState(ctrl:QuestCtrl){
		this.ctrl_ = ctrl;
		//addEvent("back", "minorBack"); 
		addEvent("NoBagComp", "go.pet");
		addEvent("NoBagMax", "go.shop");
	}
	
	public function start(){ 
		goLevel_ = false;
		goPet_ = false;
		goTo_ = "";
		unfold_ = false;
		ctrl_.minor.open();
	} 
	public function update(d:float):String{ 
		if(goLevel_){
			return "go.level";
		}else if(goPet_){
			return "go.pet";
		}
		return goTo_;
	}

	function goMission(data:JsonData.QuestItem, title:String){
		var task:Task = EZMissionChecker.GetInstance().check(data.mission.type, title); 
		TaskManager.Run(task);
		
	}
	function goTo(goTo:String, title:String, message:String){
		var window:EZWindowTask = ctrl_.goToWindowTask(title, message) as EZWindowTask;
		TaskManager.PushBack(window, function(){  
			if(window.okOrCancel){
					goTo_ = goTo;
				}
			});
		TaskManager.Run(window);
	
	}
	function postEvent(evt:FSMEvent){
	 	if(evt.msg == "object"){
			var view:QuestRewardCardView = evt.obj.GetComponent(QuestRewardCardView) as QuestRewardCardView;
			if(view){
				var data:JsonData.QuestItem = view.data;
				if(data.mode == "card"){
					goMission(data, view.title);
				}else if(data.mode == "mission"){
					goMission(data, view.title);
				}else if(data.mode == "bag" || data.mode == "ap"){
					goTo("go.shop", view.title, view.message);
				}else if(data.mode == "diamond_egg" || data.mode == "money_egg"){
					goTo("go.egg", view.title, view.message);
				}else if(data.mode == "magic"|| data.mode == "class0" ||data.mode == "class1" ||data.mode == "class2" ||data.mode == "class3" ||data.mode == "class4" ||data.mode == "class5" ){
					goTo("go.mission", view.title, view.message);
				}else if(data.mode == "magic_ball" || data.mode == "chip"){
					goTo("go.crystal", view.title, view.message);
				}else if(data.mode == "pet" || data.mode == "affix"||data.mode == "weixin" ){
					goTo("go.pet", view.title, view.message);
				}else if(data.mode == "bind"||data.mode == "invitation"){
					goTo("go.setting", view.title, view.message);
				}
			}
		}else if(evt.msg == "back"){
			if(unfold_){ 
				var tsk:Task = ctrl_.minor.foldTask(); 
				TaskManager.PushBack(tsk, function(){
					unfold_ = false; 
				});
				TaskManager.Run(tsk);
			}else{
				return "minorBack";
			}
		}else if(evt.msg == "unfold"){
			unfold_ = true; 
		}else if(evt.msg == "fold"){
			 unfold_ = false;
		}else if(evt.msg == "fullAp"){
			ctrl_.fullAp();
		}
		
		
		return super.postEvent(evt);
	}

}