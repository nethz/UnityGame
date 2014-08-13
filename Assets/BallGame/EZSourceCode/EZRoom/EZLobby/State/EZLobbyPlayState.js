#pragma strict

class EZLobbyPlayState  extends StateWithEventMap{

	private var lobby_:EZLobbyCtrl = null;
	
	
	
	public function EZLobbyPlayState(lobby:EZLobbyCtrl){
		lobby_ = lobby;
		
		addEvent("mission", "play.mission");
		addEvent("MoneyButton", "play.shop");
		addEvent("quest", "play.quest");
		addEvent("SetButton", "play.setting");
		addEvent("crystal", "play.crystal");
		addEvent("pet", "play.pet");
		addEvent("egg", "play.egg");
		addEvent("news_web", "web.news");
		addEvent("quest_web", "web.quest");
		addEvent("weixin", "play.weixin");
		addEvent("active", "active");
	}
	//public function update(d:float){
	//	return "play.shop";
	//}
	public function start(){
		var guide:EZGuide = EZGuide.GetInstance();
		Debug.LogWarning("EZLobbyPlayState");
		guide.account();
	}
	function postEvent(evt:FSMEvent){
		Debug.Log(evt.msg);
		if(evt.msg == "news_message"){
			EZMessageWindow.GetInstance().open(EZMessageBagTable.Mode.News);
		}else if(evt.msg == "quest_message"){
			EZMessageWindow.GetInstance().open(EZMessageBagTable.Mode.Quest);
		}else if(evt.msg == "receive_message" ){
			TaskManager.Run(lobby_.receiveMessage());
		}
		
		
			 
		return super.postEvent(evt);
	}
	
}