#pragma strict
class EZFightBeginInputState extends State{
	private var isOver_:boolean;
	private var context_:EZModelContext;
	private var task_:Task;
	public function EZFightBeginInputState(task:Task, context:EZModelContext){
		task_ = task;
		context_ = context;
	}
	
	public function start(){
		TaskManager.Run(task_);
	}
	public function postEvent(evt:FSMEvent){
		var ret:String = "";
		Debug.LogWarning(evt.msg);
		switch(evt.msg){
		case "attack":
		case "swap.bag1":
		case "swap.bag2":
			context_.action = evt.msg;
			ret = "fight.begin";
			break;
		}
		return ret;
	}
	
	public function over(){
	}
}
