#pragma strict

class EZBallCtrl extends MonoBehaviour{
	public function Awake(){
	
	
	}
	public function curtainTask():Task{
		return new Task();
	}
	public function disableInput(){
	
	}
	public function addPower(position:Vector3, ballType:Geek.MagicType, count:int){
	
		
		//var power:EZPowerAction = ActionManager.Create("controller.addPower");
	//	power.position = begin + PuzzleCamera.instance().transform.position;
		//power.type = ballType;
	//	power.count = this.task_.getCount();
		//ActionManager.Run(power);
	//	ctrl_.addPower(position, ballType, count);
	}
	public function groupOver(){
	
	}
}
