#pragma strict

class EZCryCompAnimationState extends StateWithEventMap{
	private var comp_:EZCryCompCtrl;
	private var isOver_:boolean = false;
	function EZCryCompAnimationState(comp:EZCryCompCtrl){
		comp_ = comp;
	}
	public function start(){
		isOver_ = false;
		var tl:TaskList = new TaskList();
		var task:Task = comp_.animationTask();
		tl.push(task);
		
		TaskManager.PushBack(tl, function(){
			isOver_ = true;
		});
		TaskManager.Run(tl);
	}
	public function update(d:float):String{
		if(isOver_){
			return "comp.select";
		}
		return "";
	}
	public function over(){
		
		var magicBall:EZMagicBallTable = EZMagicBallTable.GetInstance();
		var crystal:EZCrystalTable = EZCrystalTable.GetInstance();
		comp_.setup(magicBall.data, crystal.data);
	}

}