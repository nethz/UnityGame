#pragma strict


class EZCardGuide extends MonoBehaviour{
	public var _compMain:EZPopPosition = null;
	public var _comp:String = "comp";
	public function open(){
	
		var tl:TaskList = new TaskList();
		var wait:EZWaitTask = new EZWaitTask();
		wait.setAllTime(1.0f);
		tl.push(wait);
		var state:EZCardCtrl.State = testTask(tl);
		TaskManager.Run(tl); 
		return state;
	}
	
	public function testTask(tl:TaskList):EZCardCtrl.State{
		if(addTask(tl, team())){
			return EZCardCtrl.State.Team;
		}
		if(addTask(tl, comp())){
			return EZCardCtrl.State.Comp;
		}
		
		return EZCardCtrl.State.None;
	 
	 
	}
	
	public function addTask(tl:TaskList, task:Task){
		if(task != null){
			tl.push(task);
			return true;
		}
		return false;
	}
	
	public function team():Task{
		
		var guide:EZGuide = EZGuide.GetInstance();
		if(guide.doTeam()){
			return null;
			//var task:Task = _pet.showTask(_team);
		//	return task;
		}
		return null;
		
	}
	
	public function comp():Task{
		var guide:EZGuide = EZGuide.GetInstance();
		if(guide.doComp()){
			var task:Task = _compMain.showTask(_comp);
			return task;
		
		}
		
	
	}
}