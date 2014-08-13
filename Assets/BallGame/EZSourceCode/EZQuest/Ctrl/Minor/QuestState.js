#pragma strict

class QuestState extends StateWithEventMap{
	public function QuestState(){
		addEvent("weixin", "go.weixin");
	}
	
}