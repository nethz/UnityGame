#pragma strict

class MovingState extends State{
	private var bm_: BallsManagerImpl = null;
	function MovingState(bm:BallsManagerImpl){
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

