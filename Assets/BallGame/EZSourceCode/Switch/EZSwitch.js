#pragma strict
/*
class EZSwitch extends MonoBehaviour{
	public var _debug:boolean = false;
	public function Start(){
		var tl:TaskList = new TaskList();
		
		
	
		//var guide:JsonData.Guide = EZGuideTable.GetInstance().data;
		if(_debug){
			EZUserTable.GetInstance().doFirst();// = false;
			//EZGuideTable.GetInstance().save(guide);
		}
			
		var setup:EZSetupTable = EZSetupTable.GetInstance();
		if(!setup.isLoaded){
			tl.push(setup.reload());
		}
		TaskManager.PushFront(tl, function(){
			if(EZUserTable.GetInstance().first){
				EZGuideTable.GetInstance().release();
				EZBagTable.GetInstance().release();
				EZMagicBallTable.GetInstance().release();
				EZMessageBagTable.GetInstance().release();
				EZMissionBagTable.GetInstance().release();
				EZPlayerTable.GetInstance().release();
				EZQuestBagTable.GetInstance().release();
				EZUserTable.GetInstance().release();
				EZTeamTable.GetInstance().release();
				EZCrystalTable.GetInstance().release();
				
				
				PlayerPrefs.DeleteAll();
			}
		});
		TaskManager.PushBack(tl, function(){
			if(EZUserTable.GetInstance().first){
				goToScene(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Guide));
			}else{
				goToScene(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Home));
			}
		});
		TaskManager.Run(tl);
		
	}
	public function goToScene(level:String){
		var mt:MultiTask = new MultiTask();
		mt.push(EZPopInstance.GetInstance().hideTask());
		var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
		loading.time = 0.6;
		loading.alpha = 1;
		loading.text = EZDictionary.LookUp("!loading");
		TaskManager.PushBack(loading, function(){
			EZBroadcast.GetInstance().close();
			EZGlobal.GetInstance().LoadLevel(level);
		});
		mt.push(loading);
		TaskManager.Run(mt);
	
	}
	
}*/