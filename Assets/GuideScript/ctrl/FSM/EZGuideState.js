#pragma strict

class EZGuideState extends StateWithEventMap{


	public function EZGuideState(){
		
		addEvent("weixin", "go.weixin");
	}
	
}