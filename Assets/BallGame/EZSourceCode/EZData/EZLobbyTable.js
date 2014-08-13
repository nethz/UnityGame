#pragma strict

class EZLobbyTable extends MonoBehaviour{
	private static var instance_:EZLobbyTable = null;
	
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
	public static function GetInstance():EZLobbyTable{
		return this.instance_;
	}
	public function save(data:JsonData.LobbyInfo){
	
		if(data.weather){
			_weather.save(data.weather);
		}
		
		if(data.broadcast){
			_broadcast.save(data.broadcast);
		}
		
		if(data.player){
			_player.save(data.player);
		}
		if(data.quickBag){
			_bag.save(data.quickBag);
		}
		
		if(data.magicBall){
			_magicBall.save(data.magicBall);
		}
		
		
		
		if(data.quickQuestBag){
			_questBag.save(data.quickQuestBag);
		}
		
		
		if(data.messageBag){
			_messageBag.save(data.messageBag);
		}
		
		if(data.quickLevelBag){
			_missionBag.save(data.quickLevelBag);
		}
		/*/**/
	}
	public function reload():WebLoaderTask{
		var web:WebLoaderTask =  new WebLoaderTask("lobby", new JsonData.LobbyInfoLoader());
		web.setup(WebForGame.GetInstance().data);
		EZBagTable.GetInstance().addField(web.pack);
		EZMissionBagTable.GetInstance().addField(web.pack);
		EZQuestBagTable.GetInstance().addField(web.pack);
		TaskManager.PushBack(web, function(){
			var info:JsonData.LobbyInfo = web.data as JsonData.LobbyInfo;
			if(info && info.succeed){
				this.save(info);
			}
		});
		return web;
	}
	
}