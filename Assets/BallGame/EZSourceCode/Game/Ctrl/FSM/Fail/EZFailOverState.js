#pragma strict


class EZFailOverState extends State{
	private var isOver_:boolean = false;
	private var sound_:EZResultSound = null;
	
	public function EZFailOverState(sound:EZResultSound){
		sound_ = sound;
	}
	
	function start(){
		isOver_ = false;
		EZGameFailView.GetInstance().over.open();
		if(EZBGMManager.Instance()){
			
			EZBGMManager.Instance().stopBGM();
		}
		sound_.playFail();
		var tl:TaskList = new TaskList();
		var seal:Task = EZGameFailView.GetInstance().over.sealTask();
		tl.push(seal);
		TaskManager.PushFront(seal, function(){
			EZGameFailView.GetInstance().over.open();
		});
		var wait:EZWaitTask = new EZWaitTask();
		wait.setAllTime(2.1f);
		tl.push(wait);
		
		var warning:EZWarningTask = TaskManager.Create("global.ui.warning") as EZWarningTask;
		warning.addText(EZFailCtrl.GetText());
		tl.push(warning);
		var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
		loading.time = 0.3;
		loading.alpha = 1;
		loading.text = EZDictionary.LookUp("!loading");
		tl.push(loading);
		
		TaskManager.PushBack(tl, function(){
			EZSceneTable.GetInstance().clear();
			EZLevelDocTable.GetInstance().clear();
			EZGlobal.GetInstance().LoadLevel(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Home));
			isOver_ = true;
		});
		TaskManager.Run(tl);
	}
	
	
}