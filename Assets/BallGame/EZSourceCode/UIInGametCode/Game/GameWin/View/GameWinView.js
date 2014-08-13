#pragma strict

class GameWinView extends MonoBehaviour{
	public var _title:GameTitleView;
	public var _clear:GameResultView;
	public var _reward:GameRewardView;
	public var _text:String;
	private static var instance_:GameWinView = null;

	public static function GetInstance():GameWinView{
		return this.instance_;
	}
	public function Awake(){
		this.instance_ = this;
	}
	/*
	public function test():Task{ 
	  	var isOver:boolean = false;
	  	var the:Task = new Task(); 
	  	var harvest:JsonData.Harvest = new JsonData.Harvest();
		harvest.money = 123456;
		harvest.exp = 9876;
		//harvest.info = _text; 
		harvest.drops =  new JsonData.Soul[4]; 
		harvest.drops[0] = JsonData.Soul.Load('{"type":"gb","natureProp":{"style":"cat","type":"Fire","group":2,"name":"none"},"baseProp":{"quality":1,"exp":1111111,"lv":49,"attack":55,"speed":2255,"maxHealth":4637.5},"skillProp":{"tech":{"type":"1","affixes":[{"type":"attack","mark":"attack","name":"none","info":"none","level":[1,1,1,1,1],"lv":0,"coefficient":0.05},{"type":"perish_together","mark":"pt","name":"none","info":"none","level":[0.5,0.5,0.5,0.5,0.5],"lv":0,"self":[0.3,0.23333,0.16667,0.1,0.1]},{"type":"add","mark":"add","name":"none","info":"none","level":[0.5,0.7,0.9,1.1,1],"lv":0,"coefficient":1}]}},"magicProp":{"maxPower":6,"tech":{"type":"2","affixes":[{"type":"attacked","mark":"attacked","name":"none","info":"none","level":[1,1,1,1,1],"lv":0,"step_6":6.7,"step_12":4.7,"step_18":4.1,"coefficient":0.02},{"type":"dot_perfect","mark":"dot_p3ed","name":"none","info":"none","level":[0.5,0.54167,0.58333,0.625,0.66667],"lv":0,"times":3},{"type":"dot_common","mark":"dot2ed","name":"none","info":"none","level":[0.25,0.3125,0.375,0.4375,0.5],"lv":0,"times":2},{"type":"dot_hurted","mark":"dot_hurted2","name":"none","info":"none","level":[0.02,0.02125,0.0225,0.02375,0.025],"lv":0,"times":2,"step_12":[0.028,0.02975,0.0315,0.03325,0.035],"step_18":[0.036,0.03825,0.0405,0.04275,0.045]}]}},"id":-1,"ver":-1}'); 
		harvest.drops[1] = JsonData.Soul.Load('{"type":"gb","natureProp":{"style":"cat","type":"Fire","group":2,"name":"none"},"baseProp":{"quality":1,"exp":1111111,"lv":49,"attack":55,"speed":2255,"maxHealth":4637.5},"skillProp":{"tech":{"type":"1","affixes":[{"type":"attack","mark":"attack","name":"none","info":"none","level":[1,1,1,1,1],"lv":0,"coefficient":0.05},{"type":"perish_together","mark":"pt","name":"none","info":"none","level":[0.5,0.5,0.5,0.5,0.5],"lv":0,"self":[0.3,0.23333,0.16667,0.1,0.1]},{"type":"add","mark":"add","name":"none","info":"none","level":[0.5,0.7,0.9,1.1,1],"lv":0,"coefficient":1}]}},"magicProp":{"maxPower":6,"tech":{"type":"2","affixes":[{"type":"attacked","mark":"attacked","name":"none","info":"none","level":[1,1,1,1,1],"lv":0,"step_6":6.7,"step_12":4.7,"step_18":4.1,"coefficient":0.02},{"type":"dot_perfect","mark":"dot_p3ed","name":"none","info":"none","level":[0.5,0.54167,0.58333,0.625,0.66667],"lv":0,"times":3},{"type":"dot_common","mark":"dot2ed","name":"none","info":"none","level":[0.25,0.3125,0.375,0.4375,0.5],"lv":0,"times":2},{"type":"dot_hurted","mark":"dot_hurted2","name":"none","info":"none","level":[0.02,0.02125,0.0225,0.02375,0.025],"lv":0,"times":2,"step_12":[0.028,0.02975,0.0315,0.03325,0.035],"step_18":[0.036,0.03825,0.0405,0.04275,0.045]}]}},"id":-1,"ver":-1}'); 
		harvest.drops[2] = JsonData.Soul.Load('{"type":"gb","natureProp":{"style":"cat","type":"Fire","group":2,"name":"none"},"baseProp":{"quality":1,"exp":1111111,"lv":49,"attack":55,"speed":2255,"maxHealth":4637.5},"skillProp":{"tech":{"type":"1","affixes":[{"type":"attack","mark":"attack","name":"none","info":"none","level":[1,1,1,1,1],"lv":0,"coefficient":0.05},{"type":"perish_together","mark":"pt","name":"none","info":"none","level":[0.5,0.5,0.5,0.5,0.5],"lv":0,"self":[0.3,0.23333,0.16667,0.1,0.1]},{"type":"add","mark":"add","name":"none","info":"none","level":[0.5,0.7,0.9,1.1,1],"lv":0,"coefficient":1}]}},"magicProp":{"maxPower":6,"tech":{"type":"2","affixes":[{"type":"attacked","mark":"attacked","name":"none","info":"none","level":[1,1,1,1,1],"lv":0,"step_6":6.7,"step_12":4.7,"step_18":4.1,"coefficient":0.02},{"type":"dot_perfect","mark":"dot_p3ed","name":"none","info":"none","level":[0.5,0.54167,0.58333,0.625,0.66667],"lv":0,"times":3},{"type":"dot_common","mark":"dot2ed","name":"none","info":"none","level":[0.25,0.3125,0.375,0.4375,0.5],"lv":0,"times":2},{"type":"dot_hurted","mark":"dot_hurted2","name":"none","info":"none","level":[0.02,0.02125,0.0225,0.02375,0.025],"lv":0,"times":2,"step_12":[0.028,0.02975,0.0315,0.03325,0.035],"step_18":[0.036,0.03825,0.0405,0.04275,0.045]}]}},"id":-1,"ver":-1}'); 
		harvest.drops[3] = JsonData.Soul.Load('{"type":"gb","natureProp":{"style":"cat","type":"Fire","group":2,"name":"none"},"baseProp":{"quality":1,"exp":1111111,"lv":49,"attack":55,"speed":2255,"maxHealth":4637.5},"skillProp":{"tech":{"type":"1","affixes":[{"type":"attack","mark":"attack","name":"none","info":"none","level":[1,1,1,1,1],"lv":0,"coefficient":0.05},{"type":"perish_together","mark":"pt","name":"none","info":"none","level":[0.5,0.5,0.5,0.5,0.5],"lv":0,"self":[0.3,0.23333,0.16667,0.1,0.1]},{"type":"add","mark":"add","name":"none","info":"none","level":[0.5,0.7,0.9,1.1,1],"lv":0,"coefficient":1}]}},"magicProp":{"maxPower":6,"tech":{"type":"2","affixes":[{"type":"attacked","mark":"attacked","name":"none","info":"none","level":[1,1,1,1,1],"lv":0,"step_6":6.7,"step_12":4.7,"step_18":4.1,"coefficient":0.02},{"type":"dot_perfect","mark":"dot_p3ed","name":"none","info":"none","level":[0.5,0.54167,0.58333,0.625,0.66667],"lv":0,"times":3},{"type":"dot_common","mark":"dot2ed","name":"none","info":"none","level":[0.25,0.3125,0.375,0.4375,0.5],"lv":0,"times":2},{"type":"dot_hurted","mark":"dot_hurted2","name":"none","info":"none","level":[0.02,0.02125,0.0225,0.02375,0.025],"lv":0,"times":2,"step_12":[0.028,0.02975,0.0315,0.03325,0.035],"step_18":[0.036,0.03825,0.0405,0.04275,0.045]}]}},"id":-1,"ver":-1}'); 
		
		 
		var player:JsonData.Player = new JsonData.Player();  
		var setup:JsonData.Setup = new JsonData.Setup();  
		this.setup(harvest, player, setup); 
			
				
	  	the.init = function(){
	  	 	var tl:TaskList = new TaskList(); 
			GameWinView.GetInstance().setTitle("ni");
			var wait:EZWaitTask = new EZWaitTask();
			wait.setAllTime(1);
			tl.push(wait);
			GameWinView.GetInstance().title.open();
			var pull:Task = GameWinView.GetInstance().title.pullTask();
			tl.push(pull);
			var seal:Task = GameWinView.GetInstance().clear.sealTask();
			TaskManager.PushFront(seal, function(){
				GameWinView.GetInstance().clear.open();
			});
			tl.push(seal);
			tl.push(GameWinView.GetInstance().reward.bigCover.fadeinTask()); 
			
			
			var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
			loading.time = 0.3;
			loading.alpha = 0;
			loading.text = EZDictionary.LookUp("!loading");
			tl.push(loading);
		
			
			var loaded:EZLoadedTask = TaskManager.Create("global.ui.loaded") as EZLoadedTask;
			loaded.time = 0.3;  
			tl.push(loaded); 
			var ta:Task = GameWinView.GetInstance().reward.showTask(); 
			tl.push(ta); 
			TaskManager.PushBack(tl, function(){
				 isOver = true;
			}); 
			TaskManager.Run(tl);
	  	};
	
		the.isOver = function(){
			 return isOver;
		};
		return the;
	}*/
	
	public function get clear():GameResultView{
		return _clear;
	}
	
	public function get reward():GameRewardView{
		return _reward;
	}
	
	public function get title():GameTitleView{
		return _title;
	}
	public function setTitle(title:String){
		_title.setup(title);
	}
	
	public function setup(doc:JsonData.LevelDoc, harvest:JsonData.Harvest, player:JsonData.Player, setup:JsonData.Setup){
		_reward.setup(doc, harvest, player, setup);
	}
}