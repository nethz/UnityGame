#pragma strict

class WinTest extends MonoBehaviour{
	public function Start(){
		//GameWinView.GetInstance().clear.open();
		var tl:TaskList = new TaskList();
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
		tl.push(GameWinView.GetInstance().reward.info.fadeinTask());
		
		tl.push(GameWinView.GetInstance().reward.moneyEXP.fadeinTask());
		tl.push(GameWinView.GetInstance().reward.moneyEXP.setMoneyTask());
		tl.push(GameWinView.GetInstance().reward.moneyEXP.setExpTask());
		var fin:Task = GameWinView.GetInstance().reward.expBar.fadeinTask();
		TaskManager.PushFront(fin, function(){GameWinView.GetInstance().reward.expBar.setRockValue(0.1, 1);});
		tl.push(fin);
		var rock1:Task = GameWinView.GetInstance().reward.expBar.rockTask();
		TaskManager.PushFront(rock1, function(){GameWinView.GetInstance().reward.expBar.setRockValue(0.1, 1);});
		
		tl.push(rock1);
		
		tl.push(GameWinView.GetInstance().reward.expBar.levelUpTask());
		
		
		var rock2:Task = GameWinView.GetInstance().reward.expBar.rockTask();
		TaskManager.PushFront(rock2, function(){GameWinView.GetInstance().reward.expBar.setRockValue(0, 0.5);});
		
		tl.push(rock2);
		
		tl.push(GameWinView.GetInstance().reward.ghosts.fadeinTask());
		
		var ghosts:GameGhostView[] = GameWinView.GetInstance().reward.ghosts.ghosts;
		for(var i:int =0; i < ghosts.Length; ++i){
			tl.push(ghosts[i].flyTask());
			//tl.push(GameWinView.GetInstance().reward.cards.createTask()); 
		}
		//tl.push(GameWinView.GetInstance().reward.cards.okTask()); 
		tl.push(GameWinView.GetInstance().reward.cards.flyOKTask()); 
		
		TaskManager.Run(tl);
	}
}