#pragma strict

class EZHeroLoadingState extends StateWithEventMap{
	private var isGuide_:boolean = false;
	
	public function EZHeroLoadingState(isGuide:boolean){
		isGuide_ = isGuide;
		//addEvent("loaded", "idle");
	}
	public function start(){
	}
	function postEvent(evt:FSMEvent)
	{
		if(evt.msg == "loaded"){
			if(isGuide_){
				return "stop";
			}else{
				return "idle";
			}
		}
		return super.postEvent(evt);
	}

}