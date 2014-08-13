#pragma strict
/*
class EZBroadcastBagTable extends MonoBehaviour{


	private var broadcast_:JsonData.Broadcast = null;
	public function save(broadcast:JsonData.Broadcast){
		broadcast_ = broadcast;
	}
	public function get data():JsonData.Broadcast{
		return broadcast_;
	}

	public function loadTask(scene:int):Task{
		var web:WebLoaderTask = new WebLoaderTask("broadcast", new JsonData.BroadcastInfoLoader(), WebLoaderTask.Fault.Ignore);
		web.setup(WebForGame.GetInstance().data);
	
		web.pack.addField("scene", scene.ToString());
		
		TaskManager.PushBack(web, function(){
			var info:JsonData.BroadcastInfo = web.data;
			if(info && info.succeed){
				this.save(info.broadcast);
			}
			
		});
		return web;
		
	}
}*/