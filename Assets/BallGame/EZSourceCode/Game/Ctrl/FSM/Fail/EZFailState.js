#pragma strict


class EZFailState extends StateWithEventMap{
	private var isOver_:boolean = false;
	private var _time = 11.0f;
	private var context_:EZModelContext = null;
	function EZFailState(context:EZModelContext){
		context_ = context;
	
	}
	function start(){
		context_.back.setEnabled(false);
	}
	function update(d:float):String{
	/*	_time-=d;
		EZGameFailView.GetInstance().countdown.setNum(_time);
		if(_time <= 0)
		{	
			Debug.Log("asdf");
			return "game.over";
		}
		return "";
		*/
	}
	public function over(){
	
		context_.back.setEnabled(true);
		var push:Task = EZGameFailView.GetInstance().title.pushTask();
	
		TaskManager.Run(push);
		EZGameFailView.GetInstance().close();
	
	}
	
	
	
}