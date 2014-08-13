#pragma strict

class EZLeadUserState extends State{
	
	private var impl_:EZBallsManagerImpl = null;
	public function EZLeadUserState(impl:EZBallsManagerImpl){
		impl_ = impl;
		
	}
	function start(){
		Debug.Log("<=========EZLeadUserState===========>");
		
		impl_.leadShine(true);
	}
	function over(){
		impl_.leadShine(false);
	
	}
	public function update(d:float){
		impl_.lead.updateArrow(d);
	}
	function postEvent(evt:FSMEvent){
	
		var ret:String = "";
		switch(evt.msg){
			case "locking":
				var e:LockingEvent = evt as LockingEvent;
				var start:Vector2 = impl_.lead.start;
				if(e.xy.x == start.x && e.xy.y == start.y){
					e.execute();
				}
				break;
			case "moving":
				ret = "lead_moving";
				break;
			case "ignore":
				ret = "curtain";
				break;
			case "game_over":
				ret = "game_over";
				break;
		}
		return ret;
	
	
	}
}