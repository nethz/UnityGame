#pragma strict
class EZFightDebugInput extends State{

	private var isOver_:boolean = false;
	//private var context_:EZModelContext;
	private var task_:Task = null;
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
	public function EZFightDebugInput(task:Task){
	
		task_ = task;
		TaskManager.PushBack(task_, function(){
			isOver_ = true;
		});
		
		
		
	} 
	
	public function start(){
		
		//context_._debug._box.doEnabled();
		
		
	 	isOver_ = false;
		
		
	 	TaskManager.Run(task_);
		
	}
	public function update(d:float):String{
		if(isOver_){
			return "fight.begin.foe";
		
		}
		return "";
	
	}
	/*function postEvent(evt:FSMEvent):String{
		if(evt.msg == "click"){
			Debug.Log("!!!!!!!!!!!");
			touch_ = true;
		
		}
		return "";
	}*/
	public function over(){
		
	//	context_._debug._box.doDisable();
		//Debug.LogWarning("view.input.disable");
		//EZPopCtrl.GetInstance().close();
		//ActionManager.Run("view.input.disable");
		//if(EZCrystalInGame.GetInstance()){
		//	EZCrystalInGame.GetInstance().close();
		//}
	}

}
