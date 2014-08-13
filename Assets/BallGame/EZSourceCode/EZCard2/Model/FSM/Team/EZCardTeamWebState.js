#pragma strict

class EZCardTeamWebState extends State{

	private var ctrl_:EZCardCtrl;
	private var isOver_:boolean = false;
	public function EZCardTeamWebState(ctrl:EZCardCtrl){
		ctrl_ = ctrl;
	} 
	public function start(){
		ctrl_.inputClose();
		isOver_ = true;
		
		
	}
	public function over(){
		ctrl_.inputOpen();
	}
	public function update(d:float){
	
		if(isOver_){
			if(ctrl_.team.fsmPost == "ButtonInfo"){
				ctrl_.team.fsmPost = "";
				return "info.input";
			}
			
			if(ctrl_.team.fsmPost == "ButtonComp"){
				ctrl_.team.fsmPost = "";
				return "comp.input";
			}
			
			
			if(ctrl_.team.fsmPost == "ButtonSell"){
				ctrl_.team.fsmPost = "";
				return "sell.input";
			}
			
			if(ctrl_.team.fsmPost == "back"){
				ctrl_.team.fsmPost = "";
				return "back";
			}
		}
		
		return "";
	
	}
	
	

}