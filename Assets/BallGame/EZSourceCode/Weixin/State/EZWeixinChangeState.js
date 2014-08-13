#pragma strict

class EZWeixinChangeState extends State{
	private var ctrl_:EZWeixinCtrl = null;
	private var isOver_:boolean = false;
	public function EZWeixinChangeState(ctrl:EZWeixinCtrl){
		ctrl_ = ctrl;
	}
	public function start(){
		isOver_ = false;
		//var task:EZWindowTask = ctrl_.changeTask() as EZWindowTask;
		//TaskManager.PushBack(task, function(){
		//	if(task.okOrCancel){
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
				Debug.Log("uuid:"+ weixin.uuid);
				Debug.Log("hash:"+ weixin.hash);
				EZUserTable.GetInstance().setup(weixin.uuid, weixin.hash);
		//	}
			isOver_ =  true;
		//});
		
		//TaskManager.Run(task);
	}
	public function update(d:float):String{
		if(isOver_){
			return "go.logo";
		}
		return "";
		
	}
	
}