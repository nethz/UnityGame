#pragma strict

class EZUpdateLoadState extends State{


	private var ctrl_:EZUpdateCtrl = null;
	private var isOver_:boolean = false;
	public function EZUpdateLoadState(ctrl:EZUpdateCtrl){
		ctrl_ = ctrl;
	}
	public function start(){
		Debug.LogWarning("load im here!");
		isOver_ = false;
		var tl:TaskList = new TaskList();
		var task:Task = EZUpdateTable.GetInstance().load(ctrl_._version.version);
	
		
		
		var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
		loading.time = 0.0f;
		loading.alpha = 1.0f;
		loading.text = EZDictionary.LookUp("!loading");
	
	
		tl.push(loading);
		tl.push(task);
		//tl.push();
		
		
		TaskManager.PushBack(tl, function(){
			isOver_ = true;
		});
		
		
		
		TaskManager.Run(tl);
	}
	public function update(d:float){
		if(isOver_){
			if(EZUpdateTable.GetInstance().data != null && EZUpdateTable.GetInstance().data.enabled){
				
				return "window";
			}
			return "switch";
		}
		return "";
	
	}
}