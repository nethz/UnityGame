#pragma strict
/*
class EZOnlineScene  extends MonoBehaviour{
	public var _json:String;
	public var _scene:JsonData.SceneInfo;
	public var _harvest:JsonData.HarvestInfo;
	public function Start(){
		var scene:WebSceneTask = WebTaskFactories.GetInstance().createTask(new WebSceneTask()) as WebSceneTask;
		TaskManager.PushBack(scene, function(){
			_scene = scene.data;
			_scene.print();
		});
		TaskManager.Run(scene);
		var harvest:WebHarvestTask = WebTaskFactories.GetInstance().createTask(new WebHarvestTask()) as WebHarvestTask;
		
		TaskManager.PushBack(harvest, function(){
			_harvest = harvest.data;
			_harvest.print();
		});
	
	
		TaskManager.Run(harvest);
		
	}
}*/