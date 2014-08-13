#pragma strict
class EZFightDebugWe extends State{

	private var isOver_:boolean = false;
	private var context_:EZModelContext;
	public function EZFightDebugWe(context:EZModelContext){
		context_ = context;
		
		
	} 
	
	public function start(){
	
			Debug.Log("EZFightDebugWe");
			isOver_ = false;
		var talk:EZDebugContext.Talk = context_._debug.talk;
		if(talk && !String.IsNullOrEmpty(talk._weBattle)){
		
			Debug.Log("EZFightDebugWe!!!!!!");
			var time2:EZWaitTask = new EZWaitTask();
			time2.setAllTime(0.5f);
			TaskManager.PushFront(time2, function(){
			Debug.Log("EZFightDebugWe!!!!!!????????");
				EZPopCtrl.GetInstance().openWe(talk._seat, talk._weBattle);
			});
				
			TaskManager.PushBack(time2, function(){
				isOver_ = true;
			});
			
	 		TaskManager.Run(time2);
		}else{
			isOver_ = true;
		}
		
		
		
		
	 
		
	}
	
	function postEvent(evt:FSMEvent):String{
		if(evt.msg == "click" && isOver_){
			return "fight.begin.text";
		
		}
		return "";
	}
	public function over(){
		EZPopCtrl.GetInstance().close();
		
	
	}

}
