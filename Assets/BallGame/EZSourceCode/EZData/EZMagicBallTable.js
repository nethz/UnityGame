#pragma strict

class EZMagicBallTable extends MonoBehaviour{
	public var _crystalTable:EZCrystalTable = null;
	private static var instance_:EZMagicBallTable = null;
	private static var tableName_:String = "game_magic_ball";
	private var magicBall_:JsonData.MagicBall = null;
	private var isLoaded_:boolean = false;
	
	public function release(){
		isLoaded_ = false;
	}
	public function get isLoaded():boolean{
		return isLoaded_;
	}
	public function randomCrystal():JsonData.Crystal{
		var cry:JsonData.Cry = magicBall_.cryBag.random();
		var ball:JsonData.Ball = magicBall_.ballBag.random();
		if(cry == null || ball == null){
			return null;
		}else{
			var crystal:JsonData.Crystal = new JsonData.Crystal();
			crystal.ball = ball;
			crystal.cry = cry;
			return crystal;
		
		}
	}
	public function checkBall(ball:JsonData.Ball):JsonData.Ball{
		return magicBall_.ballBag.check(ball);
	}
	
	
	public function checkCry(cry:JsonData.Cry):JsonData.Cry{
		return  magicBall_.cryBag.check(cry);
	}
	public function checkUp(){
		var crystal:JsonData.Crystal = _crystalTable.data; 
		if(crystal == null || crystal.ball == null || crystal.cry == null){
			
			var random:JsonData.Crystal = this.randomCrystal();
			if(random){
				_crystalTable.save(random);
			}
		}else{
			crystal.ball = checkBall(crystal.ball); 
			crystal.cry = checkCry(crystal.cry);
			_crystalTable.save(crystal);
		}
		
	}
	public function reset(){
	
		if(PlayerPrefs.HasKey(tableName_)){
			try{
				magicBall_ = JsonData.MagicBall.Load(PlayerPrefs.GetString(tableName_));
			}catch(e:System.Exception){
			 	magicBall_ = null;
			}
		}
		if(magicBall_ == null)
		{
			magicBall_ = new JsonData.MagicBall();
		}
		isLoaded_ = false;
	}
	public function Awake(){
		this.instance_ = this;
		this.reset();
	}
	public static function GetInstance():EZMagicBallTable{
		return this.instance_;
	}
	public function get data():JsonData.MagicBall{
		return magicBall_;
	}
	public function save(data:JsonData.MagicBall){
		this.magicBall_ = data;
		var json:String = JsonData.MagicBall.Save(magicBall_);
		Debug.Log(json);
		PlayerPrefs.SetString(tableName_, json);
		PlayerPrefs.Save();
		if(data){
			this.checkUp();
		}
		isLoaded_ = true;
	}
	public function reload():Task{
		
		var task:WebLoaderTask =  new WebLoaderTask("magic_ball", new JsonData.MagicBallInfoLoader());
		task.setup(WebForGame.GetInstance().data);
	
		TaskManager.PushBack(task, function(){
			var info:JsonData.MagicBallInfo = task.data as JsonData.MagicBallInfo;
			if(info && info.succeed){
				this.save(info.magicBall);
				
			}
		});
		return task;
	}
	
	
	
	public function compose(id:int):WebLoaderTask{
		var task:WebLoaderTask =  new WebLoaderTask("magic_ball_compose", new JsonData.MagicBallCompInfoLoader());
		task.setup(WebForGame.GetInstance().data);
		task.pack.addField("id", id.ToString());
		
	//	EZQuestBagTable.GetInstance().addField(task.pack);
		TaskManager.PushBack(task, function(){
			var info:JsonData.MagicBallCompInfo = task.data as JsonData.MagicBallCompInfo;
			if(info.succeed){
				this.save(info.magicBall);
//				if(info.quickQuestBag){
			//		EZQuestBagTable.GetInstance().save(info.quickQuestBag);
		//		}
				
			}
		});
		return task;
	}
	public function give(type:int):WebLoaderTask{
		var task:WebLoaderTask =  new WebLoaderTask("magic_ball_give", new JsonData.WeixinCrystalInfoLoader());
		task.setup(WebForGame.GetInstance().data);
		task.pack.addField("type", type.ToString());
		TaskManager.PushBack(task, function(){
			var info:JsonData.WeixinCrystalInfo = task.data as JsonData.WeixinCrystalInfo;
			if(info && info.succeed){
				this.save(info.magicBall);
				//EZQuestBagTable.GetInstance().release();
			}
		});
		return task;
	}
	
	public function giveFail(crystal:JsonData.WeixinCrystal):WebLoaderTask{
	
		var task:WebLoaderTask =  new WebLoaderTask("give_fail", new JsonData.WeixinCrystalInfoLoader());
		Debug.LogWarning("give_fail"); 
		task.pack.addField("key", crystal.key);
		task.pack.addField("type", crystal.type.ToString());
		task.pack.addField("from", crystal.from);
		
		task.setup(WebForGame.GetInstance().data);
		
		TaskManager.PushBack(task, function(){
			var info:JsonData.WeixinCrystalInfo = task.data as JsonData.WeixinCrystalInfo;
			if(info && info.succeed){
				this.save(info.magicBall);
			}
		});
		return task;
	}
	
	

}