#pragma strict

class QuestMinorBackState extends StateWithEventMap{
	private var ctrl_:QuestCtrl = null;
	private var isOver_:boolean = false;
	public function QuestMinorBackState(ctrl:QuestCtrl){
		this.ctrl_ = ctrl;
	}
	
	public function start(){
		isOver_ = false;
		var tl:TaskList = new TaskList();
		var close:Task = ctrl_.minor.closeTask();
		tl.push(close);
		
		
		
		
		
		TaskManager.PushBack(tl, function(){
			isOver_ = true;
		});
		
		TaskManager.Run(tl);
	}
	

	
	function update(d:float){
		if(isOver_){
			return "main";
		}
		return "";
		
	}
	
}