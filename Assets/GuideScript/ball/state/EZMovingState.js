#pragma strict

class EZMovingState extends State{
	private var bm_: EZBallsManagerImpl = null;
	function EZMovingState(bm:EZBallsManagerImpl){
		this.bm_ = bm;
	}
	function start()
	{
	
		this.bm_.clearChange();
	
	}
	private function unlock(evt){
		
		var change:boolean = this.bm_.isChange();
		
		if(change)
		{
			return "group";
		}
		
		return "user";
	}
	function postEvent(evt:FSMEvent) {
	
		switch(evt.msg)
		{
		case 'relocking': 
			evt.execute();
		break;
		case 'moving':
			evt.execute();
			break;
		case 'unlock':
			evt.execute();
			return (this.unlock(evt) as String);
		}
		
		return "";
	};
	
};

