#pragma strict

class EZCardTeamInputState extends State{
	
	private var ctrl_:EZCardCtrl;
	public function EZCardTeamInputState(ctrl:EZCardCtrl){
		ctrl_ = ctrl;
	
	} 
	public function start(){
		ctrl_.refresh();
	}
	public function update(d:float){
		return "";
	
	}
	function postEvent(evt:FSMEvent){
		if(evt.msg == "Bag1"){
			ctrl_.team.select(EZSoul.Seat.WeBag1);
			ctrl_.refresh();
		}else if(evt.msg == "Bag2"){
			ctrl_.team.select(EZSoul.Seat.WeBag2);
			ctrl_.refresh();
		}else if(evt.msg == "Battle"){
			ctrl_.team.select(EZSoul.Seat.WeBattle);
			ctrl_.refresh();
		}else if(evt.msg == "back"){
			return "back";
		}else if(evt.msg == "ButtonInfo"){
			return "info.input";
		}else if(evt.msg == "ButtonComp"){
			return "comp.input";
		}else if(evt.msg == "ButtonSell"){
			return "sell.input";
		}
	
		
		return "";
	}
	

}