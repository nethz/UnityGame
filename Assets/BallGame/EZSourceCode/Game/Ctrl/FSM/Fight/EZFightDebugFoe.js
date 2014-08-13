#pragma strict
class EZFightDebugFoe extends State{

	private var isOver_:boolean = false;
	//private var context_:EZModelContext;
	private var context_:EZModelContext;
	public function EZFightDebugFoe(context:EZModelContext){
		context_ = context;
		
		
	} 
	//private var dialog_:EZGameDialogView = null;
	//private var touch_:boolean = false;
	/*public function touchTask(task:Task):Task{
		var t:Task = new Task();
		var over:boolean = false;
		t.init = function(){
			touch_ = false;	
			TaskManager.PushBack(task, function(){
				over = true;
				
			});
			TaskManager.Run(task);
		};
		t.isOver = function():boolean{
			return over && touch_;
		};
		return t;
	
	}*/
	
	public function start(){
		
			Debug.Log("EZFightDebugFoe");
			
			isOver_ = false;
		//context_._debug._box.doEnabled();
		var time1:EZWaitTask = new EZWaitTask();
		time1.setAllTime(0.5f);
		TaskManager.PushFront(time1, function(){
			
			EZPopCtrl.GetInstance().openFoe();
		});
		TaskManager.PushBack(time1, function(){
			Debug.Log("start");
			isOver_ = true;
		});
		
		
	 
	 	TaskManager.Run(time1);
		
	}
	
	function postEvent(evt:FSMEvent):String{
		if(evt.msg == "click" && isOver_){
		
			return "fight.begin.we";
		
		}
		return "";
	}
	public function over(){
	//	EZPopCtrl.GetInstance().close();
		
	//	context_._debug._box.doDisable();
		//Debug.LogWarning("view.input.disable");
		//EZPopCtrl.GetInstance().close();
		//ActionManager.Run("view.input.disable");
		//if(EZCrystalInGame.GetInstance()){
		//	EZCrystalInGame.GetInstance().close();
		//}
	}

}
