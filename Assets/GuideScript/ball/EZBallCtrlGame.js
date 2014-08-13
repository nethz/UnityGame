#pragma strict
import System.Collections.Generic;
class EZBallCtrlGame extends EZBallCtrl{
	//public var _balls:EZBallsManagerImpl = null;
	
	public var _curtain:UISprite = null;
	private var fsm_:FSM = null;
	public function Awake(){
		super.Awake();
	}

	public function curtainTask():Task{
		var task:Task = TaskManager.Create("controller.curtain") as Task;
		//isOver_ = false;
		TaskManager.PushFront(task,
			function(){
				TweenAlpha.Begin(_curtain.gameObject, 0.2f, 0.8f);
			}
		);
		TaskManager.PushBack(task,
			function(){
				TweenAlpha.Begin(_curtain.gameObject, 0.2f, 0.0f);
			}
		);
		return task;
	}
	public function disableInput(){
		ActionManager.Run("view.input.disable");
	}
	public function addPower(position:Vector3, ballType:Geek.MagicType, count:int){
		var power:EZPowerAction = ActionManager.Create("controller.addPower");
		power.position = position;
		power.type = ballType;
		power.count = count;
		ActionManager.Run(power);
	}
	public function groupOver(){
		var action:EZPostEventAction = ActionManager.Create("controller.postEvent");
		action.msg = "attack";
		ActionManager.Run(action);
	}
}
