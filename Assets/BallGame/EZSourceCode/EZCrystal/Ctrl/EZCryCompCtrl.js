#pragma strict

class EZCryCompCtrl extends MonoBehaviour{
	
	public var _view:EZCryCompView;
	public var _needFrags:String = "";
	public var _maxLevel:String = "";
	public function open(){
		_view.open();
	}
	public function close(){
		_view.close();
	}
	
	public function setup(magicBall:JsonData.MagicBall, crystal:JsonData.Crystal){
		_view.setup(magicBall, crystal);
		
	}
	public function animationTask():Task{
		var mt:MultiTask = new MultiTask();
		mt.push(_view.runTask());
		var tl:TaskList = new TaskList();
		var task:Task = _view.ball.setExpTask(_view.ball.exp +1);
		
		tl.push(task);
		if(_view.ball.exp >= _view.ball.max){
			
			var t2:Task = _view.ball.setExpTask(0);
			tl.push(t2);
			var lv:float = _view.ball.lv;
			var t3:Task = _view.ball.setLvTask(lv + 1, 0.3);
			tl.push(t3);
		}
		mt.push(tl);
		return mt;
	}
	
	
	function testFrag():boolean{
		var data:JsonData.MagicBall = EZMagicBallTable.GetInstance().data;
		for(var i:int = 0; i< data.fragsLength(); ++i){
			if(data.cryFragCount(i) <= 0){
				var task:EZWarningTask = TaskManager.Create("global.ui.warning") as EZWarningTask;
				task.addText(_needFrags);
				TaskManager.Run(task);
				return false;
			}
		
		}
		return true;
	
	}
	
		
	function testMaxLv():boolean{
		var data:JsonData.MagicBall = EZMagicBallTable.GetInstance().data;
		var crystal:EZCrystalTable = EZCrystalTable.GetInstance();
		 
		var setup:JsonData.BallSetup = data.setup; 
		if(setup.getLv(crystal.data.ball.exp) > setup.maxLv()){
			var task:EZWarningTask = TaskManager.Create("global.ui.warning") as EZWarningTask;
				task.addText(_maxLevel);
				TaskManager.Run(task);
				return false;
		}
				
		return true;
	
	}
}