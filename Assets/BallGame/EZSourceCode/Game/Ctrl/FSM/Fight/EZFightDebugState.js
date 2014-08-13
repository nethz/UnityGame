#pragma strict
class EZFightDebugState extends State{
	private var context_:EZModelContext;
	public function EZFightDebugState(context:EZModelContext){
		context_ = context;
		
		
	} 
/*
	private var isOver_:boolean = false;
	
	private var task_:Task = null;
	private var dialog_:EZGameDialogView = null;
	private var touch_:boolean = false;
	public function touchTask(task:Task):Task{
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
	
	}
	public function EZFightDebugState(task:Task, context:EZModelContext, dialog:EZGameDialogView){
		context_ = context;
		task_ = task;
		dialog_ = dialog;
		
		
	} 
	//public function createTask(tl:TaskList, seat:EZSoul.Seat, pop:String, text:String){
	/*
		Debug.Log("ASDFSAFSADFASDFSD???????%#%@#$%@A");
		var time1:EZWaitTask = new EZWaitTask();
		time1.setAllTime(0.5f);
		TaskManager.PushFront(time1, function(){
			
			Debug.Log("ASDFSAFSADFASDFSDAFADFSDAF#$@#$@#%#$@%#%@#$%@A");
			EZPopCtrl.GetInstance().openFoe();
		});
		
		tl.push(touchTask(time1));
		
		
		if(!String.IsNullOrEmpty(pop)){
			Debug.Log(pop);
			var time2:EZWaitTask = new EZWaitTask();
			time2.setAllTime(0.5f);
			TaskManager.PushFront(time2, function(){
				EZPopCtrl.GetInstance().openWe(seat, pop);
			});
			
			var tt:Task = touchTask(time2);
		
			TaskManager.PushBack(tt, function(){
				EZPopCtrl.GetInstance().close();
			});
			
		
			tl.push(tt);
		}	
		
			
		
		//tl.push(dialog_.showTextTask(text));
		
		
		
		
		
	//}
	public function start(){
		
		context_._debug._box.doEnabled();
		
		
	 	isOver_ = false;
		var tl:TaskList = new TaskList();
		
		tl.push(task_);
	 	//var talk:EZDebugContext.Talk = context_._debug.nextTalk();
	 	//if(talk){
		//	createTask(tl, talk._seat, talk._weBattle, talk._first);
	 //	}
		
	
		
		
	
	
		
		TaskManager.PushBack(tl, function(){
			isOver_ = true;
		});
		
	 	TaskManager.Run(tl);
		
	}
	public function update(d:float):String{
		if(isOver_){
			return "fight.input";
		
		}
		return "";
	
	}
	function postEvent(evt:FSMEvent):String{
		if(evt.msg == "click"){
			Debug.Log("!!!!!!!!!!!");
			touch_ = true;
		
		}
		return "";
	}
	public function over(){
		
		context_._debug._box.doDisable();
		//Debug.LogWarning("view.input.disable");
		//EZPopCtrl.GetInstance().close();
		//ActionManager.Run("view.input.disable");
		//if(EZCrystalInGame.GetInstance()){
		//	EZCrystalInGame.GetInstance().close();
		//}
		}
	*/
	public function start(){
		context_._debug._box.doEnabled();
	}
	public function over(){
		context_._debug._box.doDisable();
	}
}
