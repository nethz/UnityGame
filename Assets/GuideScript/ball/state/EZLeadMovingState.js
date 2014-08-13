#pragma strict

class EZLeadMovingState extends State{
	private var impl_: EZBallsManagerImpl = null;
	function EZLeadMovingState(impl:EZBallsManagerImpl){
		this.impl_ = impl;
	}
	
	function start(){
		Debug.Log("EZLeadMovingState");
		this.impl_.clearChange();
	}
	private function unlock(evt){
		
		var change:boolean = this.impl_.isChange();
		
		if(change){
			if(impl_.compare()){
				return "lead_in_group";
			}
			return "lead_back";
		}
		
		return "lead_in_user";
	}
	function postEvent(evt:FSMEvent) {
	
		switch(evt.msg){
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
	
	
	public function update(d:float){
		impl_.lead.updateArrow(d);
	}
	
};

