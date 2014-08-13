#pragma strict


class EZFailTitleState extends StateWithEventMap{
	private var isOver_:boolean = false;
	private var loader_:EZLoader = null;
	private var context_:EZModelContext = null;
	function EZFailTitleState(loader:EZLoader, context:EZModelContext){
		context_ = context;
		loader_ = loader;
	}
	function start(){
		isOver_ = false;
		var doc:JsonData.LevelDoc = loader_.loadDoc();
		EZGameFailView.GetInstance().setup(doc.title);
		var pull:Task = EZGameFailView.GetInstance().title.pullTask();
		TaskManager.PushBack(pull, function(){
			isOver_ =  true;
		});
		TaskManager.Run(pull);
	}
	function update(d:float):String{
		if(isOver_){
			context_.pause = false;
			return "fight.fail.revive";
		}
		return "";
	}

	
	
	
}