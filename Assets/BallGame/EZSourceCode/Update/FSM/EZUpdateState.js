#pragma strict

class EZUpdateState extends StateWithEventMap{


	public function EZUpdateState(){
		
		addEvent("weixin", "go.weixin");
	}
	
}