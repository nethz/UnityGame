#pragma strict


class EZPVPFightRunChatState extends StateWithEventMap{
	private var isOver_:boolean = false;
	private var context_:EZModelContext = null;
	function EZPVPFightRunChatState(context:EZModelContext){
		this.context_ = context;
	}
	private function send():Task{
		var task:Task = new Task();
		return task;
	
	}
	private function get data():JsonData.PVPAction{
		
		var action:JsonData.PVPAction = new JsonData.PVPAction();
		return action;
	}
	private function receive():Task{
		var task:Task = new Task();
		return task;
	}
	public function start(){
		var tl:TaskList = new TaskList();
		tl.push(send());
		tl.push(receive());
		
		TaskManager.PushBack(tl, function(){
			isOver_ = true;
			
		});
		TaskManager.Run(tl);
		
	
		
		
	}
	function update(d:float):String{
		if(isOver_){
			context_.action = "swap.bag1";
			return "rival.swap";
		}
		return "";
	}
}
