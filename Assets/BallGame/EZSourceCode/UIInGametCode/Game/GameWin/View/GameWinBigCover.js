#pragma strict
class GameWinBigCover extends MonoBehaviour{
	public var _sprite:UISprite;
	public var _inout:EZEffectFeadin;
	public var _box:BoxCollider;
	public var _fast:float = 3.0f;
	public var _slow:float = 1.0f;
	public function Awake(){
		_sprite.enabled = false;
		_box.enabled = false;
		GameWinEffect.SetSpeed(_slow);
	}
	public function fadeinTask():Task{
		var task:Task = _inout.effectTask();
		TaskManager.PushFront(task, function(){
			_sprite.enabled = true;
			_box.enabled = true;
			
		});
		return task;
	
	}
	public function OnPress(state:boolean){
		if(state){
			GameWinEffect.SetSpeed(_fast);
		}else{
			GameWinEffect.SetSpeed(_slow);
		}
	} 
}