#pragma strict

class EZLobbyNewsState extends State{
	private var isOver_:boolean = false;
	private var mode_:EZMessageBagTable.Mode =  EZMessageBagTable.Mode.News;
	private var ctrl_:EZLobbyCtrl = null;
	public function EZLobbyNewsState(ctrl:EZLobbyCtrl, mode:EZMessageBagTable.Mode){
		ctrl_ = ctrl; 
		mode_ = mode;
	}
	public function start(){
	
		isOver_ =false;
		var tl:TaskList = new TaskList();
		
		var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
		
		loading.time = 0.3;
		loading.alpha = 0.5;
		loading.text = EZDictionary.LookUp("!loading");
		tl.push(loading);
		
		var receive:WebLoaderTask = EZMessageBagTable.GetInstance().receive(mode_);
		tl.push(receive);
		TaskManager.PushBack(receive, function(){ 
			var data:JsonData.MessageBagReceiveInfo = receive.data as JsonData.MessageBagReceiveInfo;
			this.next(data);
		});
	
		TaskManager.Run(tl);
		
		
	} 
	public function next(data:JsonData.MessageBagReceiveInfo){ 
		var tl:TaskList = new TaskList(); 
		if(data.warning && data.warning.Length > 0){
			var task:EZWarningTask = TaskManager.Create("global.ui.warning") as EZWarningTask;
			for(var i:int = 0; i<data.warning.Length; ++i){
				task.addText(EZDictionary.LookUp(data.warning[i]));
			}
			tl.push(task);
		}
		var loaded:EZLoadedTask = TaskManager.Create("global.ui.loaded") as EZLoadedTask;
		loaded.time = 0.3;  
		tl.push(loaded);
		 	
		TaskManager.PushFront(tl, function(){
			ctrl_.refresh();
		});
	 
		TaskManager.PushBack(tl, function(){
			isOver_ = true;
		});
	 
		TaskManager.Run(tl);
	}
	public function update(d:float){
		if(isOver_){
			return "play";
		}
	}
}