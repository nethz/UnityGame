#pragma strict


class EZHomeGuide extends MonoBehaviour{
	
	public var _petPosition:EZPopPosition = null;
	public var _questPosition:EZPopPosition = null;
	public var _questMessagePosition:EZPopPosition = null;
	public var _team:String = "team";
	public var _comp:String = "comp";
	public var _quest:String = "quest";
	private var _canShowPop:boolean = true;
	public var _questMessage:String = "questMessage";
	public function open():EZCardCtrl.State{
	
		var tl:TaskList = new TaskList();
		var wait:EZWaitTask = new EZWaitTask();
		wait.setAllTime(1.0f);
		tl.push(wait);
		testTask(tl);
		TaskManager.Run(tl);
	}
	public function set canShowPop(value:boolean){
		_canShowPop = value;
	
	}
	public function testTask(tl:TaskList){
		if(addTask(tl, team())){
			return;
		}
		if(addTask(tl, comp())){
			return;
		}
		if(addTask(tl, quest())){
			return;
		}
		if(addTask(tl, questMessage())){
			return;
		}
	}
	
	public function addTask(tl:TaskList, task:Task){
		if(task != null){
			tl.push(task);
			return true;
		}
		return false;
	}
	private function packTask(task:Task){
		var pack:Task = new Task();
		var isOver:boolean = false;
		pack.init = function(){
			if(_canShowPop){
				TaskManager.PushBack(task, function(){
				isOver = true;
				});
				TaskManager.Run(task);
			}else{
				isOver = true;
			}
		};
		pack.isOver =function(){
		
			return isOver;
		};
		
		return pack;
	}
	
	public function team():Task{ 
		var guide:EZGuide = EZGuide.GetInstance();
		if(guide.doTeam()){
			return packTask(_petPosition.showTask(_team));
		}
		return null;
	}
	
	public function quest():Task{
		var guide:EZGuide = EZGuide.GetInstance();
		if(guide.doQuest()){
			return packTask(_questPosition.showTask(_quest));
		}
		return null;
	}
	
	public function questMessage():Task{
		var guide:EZGuide = EZGuide.GetInstance();
		if(guide.doQuestMessage()){
			return packTask(_questMessagePosition.showTask(_questMessage));
		}
		return null;
	}
	
	public function comp():Task{
		var guide:EZGuide = EZGuide.GetInstance();
		if(guide.doComp()&& _canShowPop){
			return packTask(_petPosition.showTask(_comp));
		}
		return null;
	}
}