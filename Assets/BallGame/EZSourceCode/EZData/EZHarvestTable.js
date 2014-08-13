#pragma strict

class EZHarvestTable extends MonoBehaviour{
	private static var instance_:EZHarvestTable = null;
	private var data_:JsonData.Harvest = null;
	//private var doSwap_:boolean = false;
	private var useCrystal_:boolean = false;

	function Awake(){
		this.instance_ = this;
	}
	function set useCrystal(value:boolean){
		useCrystal_ = value;
	}
	public static function GetInstance():EZHarvestTable{
		return this.instance_;
	}

	public function get data():JsonData.Harvest{
		return data_;
	}
	public function save(data:JsonData.Harvest){
		data_ = data;
		
	}
	public function load(key:String):Task{
	
	
		
		var web:WebLoaderTask =  new WebLoaderTask("harvest", new JsonData.HarvestInfoLoader());
		web.setup(WebForGame.GetInstance().data);
		web.pack.addField("key", key);
		var guide:JsonData.Guide = EZGuideTable.GetInstance().data;
		web.pack.addField("magic", useCrystal_.ToString());
				
		EZBagTable.GetInstance().addField(web.pack);
		EZMissionBagTable.GetInstance().addField(web.pack);
		
		TaskManager.PushBack(web, function(){
			var info:JsonData.HarvestInfo = web.data as JsonData.HarvestInfo;
			if(info && info.succeed){
				if(info.quickLevelBag){
					EZMissionBagTable.GetInstance().save(info.quickLevelBag);
				}
				if(info.player){
					EZPlayerTable.GetInstance().save(info.player);
				}
				if(info.quickBag){
					EZBagTable.GetInstance().save(info.quickBag);
				}
//				if(info.quickQuestBag){
			//		EZQuestBagTable.GetInstance().save(info.quickQuestBag);
			//	}
				
				if(guide.canCrystal){
					EZMagicBallTable.GetInstance().release();
				}
				
				this.save(info.harvest);
			}
		});
		
		
		return web;
	}
}