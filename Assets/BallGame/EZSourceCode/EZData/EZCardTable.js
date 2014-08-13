#pragma strict

class EZCardTable  extends MonoBehaviour{
	private static var instance_:EZCardTable = null;
	private var tableName_:String = "game_card_";
	
	private var dict_:Dictionary.<int, EZCard> = new Dictionary.<int, EZCard>();
	public function Awake(){
		this.instance_ = this;
	}
	public function get dict():Dictionary.<int, EZCard>{
		return dict_;
	}
		
	public static function GetInstance():EZCardTable{
		return this.instance_;
	}
	public function getCard(id:int):EZCard{
		return dict_[id];
	}
	public function addField(pack:WebPack, cards:JsonData.Card[]){
		var ids:Array = new Array();
		var vers:Array = new Array();
		for(var i:int = 0; i<cards.Length; i++){
			if(dict_ != null && dict_.ContainsKey(cards[i].id) && dict_[cards[i].id].ver == cards[i].ver){
				ids.push(cards[i].id);
				vers.push(cards[i].ver);
			}
		}
		if(ids.length != 0 && vers.length != 0){
			pack.addField("card_ids", ids);
			pack.addField("card_vers", vers);
		}
		
	}
	public function setup(id:int){
		var soul:JsonData.Soul = JsonData.Soul.Load(PlayerPrefs.GetString(tableName_+id.ToString()));
		
		if(soul != null){
			var card:EZCard = new EZCard();
			card.load(soul);
			dict_[id] = card;
		}
	}
	public function save(cards:JsonData.Card[], souls:JsonData.Soul[]){
		var dict = new Dictionary.<int, EZCard>();
		if(cards != null){
			for(var i:int = 0; i< cards.Length; ++i){
				for(var j:int = 0; j< souls.Length; ++j){
					if(souls[j].id == cards[i].id && souls[j].ver == cards[i].ver){
						
						var card:EZCard = new EZCard();
						card.load(souls[j]);
						dict[souls[j].id] = card;
						var json:String = JsonData.Soul.Save(souls[j]);
		
		
						PlayerPrefs.SetString(tableName_ + souls[j].id.ToString(), json);
						PlayerPrefs.Save();
		
					}
				}
				if(!dict.ContainsKey(cards[i].id) && dict_.ContainsKey(cards[i].id)){
					dict[cards[i].id] = dict_[cards[i].id];
					
				}
				
			}
			dict_ = dict;
		
		}
	}
	
	public function save(id:int, soul:JsonData.Soul){
		var json:String = JsonData.Soul.Save(soul);
		
		var card:EZCard = new EZCard();
		card.load(soul);
		dict_[id] = card;
		
		PlayerPrefs.SetString(tableName_ + id.ToString(), json);
		PlayerPrefs.Save();
	}
	
	
	public function find(type:String, minQuality:int):EZCard{
	
		for(var kv:KeyValuePair.<int, EZCard> in dict_){
			var card = kv.Value as EZCard; 
			if(type == card.type && card.quality >= minQuality){
				return card;
			}
		}
	
		return null;
		
	}
	
	/*
	public function loadTask(id:int, ver:int, reload:boolean):EZCardLoadTask{
		var task:EZCardLoadTask = new EZCardLoadTask(); 
		var isOver:boolean = false;
	
		
		if((!reload) && (PlayerPrefs.HasKey(tableName_+id.ToString()))){
			try{
				task.data = JsonData.Soul.Load(PlayerPrefs.GetString(tableName_+id.ToString()));
			}catch(e:System.Exception){
				task.data = null;
			}
			
			if(task.data != null){
				
				if(task.data.ver != ver){
					task.data = null;
				}
			}
		} 
		
		
		if(task.data != null){
			isOver = true;
		}else{
			task.init = function(){
				var web:WebLoaderTask = new WebLoaderTask("card", new JsonData.CardInfoLoader(), WebLoaderTask.Fault.AutoRetry);
				web.setup(WebForGame.GetInstance().data);
				web.pack.addField("id", id.ToString());
				TaskManager.PushBack(web, function(){
					var info:JsonData.CardInfo = web.data;
					if(info && info.succeed){
						this.save(id, info.card);
						task.data = info.card;
					}
					
					isOver = true;
				});
				TaskManager.Run(web);
			};
		
		}
		
		task.isOver = function():boolean{
			return isOver;
		};
		return task;
	
	
	}
	
	public function del(id){
		
		if(PlayerPrefs.HasKey(tableName_ + id.ToString())){
			PlayerPrefs.DeleteKey(tableName_ + id.ToString());
		}
	}
*/
}