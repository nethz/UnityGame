#pragma strict

class EZBagTable extends MonoBehaviour{
	
	private static var instance_:EZBagTable = null;
	private var isBagLoaded_:boolean = false;
	private static var tableName_:String = "game_bag";
	public var _cardTable:EZCardTable = null;
	
	public function get dict():Dictionary.<int, EZCard>{
		return _cardTable.dict;
	}
	private var bag_:JsonData.Bag = null;
	public var goEvtMission:boolean = false;
	
	function Awake(){
		this.instance_ = this;
	}
	function Start(){
		this.reset();
	}
	
	public function release(){
		isBagLoaded_ = false;
		bag_ = null;
		
	}
	

	public function find(team:JsonData.Team):boolean{
		if(team == null || team.battle == -1 )
			return false;
			
		
		if(team.bag1 != -1){
			if(!this.find(team.bag1)){
				team.bag1 = -1;
			}
		}
		if(team.bag2 != -1){
			if(!this.find(team.bag2)){
				team.bag2 = -1;
			}
		}
		if(!this.find(team.battle)){
			team.battle = -1;
			return false;
		}
		return true;
	}
	public function find(id:int):boolean{
		for(var i:int = 0; i<bag_.list.Length; ++i){
			var card:JsonData.Card = bag_.list[i];
			if(id == card.id){
				return true;
			}
		}
		return false;
		
	}
	
	public function find(type:String, minQuality:int):EZCard{
		return _cardTable.find(type, minQuality);
	
		
	}
	public function get bag():JsonData.Bag{
		return bag_;
	}

	public function get isLoaded():boolean{
		return isBagLoaded_;
	}
	public function getCard(id:int):EZCard{
		return _cardTable.getCard(id);

	}
	public function diamondDraw(n:int):EZCardDrawLoad{
		return draw("diamond", n);
	}
	public function moneyDraw(n:int):EZCardDrawLoad{
		return draw("money", n);
	}
	public function draw(mode:String, n:int):EZCardDrawLoad{
		var draw:EZCardDrawLoad = new EZCardDrawLoad(); 
		var web:WebLoaderTask = new WebLoaderTask("draw", new JsonData.DarwInfoLoader()); 
			
		web.setup(WebForGame.GetInstance().data);
		web.pack.addField("count", n.ToString());
		web.pack.addField("mode", mode);
		
		//EZQuestBagTable.GetInstance().addField(web.pack);
		
		TaskManager.PushBack(web, function(){
			var info:JsonData.DarwInfo = web.data as JsonData.DarwInfo; 
			if(info && info.succeed){
				draw.bag = info.bag; 
				draw.draw = info.draw;  
				this.save(draw.bag);
				_cardTable.save(draw.bag.list, info.draw.list);
				if(info.player){
					EZPlayerTable.GetInstance().save(info.player);
				}	
			//	if(info.quickQuestBag){
				//	EZQuestBagTable.GetInstance().save(info.quickQuestBag);
			//	}
				
				
			}
		});
		
		draw.taskList.push(web);
	
		return draw;
	}
	public function getSoul(id:int):JsonData.Soul{
		var card:EZCard = getCard(id);
		if(card != null){
			return card.soul;
		}
		
	/*
		var card:EZCard = null;
		for(var i:int = 0; i<cardList_.Count; ++i){
			if(cardList_[i].id == id){
				card = cardList_[i];
				break;
			}
		}
		
		if(card != null)
			return card.soul;
		return null;
		*/
		return null;
	}
	
	
	
	function reset(){
		if(PlayerPrefs.HasKey(tableName_)){
			bag_ = JsonData.Bag.Load(PlayerPrefs.GetString(tableName_));
		}else{
			bag_ = new JsonData.Bag();
		}
		if(this.bag_ != null && bag_.list != null){
			for(var i:int = 0; i<bag_.list.Length; i++){
				_cardTable.setup(bag_.list[i].id);
			}
		}
		isBagLoaded_ = false;
	}
	
	public static function GetInstance():EZBagTable{
		return this.instance_;
	}

	public function addField(pack:WebPack){
	
		pack.addField("quick_card", "1");
		if(this.bag_ != null && this.bag_.list != null){
			_cardTable.addField(pack, this.bag_.list);
		}
	}
	public function save(quickBag:JsonData.QuickBag){
		this.save(quickBag.bag);
		_cardTable.save(quickBag.bag.list, quickBag.souls);
	}
	private function save(bag:JsonData.Bag){
		bag_ = bag;
		var data:String = JsonData.Bag.Save(bag_);
		PlayerPrefs.SetString(tableName_, data);
		PlayerPrefs.Save();
		isBagLoaded_ = true;
		//isListLoaded_ = false;
	}
	//public function _save(cardList:List.<EZCard>){
	//	cardList_ = cardList;
	//	isListLoaded_ = true;
	//}
	/*
	public function addLoadTask(id:int, ver:int, bagTask:EZCardBagLoadTask):Task{
		var load:EZCardLoadTask = _cardTable.loadTask(id, ver,  false) as EZCardLoadTask;
		TaskManager.PushBack(load, function(){
			bagTask.addCard(load.data);
		});
		return load;
	}/**/
	
	//private var list_:List.<EZCard> = new List.<EZCard>();
	//public function refreshCards(){
	//	cardList_.Clear();
	//	for()
		//kljfalfjadsljf
		//var card:EZCard = new EZCard();
		//card.load(soul);
		//list_.Add(card);
	//}
	//public function gb2big5(texts:Array){
	//	var web:WebLoaderTask = new WebLoaderTask("gb2big5", new JsonData.TranscodingInfoLoader()); 
	//	web.setup(WebForGame.GetInstance().data);
	//	web.pack.addField("texts", texts);
	//	return web;
		
	//}
	public function share():WebLoaderTask{
		var web:WebLoaderTask = new WebLoaderTask("share", new JsonData.ShareInfoLoader()); 
		web.setup(WebForGame.GetInstance().data);
		
	//	EZQuestBagTable.GetInstance().addField(web.pack);
		TaskManager.PushBack(web, function(){
			var info:JsonData.ShareInfo = web.data; 
			if(info && info.succeed){
		//		if(info.quickQuestBag){
			//		EZQuestBagTable.GetInstance().save(info.quickQuestBag);
			//	}
			}
		});
		
		
		return web;
	}
	
	public function quickComp(main:int, list:Array):Task{
		var web:WebLoaderTask =  new WebLoaderTask("comp", new JsonData.QuickBagInfoLoader()); 
		web.setup(WebForGame.GetInstance().data);
		web.pack.addField("main", main.ToString());
		web.pack.addField("materials", list);
		this.addField(web.pack);
		TaskManager.PushBack(web, function(){
			var info:JsonData.QuickBagInfo = web.data;
			if(info && info.succeed){
				this.save(info.quickBag);
				//EZQuestBagTable.GetInstance().release();
			}
		});
		return web;
	}
	/*
	public function comp(main:int, list:Array):EZCardBagLoadTask{
		var bagTask:EZCardBagLoadTask = new EZCardBagLoadTask(); 
		
		var web:WebLoaderTask =  new WebLoaderTask("comp", new JsonData.BagCompInfoLoader()); 
		web.setup(WebForGame.GetInstance().data);
		web.pack.addField("main", main.ToString());
		for(var n:int = 0; n<list.length; ++n){
			web.pack.addField("materials[]", list[n].ToString());
		}
	
		TaskManager.PushBack(web, function(){
			var info:JsonData.BagCompInfo = web.data; 
			if(info && info.succeed){
				bagTask.bag = info.bag;
			}
		});
		bagTask.push(web);
		
		var card:Task = new Task();
		var isOver:boolean = false;
		card.init = function(){
			isOver = false;
			var mt:MultiTask = new MultiTask(); 
			if(bagTask.bag){
				for(var i:int = 0; i<bagTask.bag.list.Length; i++){
					mt.push(addLoadTask(bagTask.bag.list[i].id, bagTask.bag.list[i].ver, bagTask));
				}
			}
			
			TaskManager.PushBack(mt, function(){
				isOver = true;
			});
			TaskManager.Run(mt);
		};
		card.isOver = function(){
			return isOver;
		};
		TaskManager.PushBack(bagTask, function(){
			this.save(bagTask.bag);
			_cardTable.save(bag_.list, bagTask.soulList);
		});
		bagTask.push(card);
		return bagTask;
	
	
	}*/
	
	public function quickSell(list:Array):Task{
	
		var web:WebLoaderTask = new WebLoaderTask("sell", new JsonData.QuickBagInfoLoader()); 
		web.setup(WebForGame.GetInstance().data);
		
	//	for(var i:int = 0; i<list.length; ++i){
			web.pack.addField("sellList", list);
	//	}
		this.addField(web.pack);
		TaskManager.PushBack(web, function(){
			var info:JsonData.QuickBagInfo = web.data; 
			if(info && info.succeed){
				
				this.save(info.quickBag);
				//this.save(info.bag);
				//_cardTable.save(info.bag.list, info.cards); 
			}
		});
		return web;
	}
	/*
	public function _sell(list:Array):EZCardBagLoadTask{
	
		var bagTask:EZCardBagLoadTask = new EZCardBagLoadTask(); 
		
		var web:WebLoaderTask = new WebLoaderTask("sell", new JsonData.BagInfoLoader()); 
		web.setup(WebForGame.GetInstance().data);
		
		for(var i:int = 0; i<list.length; ++i){
			web.pack.addField("sellList[]", list[i].ToString());
		}
	
		TaskManager.PushBack(web, function(){
			var info:JsonData.BagInfo = web.data; 
			if(info && info.succeed){
				bagTask.bag = info.bag; 
			}
		});
		bagTask.push(web);
		
		var card:Task = new Task();
		var isOver:boolean = false;
		card.init = function(){
			isOver = false;
			var mt:MultiTask = new MultiTask(); 
			if(bagTask.bag){
				for(var i:int = 0; i<bagTask.bag.list.Length; i++){
					mt.push(addLoadTask(bagTask.bag.list[i].id, bagTask.bag.list[i].ver, bagTask));
				}
			}
			
			TaskManager.PushBack(mt, function(){
				isOver = true;
			});
			TaskManager.Run(mt);
		};
		card.isOver = function(){
			return isOver;
		};
		TaskManager.PushBack(bagTask, function(){
			this.save(bagTask.bag);
			_cardTable.save(bag_.list, bagTask.soulList);
		});
		bagTask.push(card);
		return bagTask;
	
	}
	*/
	/*
	public function quickLoadTask():Task{
	
		var web:WebLoaderTask = new WebLoaderTask("quick_bag", new JsonData.QuickBagInfoLoader()); 
		
		web.setup(WebForGame.GetInstance().data);
		if(this.bag_ != null && this.bag_ != null){
			_cardTable.addField(web.pack, bag_.list);
		}
	
		
		TaskManager.PushBack(web, function(){
			var info:JsonData.QuickBagInfo = web.data; 
			if(info && info.succeed){
				//this.save(info.bag);
				
				this.save(info.quickBag);
				//_cardTable.save(info.bag.list, info.cards);
			}
		});
		
		return web;
		
	
	}*/
	/*
	public function _loadTask():EZCardBagLoadTask{
		
		var bagTask:EZCardBagLoadTask = new EZCardBagLoadTask(); 
		if(isBagLoaded_ && this.bag){
			bagTask.bag = this.bag; 
		}else{	
			var web:WebLoaderTask = new WebLoaderTask("bag", new JsonData.BagInfoLoader()); 
			
			web.setup(WebForGame.GetInstance().data);
			TaskManager.PushBack(web, function(){
				var info:JsonData.BagInfo = web.data; 
				if(info && info.succeed){
					bagTask.bag = info.bag; 
				}
			});
			bagTask.push(web);
		}
		var card:Task = new Task();
		var isOver:boolean = false;
		card.init = function(){
			isOver = false;
			var mt:MultiTask = new MultiTask(); 
			if(bagTask.bag){
				for(var i:int = 0; i<bagTask.bag.list.Length; i++){
					mt.push(addLoadTask(bagTask.bag.list[i].id, bagTask.bag.list[i].ver, bagTask));
				}
			}
			
			TaskManager.PushBack(mt, function(){
				isOver = true;
			});
			TaskManager.Run(mt);
		};
		card.isOver = function(){
			return isOver;
		};
		TaskManager.PushBack(bagTask, function(){
			this.save(bagTask.bag);
//			this.save(bagTask.list);
		});
		bagTask.push(card);
		return bagTask;
	}
	*/
}