#pragma strict
class EZFightDebugText extends State{

	private var isOver_:boolean = false;
	private var context_:EZModelContext;
	private var dialog_:EZGameDialogView = null;
	public function EZFightDebugText(context:EZModelContext, dialog:EZGameDialogView){
		context_ = context;
		dialog_ = dialog;
		
		
	} 
	
	public function start(){
		
			Debug.Log("EZFightDebugText");
			isOver_ = false;
		var talk:EZDebugContext.Talk = context_._debug.talk;
		if(talk && !String.IsNullOrEmpty(talk._first)){
			var task:Task = dialog_.showTextTask(talk._first);
			
			TaskManager.PushBack(task, function(){
				isOver_ = true;
			});
			
	 		TaskManager.Run(task);
		}else{
			isOver_ = true;
		}
		
		
		
		
	 
		
	}
	function update(d:float):String{
		if(isOver_){
			return "fight.input";
		}
		return "";
	}

	public function over(){
		context_._debug.next();
	
	}

}
