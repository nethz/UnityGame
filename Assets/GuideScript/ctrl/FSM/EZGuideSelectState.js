#pragma strict

class EZGuideSelectState extends StateWithEventMap{
	private var ctrl_:EZGuideCtrl = null;
	private var isOver_:boolean = false;
	
	public function EZGuideSelectState(ctrl:EZGuideCtrl){
		ctrl_ = ctrl;
	}
	
	public function start(){
		isOver_ = false;
		Debug.Log("EZGuideSelectState start!!!");
		ctrl_._select.showIndicate();
		//var close:Task = ctrl_._puzzle.closeTask();
		//TaskManager.Run(close);
	}
	
	public 	function postEvent(evt:FSMEvent){
		if(evt.msg == "next"){
			ctrl_._select.showSelect();
		}
		if(evt.msg == "boy"){
			ctrl_._select.switchSex(true);
		}
		if(evt.msg == "girl"){
			ctrl_._select.switchSex(false);
		}
		if(evt.msg == "sexOK"){
			ctrl_._select.openNameWindow();
		}
		if(evt.msg == "nameOK"){
			if(ctrl_._select.heroName != ""){
				var hero:EZGuideHeroData = new EZGuideHeroData();
				hero.sex = ctrl_._select.heroSex;
				hero.name = ctrl_._select.heroName;
				ctrl_.hero = hero ;
				
				var table:EZUserTable = EZUserTable.GetInstance();
				if(ctrl_.hero.sex){
					table.avatar = "boy";
				}else{
					table.avatar = "girl";
				}
				table.userName = ctrl_.hero.name;
				Debug.Log("name is: " + ctrl_.hero.name);
				Debug.Log("sex is: " + ctrl_.hero.sex);
				isOver_ = true;
			}else{
				Debug.Log("Hero's name must not emputy!!!");
			}
		}
		if(evt.msg == "nameCancel"){
			ctrl_._select.closeNameWindow();
		}
		return super.postEvent(evt);
	}
	
	public function update(d:float){
		if(isOver_){
			return "go.game";
		}
		return "";
	}
	
}