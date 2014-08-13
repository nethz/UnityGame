#pragma strict


class EZFailCountdownState extends StateWithEventMap{
	private var isOver_:boolean = false;
	private var time_:float;
	private var context_:EZModelContext;
	private var speedup_:boolean = false;
	public function EZFailCountdownState(context:EZModelContext){
		context_ = context;
	}
	function start(){
		speedup_ = false;
		time_ = context_.countdown;
		EZGameFailView.GetInstance().open();
		EZGameFailView.GetInstance().countdown.open();
	}
	function update(d:float):String{
		
		if(!context_.pause){
			if(speedup_){
				time_-= d * context_.speedUp;
			}else{
				time_-= d;
			}
		}
		if(time_ <= 0){	
			return "fight.fail.over";
		}else{
			EZGameFailView.GetInstance().countdown.setNum(time_/context_.countdown * 11);
		}
		return "";
	}
	
	function postEvent(evt:FSMEvent){	
	
		if(context_.pause){
			return;
		}
		if(evt.msg == "speed_up"){
			this.speedup_ = true;
			time_--;
			if(time_<=0){
				time_ = 0;
			}
		}else if(evt.msg == "speed_down"){
			this.speedup_ = false;
		}
		return super.postEvent(evt);
	}
	public function over(){
		
		EZGameFailView.GetInstance().countdown.close();
	
	}
	
	
	
}