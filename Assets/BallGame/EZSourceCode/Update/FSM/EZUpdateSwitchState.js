#pragma strict

class EZUpdateSwitchState extends State{


	private var ctrl_:EZUpdateCtrl = null;
	public function EZUpdateSwitchState(ctrl:EZUpdateCtrl){
		ctrl_ = ctrl;
	}
	public function start(){
		if(ctrl_._debug){
			EZUserTable.GetInstance().doFirst();
		}
		
		
		if(EZUserTable.GetInstance().first){
			EZGuideTable.GetInstance().release();
			EZBagTable.GetInstance().release();
			EZMagicBallTable.GetInstance().release();
			EZMessageBagTable.GetInstance().release();
			EZMissionBagTable.GetInstance().release();
			EZPlayerTable.GetInstance().release();
			EZQuestBagTable.GetInstance().release();
			EZUserTable.GetInstance().release();
			EZTeamTable.GetInstance().release();
			EZCrystalTable.GetInstance().release();
			PlayerPrefs.DeleteAll();
		}
		
	}
	public function update(d:float):String{
			if( ctrl_.pause){
				return "";
			}
			//var guide:JsonData.Guide = EZGuideTable.GetInstance().data;
			if(EZUserTable.GetInstance().first){
				return "go.guide";
			}else{
				return "go.home";
			}
			return "";
		
	}
	
}