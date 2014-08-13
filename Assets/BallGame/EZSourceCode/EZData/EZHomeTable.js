#pragma strict

class EZHomeTable extends MonoBehaviour{
	private static var instance_:EZHomeTable = null;
	
	public var _bag:EZBagTable;
	public var _player:EZPlayerTable;
	public var _weather:EZWeatherTable;
	public var _magicBall:EZMagicBallTable;
	public var _questBag:EZQuestBagTable;
	public var _messageBag:EZMessageBagTable;
	public var _missionBag:EZMissionBagTable;
	public var _broadcast:EZBroadcastTable;
	
	function Awake(){
		this.instance_ = this;
	}
	
	public function get isLoaded():boolean{
		return false;
	}
	public static function GetInstance():EZHomeTable{
		return this.instance_;
	}
	public function save(data:JsonData.HomeInfo){
	
	
		
		if(data.broadcast){
			_broadcast.save(data.broadcast);
		}
		if(data.weather){
			_weather.save(data.weather);
		}
		if(data.quickQuestBag){
			_questBag.save(data.quickQuestBag);
		}
		
		if(data.messageBag){
			_messageBag.save(data.messageBag);
		}
		
		
		
		
	}
	public function reload():WebLoaderTask{
		var web:WebLoaderTask =  new WebLoaderTask("home", new JsonData.HomeInfoLoader());
		web.setup(WebForGame.GetInstance().data);
		EZQuestBagTable.GetInstance().addField(web.pack);
		TaskManager.PushBack(web, function(){
			var info:JsonData.HomeInfo = web.data as JsonData.HomeInfo;
			if(info && info.succeed){
				this.save(info);
			}
		});
		return web;
	}
	
}