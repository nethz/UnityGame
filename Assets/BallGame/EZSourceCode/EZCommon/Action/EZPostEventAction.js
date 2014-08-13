#pragma strict

class EZPostEventAction extends ActionObj{
	private var fsm_:FSM;
	private var evt_:FSMEvent;
	public function EZPostEventAction(fsm:FSM){
		fsm_ = fsm;
		evt_ = new FSMEvent();
		this.execute = function(){
			fsm_.postEvent(evt_);
		};
		
	}
	public function set msg(value:String){
		evt_.msg = value as String;
	}
	
	

}