#pragma strict

class EZLogoLoadState extends State{
	private var isOver_:boolean = false;
	public function start(){
		isOver_ = false;
		
		var loaded:EZLoadedTask = TaskManager.Create("global.ui.loaded") as EZLoadedTask;
		loaded.time = 0.3f;
		TaskManager.PushBack(loaded, function(){
			isOver_ = true;
		});
		TaskManager.Run(loaded);
			
		
		
	}
	public function update(d:float){
		if(isOver_){
			return "switch";
		}
		return "";
	
	}

}