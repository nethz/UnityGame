#pragma strict

class EZDebugState extends State{


	private var ctrl_:EZUpdateCtrl = null;
	private var isOver_:boolean = false;
	public function EZDebugState(ctrl:EZUpdateCtrl){
		ctrl_ = ctrl;
	}
	public function start(){
		Debug.LogWarning("nono im debug state");
		if(!String.IsNullOrEmpty(ctrl_._uuid) && !String.IsNullOrEmpty(ctrl_._hash)){
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
				var weixin:JsonData.Weixin = EZWeixinTable.GetInstance().data;
				EZUserTable.GetInstance().setup(ctrl_._uuid, ctrl_._hash);
		}
	}
	public function update(d:float):String{
	
			return "load";
		
	}
}