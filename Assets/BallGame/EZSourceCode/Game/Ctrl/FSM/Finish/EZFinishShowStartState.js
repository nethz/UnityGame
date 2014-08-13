#pragma strict


class EZFinishShowStartState extends State{
	private var _isOver:boolean = false;
	
	private var loader_:EZLoader;
	function EZFinishShowStartState(loader:EZLoader){
		loader_ = loader;
	}
	function start(){
		
		var doc:JsonData.LevelDoc = loader_.loadDoc();
		GameWinView.GetInstance().setTitle(doc.title);
		
		_isOver = false;
		var tl:TaskList = new TaskList();
		var wait:EZWaitTask = new EZWaitTask();
		wait.setAllTime(1);
		tl.push(wait);
		GameWinView.GetInstance().title.open();
		var pull:Task = GameWinView.GetInstance().title.pullTask();
		tl.push(pull);
		var seal:Task = GameWinView.GetInstance().clear.sealTask();
		TaskManager.PushFront(seal, function(){
			GameWinView.GetInstance().clear.open();
		});
		tl.push(seal);
		tl.push(GameWinView.GetInstance().reward.bigCover.fadeinTask());
		
		TaskManager.PushBack(tl, function(){
			_isOver = true;
		});
		TaskManager.Run(tl);
	}
	function update(d:float):String{
		if(_isOver){
			return "finish.show.web";
		}
		return "";
	}
	
}