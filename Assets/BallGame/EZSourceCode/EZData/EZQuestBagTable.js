#pragma strict

class EZQuestBagTable extends MonoBehaviour{
	private static var instance_:EZQuestBagTable = null;
	private var isBagLoaded_:boolean = false;
	//private var isListLoaded_:boolean = false;
	private var tableName_:String = "game_quest_bag";
	public var _questTable:EZQuestTable = null;
	
	private var questBag_:JsonData.QuestBag = null;
	
	public function release(){
		isBagLoaded_ = false;
	}
	public function get bag():JsonData.QuestBag{
		return questBag_;
	}
	public function get list():List.<JsonData.Quest>{
		return _questTable.list;
	}
	public function get isLoaded():boolean{
		return isBagLoaded_;
	}
	
	public function reset(){
		if(PlayerPrefs.HasKey(tableName_)){
			questBag_ = JsonData.QuestBag.Load(PlayerPrefs.GetString(tableName_));
		}else{
			questBag_ = new JsonData.QuestBag();
		}
		if(questBag_ != null && questBag_.list != null){
			for(var i:int = 0; i< questBag_.list.Length; ++i){
				_questTable.setup(questBag_.list[i].id);
			}
		}
		isBagLoaded_ = false;
	}
	public function Awake(){
		
		this.instance_ = this;
	}
	
	public function Start(){
	
		reset();
	}
	public function save(data:JsonData.QuickQuestBag){
		questBag_ = data.bag;
		var json:String = JsonData.QuestBag.Save(data.bag);
		PlayerPrefs.SetString(tableName_, json);
		PlayerPrefs.Save();
		_questTable.save(data.bag.list, data.list);
		isBagLoaded_ = true;
	}
	

	public static function GetInstance():EZQuestBagTable{
		return this.instance_;
	}
	
	function addField(pack:WebPack){
		pack.addField("quick_quest", "1");
		if(this.questBag_ != null && this.questBag_.list != null){
			_questTable.addField(pack, this.questBag_.list);
		}
	}
	
	public function loadTask():Task{
		var web:WebLoaderTask = new WebLoaderTask("quest_bag", new JsonData.QuickQuestBagInfoLoader()); 
		web.setup(WebForGame.GetInstance().data);
		addField(web.pack);
		TaskManager.PushBack(web, function(){
			var info:JsonData.QuickQuestBagInfo = web.data; 
			if(info && info.succeed){
				this.save(info.quickBag);
			}
		});
		return web;
	}/**/

	
	

}