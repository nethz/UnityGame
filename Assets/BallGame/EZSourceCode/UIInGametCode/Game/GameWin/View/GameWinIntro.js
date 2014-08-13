#pragma strict
class GameWinIntro extends MonoBehaviour{
	public var _intro:UILabel;
	public var _inout:EZEffectFeadin;
	public function setup(intro:String){
		_intro.text = intro;
	}
	public function fadeinTask():Task{
		var task:Task = _inout.effectTask();
		TaskManager.PushFront(task, function(){
			_inout.enabled = true;
		});
		return task;
		
	}
}