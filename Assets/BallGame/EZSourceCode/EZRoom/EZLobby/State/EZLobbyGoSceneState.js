#pragma strict

class EZLobbyGoSceneState extends State{
	private var levelName_:String = "";
	private var stateName_:String = "";
	public function EZLobbyGoSceneState(levelName:String){
		levelName_ = levelName;
	}
	public function EZLobbyGoSceneState(levelName:String, state:String){
		levelName_ = levelName;
		stateName_ = state;
	}
	public function start(){
		var mt:MultiTask = new MultiTask();
		mt.push(EZPopInstance.GetInstance().hideTask());
		var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
		loading.time = 0.6;
		loading.alpha = 1;
		loading.text = EZDictionary.LookUp("!loading");
		mt.push(loading);
		TaskManager.PushBack(mt, function(){
			EZBroadcast.GetInstance().close();
			ActionManager.Run("global.ui.reset");
			if(stateName_ != ""){
				EZGlobal.GetInstance().LoadLevel(levelName_,stateName_);
				stateName_ = "";
			}else{
				EZGlobal.GetInstance().LoadLevel(levelName_);
			}
		});
		
		TaskManager.Run(mt);
	}
}