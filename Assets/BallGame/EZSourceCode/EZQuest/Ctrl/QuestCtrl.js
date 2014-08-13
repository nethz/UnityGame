#pragma strict

class QuestCtrl extends MonoBehaviour{
	public var _main:QuestMainCtrl = null;
	public var _minor:QuestMinorCtrl = null;
	//public var _noBag:EZMissionNoBagWindow = null;
	private var questBag_:JsonData.QuestBag;
	private var questList_:List.<JsonData.Quest>;
	
	private var level_:EZMissionBagTable.SceneInfo = null;
	public var _noTeam:String = "noTeam";
	public var _subscriptKey:String = "quest";
	public var _noLevel:String = " no Level";
	public var _goToBegin:String = "";
	
	public function set level(value:EZMissionBagTable.SceneInfo){
		level_ = value; 
	}
	public function get level():EZMissionBagTable.SceneInfo{
		return level_;
	}
	public function get main(){
		return _main;
	}
	
	public function get minor(){
		return _minor;
	}
	public function noLevel():Task{
		var warning:EZWarningTask = TaskManager.Create("global.ui.warning") as EZWarningTask;
		warning.addText(_noLevel);
		return warning;
	
	}
	public function setup(questBag:JsonData.QuestBag, list:List.<JsonData.Quest>){
		questBag_ = questBag;
		questList_ = list;
	}
	
	public function loadMain(){
	
		var sm:EZSubscriptManager = EZSubscriptManager.GetInstance();
		var subscript:EZSubscript = sm.getSubscript(_subscriptKey);
		var setup:EZQuestMainSetup = new EZQuestMainSetup(subscript, questList_);
		_main.setup(setup);
	}
	public function loadMinor(title:String){
		var sm:EZSubscriptManager = EZSubscriptManager.GetInstance();
		var subscript:EZSubscript = sm.getSubscript(_subscriptKey);
		var setup:EZQuestMinorSetup = new EZQuestMinorSetup(subscript, title, questList_);
		_minor.setup(setup);
	}
	
	public function goToWindowTask(title:String, message:String){
		var window:EZWindowTask = TaskManager.Create("global.ui.window") as EZWindowTask;
		
		window.text = _goToBegin + title;	
		window.message = message;				
		window.ok = EZDictionary.LookUp("!ok");
		window.cancel = EZDictionary.LookUp("!cancel");
		return window;
	}
	
	//public function get noBagWindow(){
	//	return _noBag;
		//var window:EZWindowTask = TaskManager.Create("global.ui.window") as EZWindowTask;
		
		//window.text = _overflow;				
		//window.ok = EZDictionary.LookUp("!ok");
		//window.cancel = EZDictionary.LookUp("!cancel");
		//return window;
//	}
	public function goPetWindowTask(){
		var window:EZWindowTask = TaskManager.Create("global.ui.window") as EZWindowTask;
		window.text = _noTeam;				
		window.ok = EZDictionary.LookUp("!ok");
		window.cancel = EZDictionary.LookUp("!cancel");
		return window;
	}
	
	public function fullAp(){
		var window:EZWindowTask = TaskManager.Create("global.ui.window") as EZWindowTask;
		var setup:JsonData.Setup = EZSetupTable.GetInstance().data;
		var diamond:int = setup.game.ap_diamond;
		window.text = EZDictionary.LookUp("!pay4ap1") + diamond + EZDictionary.LookUp("!pay4ap2");
		window.ok = EZDictionary.LookUp("!ok");
		window.cancel = EZDictionary.LookUp("!cancel");
		TaskManager.PushBack(window, function(){
			if(window.okOrCancel){
				var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
				loading.time = 0.3;
				loading.alpha = 0.5;
				loading.text = EZDictionary.LookUp("!full_aping");
				var table:EZShopTable = EZShopTable.GetInstance();
				var web:WebLoaderTask = table.fullAp();
				TaskManager.PushBack(web, function(){
					var info:JsonData.PlayerInfo = web.data as JsonData.PlayerInfo;
					if(info && info.succeed){
						var warning:EZWarningTask = TaskManager.Create("global.ui.warning") as EZWarningTask;
						warning.addText(EZDictionary.LookUp("!full_aped"));
						TaskManager.Run(warning);
					}
				});
				var tl:TaskList = new TaskList();
				var mt:MultiTask = new MultiTask();
				mt.push(loading);
				mt.push(web);
				tl.push(mt);
				var loaded:EZLoadedTask = TaskManager.Create("global.ui.loaded") as EZLoadedTask;
				loaded.time = 0.3;
				tl.push(loaded);
				TaskManager.Run(tl);
			}
		});
		TaskManager.Run(window);
	
	

	}
}