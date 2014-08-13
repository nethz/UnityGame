#pragma strict


class GameWinCardOffset extends MonoBehaviour{
	public var _step:Vector3;
	private var n_:int = 0;
	public var _fly:GameWinFly;
	public function goStepTask(obj:GameObject):Task{
		var task:Task =  _fly.effectTask();
		return task;
	}
}