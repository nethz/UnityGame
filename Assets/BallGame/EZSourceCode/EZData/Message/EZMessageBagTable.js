#pragma strict

class EZMessageBagTable extends MonoBehaviour{
 	public enum Mode{
		News,
		Quest,
	};
	private static var instance_:EZMessageBagTable = null;
	private var isBagLoaded_:boolean = false;
	private var tableName_:String = "game_message_bag";
	
	private var messageBag_:JsonData.MessageBag = null;
	public function release(){
		isBagLoaded_ = false;
	}
	public function get bag():JsonData.MessageBag{
		
		return messageBag_;
	}
	public function get news():JsonData.Message[]{ 
		if(messageBag_)
			return messageBag_.news;
		return null;
	}
	
	
	public function get quest():JsonData.Message[]{
		if(messageBag_)
			return messageBag_.quest;
		return null;
	}
	public function get isLoaded():boolean{
		return isBagLoaded_;
	}
	
	public function reset(){
		if(PlayerPrefs.HasKey(tableName_)){
			messageBag_ = JsonData.MessageBag.Load(PlayerPrefs.GetString(tableName_));
		}else{
			messageBag_ = new JsonData.MessageBag();
		}
		isBagLoaded_ = false;
	}
	public function Awake(){
		this.instance_ = this;
		reset();
	}

	public function save(messageBag:JsonData.MessageBag){
		messageBag_ = messageBag;
		var data:String = JsonData.MessageBag.Save(messageBag_);
		PlayerPrefs.SetString(tableName_, data);
		PlayerPrefs.Save();
		isBagLoaded_ = true;
	}
	
	public static function GetInstance():EZMessageBagTable{
		return this.instance_;
	} 
	
	public function day():WebLoaderTask{	
		Debug.Log("Day!!!!");
		var task:WebLoaderTask = new WebLoaderTask("day", new JsonData.DayInfoLoader());
		task.setup(WebForGame.GetInstance().data);
		//task.pack.addField("key", key);
		TaskManager.PushBack(task, function(){
			var info:JsonData.DayInfo = task.data as JsonData.DayInfo;
			//if(info && info.succeed){
			//	this.save(info.bag);
				
		//	}
		});
		return task;
	}
	
	
	public function reload():WebLoaderTask{	
		
		var task:WebLoaderTask = new WebLoaderTask("message_bag", new JsonData.MessageBagInfoLoader());
		task.setup(WebForGame.GetInstance().data);
	
		TaskManager.PushBack(task, function(){
			var info:JsonData.MessageBagInfo = task.data as JsonData.MessageBagInfo;
			if(info && info.succeed){
				this.save(info.bag);
				
			}
		});
		return task;
	}

	public function receive(mode:EZMessageBagTable.Mode):WebLoaderTask{ 
	
		var url:String = "";
		if(mode == EZMessageBagTable.Mode.News){
			url = "receive_news";
		}else{
			url = "receive_quest";
		}
		var web:WebLoaderTask =  new WebLoaderTask(url, new JsonData.MessageBagReceiveInfoLoader());
		web.setup(WebForGame.GetInstance().data);
	
		EZBagTable.GetInstance().addField(web.pack);
		
		EZMissionBagTable.GetInstance().addField(web.pack);
		TaskManager.PushBack(web, function(){
			var info:JsonData.MessageBagReceiveInfo = web.data as JsonData.MessageBagReceiveInfo;
			if(info && info.succeed){
				if(mode == EZMessageBagTable.Mode.Quest){
					
					var guide:JsonData.Guide = EZGuideTable.GetInstance().data;
					guide.questMessage = true;
					EZGuideTable.GetInstance().save(guide);
		
				}
				this.save(info.messageBag); 
				if(info.player){
					EZPlayerTable.GetInstance().save(info.player);
				}
				if(info.quickBag){
					EZBagTable.GetInstance().save(info.quickBag);
				}
				
				if(info.quickLevelBag){
					EZMissionBagTable.GetInstance().save(info.quickLevelBag);
				}
				
				if(info.magicBall){
					EZMagicBallTable.GetInstance().save(info.magicBall);
				}
			}
		});
		return web;
		
		
	} 

}