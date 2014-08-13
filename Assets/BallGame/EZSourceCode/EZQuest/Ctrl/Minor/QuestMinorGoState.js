#pragma strict

class QuestMinorGoState extends StateWithEventMap{
	private var ctrl_:QuestCtrl = null;
	private var isOver_:boolean = false;
	public function QuestMinorGoState(ctrl:QuestCtrl){
		this.ctrl_ = ctrl;
	}
	
	public function start(){
		isOver_ = false;
		
		var tl:TaskList = new TaskList();
		var close:Task = ctrl_.main.closeTask();
		tl.push(close);
		
		

		var open:Task = ctrl_.minor.openTask();
		tl.push(open);
		
		
		TaskManager.PushBack(tl, function(){
			isOver_ = true;
		});
		
		TaskManager.Run(tl);
		
	}
	

	
	function update(d:float){
		if(isOver_){
			return "minor";
		}
		return "";
		
	}
	
}