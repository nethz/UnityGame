#pragma strict

class EZCardTeamState extends StateWithEventMap{
	private var ctrl_:EZCardCtrl;
	public function EZCardTeamState(ctrl:EZCardCtrl){
		ctrl_ = ctrl;
	} 
	public function start(){
	
		ctrl_.setState(EZCardCtrl.State.Team);
		ctrl_.refresh();
	}
	public function over(){
	
		ctrl_.setState(EZCardCtrl.State.None);
	}
}