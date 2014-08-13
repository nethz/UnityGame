#pragma strict

class EZUpdateTable extends MonoBehaviour{
	private static var instance_:EZUpdateTable = null;
	private var data_:JsonData.Update = null;
	private var isLoad_:boolean = false;
	private var version_:String = "";

	function get version():String{
		return version_;
	} 

	
	function Awake(){
		this.instance_ = this;
	}
	public static function GetInstance():EZUpdateTable{
		return this.instance_;
	}

	public function get data():JsonData.Update{
		return data_;
	}
	public function save(data:JsonData.Update){
		data_ = data;
		isLoad_ = true;
	}
	/*
	private function bridge():Task{
		var web:WebLoaderTask = new WebLoaderTask("update", new JsonData.UpdateInfoLoader(), WebInfo.Server.Bridge, WebLoaderTask.Fault.Ignore);

		web.pack.addField("version", version_);
		TaskManager.PushBack(web, function(){
		
			var info:JsonData.UpdateInfo = web.data as JsonData.UpdateInfo;
			if(info && info.succeed){
			
				if(info.setup){
					Debug.LogWarning(JsonData.Setup.Save(info.setup));
					EZSetupTable.GetInstance().save(info.setup);
				}
				this.save(info.update);
			}
		});
		
		
		
		return web;
	
	}*/
	private function server():Task{
		var web:WebLoaderTask = new WebLoaderTask("update", new JsonData.UpdateInfoLoader(), WebInfo.Server.Master);

		web.pack.addField("version", version_);
		TaskManager.PushBack(web, function(){
		
			var info:JsonData.UpdateInfo = web.data as JsonData.UpdateInfo;
			if(info && info.succeed){
			
				if(info.setup){
					Debug.LogWarning(JsonData.Setup.Save(info.setup));
					EZSetupTable.GetInstance().save(info.setup);
				}
				this.save(info.update);
				
			}
		});
		
		
		
		return web;
	
	}
	
	private var check_ = false;
	private function check(task:Task):Task{
		var c:EZOverTask = new EZOverTask();
		c.init = function(){
			if(!isLoad_){
				TaskManager.PushBack(task, function(){
					c.over = true;
				});
				TaskManager.Run(task);
			}else{
				c.over = true;
			
			}
		};
		return c;
	
	}
	public function load(version:String):Task{
	
		version_ = version;
		var tl:TaskList = new TaskList();
		this.isLoad_ = false;
		//tl.push(bridge());
		tl.push(server());
		//tl.push(check(client()));
		return tl;
		
	}
}