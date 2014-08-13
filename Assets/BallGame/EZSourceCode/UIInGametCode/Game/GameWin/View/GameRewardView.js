#pragma strict

class GameRewardView extends GameBaseView{
	public var _bigCover:GameWinBigCover;
	public var _info:GameWinIntro;
	public var _moneyEXP:GameWinMoneyEXP;
	public var _expBar:GameWinEXPBar;
	public var _ghosts:GameWinGhostManager;
	public var _cards:GameWinCardManager;
	private var harvest_:JsonData.Harvest;
	private var player_:JsonData.Player;
	private var setup_:JsonData.Setup;
	private var beginExp_:float = 0;;
	public function setup(doc:JsonData.LevelDoc,harvest:JsonData.Harvest, player:JsonData.Player, setup:JsonData.Setup){
		harvest_ = harvest;
		player_ = player;
		setup_ = setup;
		_info.setup(doc.info);
		beginExp_ = player_.exp - harvest.exp;
		_moneyEXP.setup(harvest.money, harvest.exp);
		_expBar.setup(beginExp_, harvest.exp);
		_ghosts.setup(harvest.drops);
		_cards.setup(harvest.drops);
	}
	public function getRockTask():Task{
		var tl:TaskList = new TaskList(); 
		var beginLv:int = setup_.player.getLv(beginExp_);
		Debug.Log("beginLv" + beginLv);
		var beginBar:float = setup_.player.getExpBar(beginExp_);
		Debug.Log("beginBar" + beginBar);
		var endLv:int = setup_.player.getLv(beginExp_ + harvest_.exp);
		Debug.Log("endLv" + endLv);
		var endBar:float = setup_.player.getExpBar(beginExp_ + harvest_.exp);
		var fin:Task = _expBar.fadeinTask();
		if(beginLv == endLv){
			TaskManager.PushFront(fin, function(){_expBar.setRockValue(beginBar, endBar);});
			tl.push(fin);
			var rock:Task = _expBar.rockTask();
			TaskManager.PushFront(rock, function(){_expBar.setRockValue(beginBar, endBar);});
			tl.push(rock);
		}else if(endLv > beginLv){
			TaskManager.PushFront(fin, function(){_expBar.setRockValue(beginBar, 1.0f);});
			tl.push(fin);
			var beginRock:Task = _expBar.rockTask();
			TaskManager.PushFront(beginRock, function(){_expBar.setRockValue(beginBar, 1.0f);});
			tl.push(beginRock);
			tl.push(_expBar.levelUpTask());
			for(var i:int =0; i<(endLv - beginLv -1); ++i){
				var rRock:Task = _expBar.rockTask();
				TaskManager.PushFront(rRock, function(){_expBar.setRockValue(0.0f, 1.0f);});
				tl.push(rRock);
				tl.push(_expBar.levelUpTask());
			}
			var endRock:Task = _expBar.rockTask();
			TaskManager.PushFront(endRock, function(){_expBar.setRockValue(0.0f, endBar);});
			tl.push(endRock);
		}
		return tl;
	}
	public function warningTask():Task{
		var tl:TaskList = new TaskList();
		
		
		
		var waring:List.<String> = new List.<String>();
		
		if(harvest_.warning && harvest_.warning.Length > 0){
			for(var i:int = 0; i<harvest_.warning.Length; ++i){
				Debug.LogWarning("harvest_:" + harvest_.warning[i]);
				waring.Add(EZDictionary.LookUp(harvest_.warning[i]));
			}
		}
		
		var guide:EZGuide = EZGuide.GetInstance();
		var strings:List.<String> = guide.account();
		for(var j:int = 0; j < strings.Count; ++j){
				Debug.LogWarning("strings:" + strings[j]);
				waring.Add(strings[j]);
		}
		
		Debug.LogWarning("count:" + waring.Count);
		if(waring.Count > 0){
			var task:EZWarningTask = TaskManager.Create("global.ui.warning") as EZWarningTask;
			for(var f:int = 0; f < waring.Count; ++f){
				task.addText(waring[f]);
			}
			tl.push(task);
		}
		
			
		
		return tl;
		
	}
	
	
	public function messageTask():Task{
		var tl:TaskList = new TaskList();
		
		
		if(harvest_.message && harvest_.message.Length > 0){
			var task:EZWarningTask = TaskManager.Create("global.ui.warning") as EZWarningTask;
			for(var i:int = 0; i<harvest_.message.Length; ++i){
				task.addText(EZDictionary.LookUp(harvest_.message[i]));
			}
			tl.push(task);
		}
		
		return tl;
		
	}
	public function showTask():Task{
		var tl:TaskList = new TaskList();
		tl.push(_info.fadeinTask());
		tl.push(_moneyEXP.fadeinTask());
		tl.push(_moneyEXP.setMoneyTask());
		tl.push(_moneyEXP.setExpTask());
		tl.push(getRockTask());
		var warning:Task = warningTask();
		tl.push(warning);
		TaskManager.PushBack(warning,function(){//waringTask back build cardList for ready to flystep and flyOK
			_cards.createCardsOK();
		});
		tl.push(_ghosts.fadeinTask());
		_ghosts.create();
		var ghosts:GameGhostView[] = _ghosts.ghosts;
		for(var i:int =0; i < ghosts.Length; ++i){
			tl.push(ghosts[i].flyTask());
			//tl.push(_cards.createTask()); 
			tl.push(_cards.flyStepTask());
		}
		
		
		tl.push(messageTask()); 
		//tl.push(_cards.okTask()); 
		tl.push(_cards.flyOKTask()); 
		return tl;
		
	}
	public function get info():GameWinIntro{
		return _info;
	}
	
	public function get bigCover():GameWinBigCover{
		return _bigCover;
	}
	
	public function open(){
		super.open();
	}
	
	public function close(){
		super.close();
	}
	
	
	
	public function get moneyEXP():GameWinMoneyEXP{
		return _moneyEXP;
	}
	public function get expBar():GameWinEXPBar{
		return _expBar;
	}
	public function get ghosts():GameWinGhostManager{
		return _ghosts;
	}
	public function get cards():GameWinCardManager{
		return _cards;
	}

}