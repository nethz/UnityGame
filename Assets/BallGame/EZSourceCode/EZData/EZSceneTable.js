#pragma strict

class EZSceneTable extends MonoBehaviour{
	private static var instance_:EZSceneTable = null;
	private var data_:JsonData.Scene = null;
	private var isLoaded_:boolean = false;
	
	function Awake(){
		this.instance_ = this;
		isLoaded_ = false;
	}
	public static function GetInstance():EZSceneTable{
		return this.instance_;
	}
	public function clear(){
		isLoaded_ = false;
		data_ = null;
	}
	public function get isLoaded():boolean{
		return isLoaded_;
	}
	public function get data():JsonData.Scene{
		return data_;
	}
	public function save(data:JsonData.Scene){
		data_ = data;
		isLoaded_ = true;
		
	}
	
	public function save(data:JsonData.CrystalTech){
		if(data_){
			data_.crystal = data;
		}
	}
	public function load(id:int, type:String):WebLoaderTask{
	
	
		var web:WebLoaderTask =  new WebLoaderTask("scene", new JsonData.SceneInfoLoader());
		web.setup(WebForGame.GetInstance().data);
		web.pack.addField("id", id.ToString());
		web.pack.addField("type", type);
	
		var team:JsonData.Team = EZTeamTable.GetInstance().data;
		
		web.pack.addField("battle", team.battle.ToString());
		web.pack.addField("bag1", team.bag1.ToString());
		web.pack.addField("bag2", team.bag2.ToString());
		var guide:JsonData.Guide = EZGuideTable.GetInstance().data;
		if(guide.canCrystal){
			 	
			var crystal:EZCrystalTable = EZCrystalTable.GetInstance();
			if(crystal && crystal.data){
				web.pack.addField("group", crystal.data.ball.group.ToString());
				web.pack.addField("cry", crystal.data.cry.id.ToString());
			}
		}
				
		
		EZMissionBagTable.GetInstance().addField(web.pack);		
		
		//EZQuestBagTable.GetInstance().addField(web.pack);
		TaskManager.PushBack(web, function(){
			var info:JsonData.SceneInfo = web.data as JsonData.SceneInfo;
			if(info && info.succeed){
			
				this.save(info.scene);
				if(info.player){
					EZPlayerTable.GetInstance().save(info.player);
				}
				if(info.quickLevelBag){
					EZMissionBagTable.GetInstance().save(info.quickLevelBag);
				}
		//		if(info.quickQuestBag){
//					EZQuestBagTable.GetInstance().save(info.quickQuestBag);
		//		}
			}
		});
		
		
		return web;
	}
	
	/*
	public function useCrystal():WebLoaderTask{
		
		var task:WebLoaderTask =  new WebLoaderTask("use_crystal", new JsonData.CrystalTechInfoLoader());
		task.setup(WebForGame.GetInstance().data);
		var crystal:EZCrystalTable = EZCrystalTable.GetInstance();
		if(crystal && crystal.data){
			task.pack.addField("group", crystal.data.ball.group.ToString());
			task.pack.addField("cry", crystal.data.cry.id.ToString());
		}
		
		//EZQuestBagTable.GetInstance().addField(task.pack);
		TaskManager.PushBack(task, function(){
			var info:JsonData.CrystalTechInfo = task.data as JsonData.CrystalTechInfo;
			if(info && info.succeed){
				this.save(info.crystal);
			//	if(info.quickQuestBag){
			////		EZQuestBagTable.GetInstance().save(info.quickQuestBag);
			//	}
			}
		});
		return task;
	}*/
}