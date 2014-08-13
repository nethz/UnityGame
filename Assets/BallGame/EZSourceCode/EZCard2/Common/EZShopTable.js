#pragma strict

class EZShopTable extends MonoBehaviour{
	private static var instance_:EZShopTable = null;
	private static var tableName_:String = "game_shop";
	private static var tableIap_:String = "game_iap";
	private var isIapLoaded_:boolean = false;
	private var products_:JsonData.ProductList;
	public function get products():JsonData.ProductList{
		return products_;
	}
	
	public function saveProducts(products:JsonData.ProductList){
		Debug.Log("a");
		products_ = products;
		Debug.Log("b");
		var json:String = JsonData.ProductList.Save(products_);
		Debug.Log("c");
		PlayerPrefs.SetString(tableIap_, json);
		Debug.Log("d");
		PlayerPrefs.Save();		
		Debug.Log("e");
		isIapLoaded_ = true;	
		Debug.Log("f");
	
	}
	function get isLoaded():boolean{
		return isIapLoaded_;
	}
	function reset(){
	
		
		if(PlayerPrefs.HasKey(tableIap_)){
			products_ = JsonData.ProductList.Load(PlayerPrefs.GetString(tableIap_));
		}
		
		if(products_ == null){
			products_ = new JsonData.ProductList();
		}
		isIapLoaded_ = false;
	}
	function Awake(){
		this.instance_ = this;
		this.reset();
	
	}
	
	public static function GetInstance():EZShopTable{
		return this.instance_;
	}
	
	public function fullAp():WebLoaderTask{
	
	 	var web:WebLoaderTask = new WebLoaderTask("ap", new JsonData.PlayerInfoLoader());
		web.setup(WebForGame.GetInstance().data);
		//EZQuestBagTable.GetInstance().addField(web.pack);
		
		TaskManager.PushBack(web, function(){
			var info:JsonData.PlayerInfo = web.data as JsonData.PlayerInfo;
			if(info && info.succeed){
				if(info.player){
					var player:EZPlayerTable = EZPlayerTable.GetInstance();
					player.save(info.player);
				}
				
			}
		});
		return web;
	
	}
	public function bagMax(mode:String):WebLoaderTask{
	
	 	var web:WebLoaderTask = new WebLoaderTask("bag_max", new JsonData.BagMaxInfoLoader()); 
		web.setup(WebForGame.GetInstance().data);
		web.pack.addField("mode", mode); 
		EZBagTable.GetInstance().addField(web.pack);
		//EZQuestBagTable.GetInstance().addField(web.pack);
		TaskManager.PushBack(web, function(){
			var info:JsonData.BagMaxInfo = web.data as JsonData.BagMaxInfo;
			if(info && info.succeed){
				if(info.player){
					var player:EZPlayerTable = EZPlayerTable.GetInstance();
					player.save(info.player);
				}
				if(info.quickBag){
					var bag:EZBagTable = EZBagTable.GetInstance();
					bag.save(info.quickBag);
				}
			
			
			}
		});
		return web;
	}
	public function payment(receipt:String):WebLoaderTask{
	
		var web:WebLoaderTask = new WebLoaderTask("payment", new JsonData.PlayerInfoLoader());
		web.setup(WebForGame.GetInstance().data);
		web.pack.addField("receipt", receipt);
		TaskManager.PushBack(web, function(){
			var info:JsonData.PlayerInfo = web.data as JsonData.PlayerInfo;
			if(info && info.succeed){
				EZPlayerTable.GetInstance().save(info.player);
			}
		});
		return web;
	} 
	
	public function loadIap():Task{
		//return new Task();
		var setup:JsonData.SetupShop = EZSetupTable.GetInstance().data.shop;
		if(setup && products_ && setup.version == products_.ver){  
				var task:Task = new Task();
				task.init = function(){
					saveProducts(products_); 
				};
				return task;
		}else if(setup){  
				var iap:EZIapTask = new EZIapTask();
				
				iap.list = setup.products;
				for(var i:int = 0; i<setup.products.Length;++i){
					Debug.Log(setup.products[i]);
				}
				TaskManager.PushBack(iap, function(){ 
					if(iap.products){
						iap.products.ver = setup.version;
						saveProducts(iap.products);
					}
				}); 
				return iap;
		}
		Debug.Log(999);
		return new Task();
	
	}
	
}